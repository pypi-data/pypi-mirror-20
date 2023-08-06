"""
EPW
---

Objects describing all the complexity of an EPW file
"""
import os
import io
import re

import pandas as pd
from pandas.util.testing import assert_index_equal

from oplus.configuration import CONF
from oplus.util import EPlusDt, get_start_dt, get_copyright_comment, get_string_buffer


class EPWError(Exception):
    pass


EPW_COLUMNS = (
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "datasource",
    "drybulb",
    "dewpoint",
    "relhum",
    "atmos_pressure",
    "exthorrad",
    "extdirrad",
    "horirsky",
    "glohorrad",
    "dirnorrad",
    "difhorrad",
    "glohorillum",
    "dirnorillum",
    "difhorillum",
    "zenlum",
    "winddir",
    "windspd",
    "totskycvr",
    "opaqskycvr",
    "visibility",
    "ceiling_hgt",
    "presweathobs",
    "presweathcodes",
    "precip_wtr",
    "aerosol_opt_depth",
    "snowdepth",
    "days_last_snow",
    "albedo",
    "liq_precip_depth",
    "liq_precip_rate"
)

WEEK_DAYS = (
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
)


class EPWHeader:
    """
    Representing the beginning of EPW files. It gathers information about the building's environment.
    """
    fields_d = {
        'LOCATION': 0,
        'DESIGN_CONDITIONS': 1,
        'TYPICAL_EXTREME_PERIODS': 2,
        'GROUND_TEMPERATURES': 3,
        'HOLIDAYS_DAYLIGHT_SAVINGS': 4,
        'COMMENTS_1': 5,
        'COMMENTS_2': 6,
        'DATA_PERIODS': 7,
    }

    @staticmethod
    def copyright_comment():
        return get_copyright_comment(multi_lines=False)

    def __init__(self, header_s):
        self._l2 = []
        for line_s in header_s.strip().split("\n"):
            self._l2.append([cell.strip() for cell in line_s.split(",")])
        # check
        if len(self._l2[self.fields_d['DATA_PERIODS']]) != 7:
            raise EPWError("'DATA PERIODS' row must have 7 cells.")
        if self._l2[self.fields_d['DATA_PERIODS']][0] != "DATA PERIODS":
            raise EPWError("Last line of header must be 'DATA PERIODS'.")
        if self._l2[self.fields_d['DATA_PERIODS']][1] != "1":
            raise NotImplementedError("Can only manage epws with one data period.")
        if self._l2[self.fields_d['DATA_PERIODS']][2] != "1":
            raise NotImplementedError("Can only manage hourly epws.")

    def to_str(self, add_copyright=True):
        l2 = []
        if add_copyright:
            for i, row in enumerate(self._l2):
                if add_copyright and (i == self.fields_d['COMMENTS_1']):
                    copyright_comment = self.copyright_comment()
                    row = row.copy()
                    if copyright_comment not in row[1]:
                        row[1] = "%s; %s" % (copyright_comment, row[1])
                l2.append(row)
        else:
            l2 = self._l2
        return "\n".join([",".join(row) for row in l2])

    @property
    def start_day_of_week(self):
        return self._l2[self.fields_d['DATA_PERIODS']][4].strip()

    @start_day_of_week.setter
    def start_day_of_week(self, value):
        # TODO: check given value is ok
        self._l2[self.fields_d['DATA_PERIODS']][4] = value

    @property
    def start(self):  # TODO: rename to start day
        """
        Access to the starting day of EPW files

        Returns
        -------
        Starting day
        """
        return self._l2[self.fields_d['DATA_PERIODS']][5].split(",").map(int)

    @start.setter
    def start(self, value):
        self._l2[self.fields_d['DATA_PERIODS']][5] = "%s/%s" % value

    @property
    def end(self):  # TODO: rename to end_day
        """

        Returns
        -------
        The end date of the EPW file (month, day)
        """
        return self._l2[self.fields_d['DATA_PERIODS']][6].split(",").map(int)

    @end.setter
    def end(self, value):
        """
        Set the new end date of the EPW file

        Parameters
        ----------
        value: (int, int)
            representing the end date (month, day)

        Returns
        -------

        """
        self._l2[self.fields_d['DATA_PERIODS']][6] = "%s/%s" % value

    @property
    def freq(self):
        return {"1": "H"}[self._l2[self.fields_d['DATA_PERIODS']][2]]

    def get_field(self, field):
        """

        Parameters
        ----------
        field: this field should be a key of the fields_d dictionary

        Returns
        -------
        A list containing the parameters' value of the defined field in the header
        """
        return self._l2[self.fields_d[field]][1:]

    def set_field(self, field, data_l=None, parameter_index=None, value=None):
        """
        This function sets the defined field of the header. Two choices :
         - put in parameter the entire new list
         - put the index and value of the parameter

        Parameters
        ----------
        field: this field should be a key of the fields_d dictionary
        data_l: list corresponding to the field. It has to fit the requirements
        parameter_index: first parameter is 1
        value: value of the parameter

        Returns
        -------

        """
        if field in self.fields_d.keys():
            if data_l:
                if data_l[0] != field.replace('_', ' '):
                    data_l.insert(0, field.replace('_', ' '))
                self._l2[self.fields_d[field]] = data_l
            elif parameter_index:
                if parameter_index == 0:
                    raise ValueError('1 is the first index for parameters')
                if value:
                    try:
                        self._l2[self.fields_d[field]][parameter_index] = value
                    except IndexError:
                        print('')

                else:
                    raise ValueError('If a parameter index is specified a value of the parameter is needed')
            else:
                raise ValueError('You have to specify a list of data or parameter index to set')
        else:
            raise KeyError('The mentioned field is not in header fields')

    def clear_field(self, field):
        """
        Clear the list of the corresponding field

        Parameters
        ----------
        field: this field should be a key of the fields_d dictionary

        Returns
        -------

        """
        if field in self.fields_d.keys():
            self._l2[self.fields_d[field]] = [field.replace('_', ' ')]
        else:
            raise KeyError('The mentioned field is not in header fields')



class EPW:
    """
    EPW
    ---

    Manage EPW files through EPW objects
    """
    epw_header_cls = EPWHeader

    @classmethod
    def get_epw_or_path(cls, epw_or_path, encoding=None):
        if isinstance(epw_or_path, str):
            return cls(epw_or_path, encoding=encoding)
        elif isinstance(epw_or_path, cls):
            return epw_or_path
        raise EPWError("'epw_or_path' must be an EPW or path.  Given object: '%s', type: '%s'." %
                       (epw_or_path, type(epw_or_path)))

    def __init__(self, path_or_buffer, encoding=None, start=None):
        """
        Initialize EPW objects

        Parameters
        ----------
        path_or_buffer: :obj: `os.path`
            path leading to the EPW file. It must end by .epw
        encoding:
        start:
        """
        self._encoding = CONF.encoding if encoding is None else encoding
        buffer, path = get_string_buffer(path_or_buffer, "epw", self._encoding)

        try:
            self._df, self._header = parse_epw(buffer)
        except Exception as e:
            raise EPWError("Error while parsing epw. First check that given file exists"
                           "(if not, given path will have been considered as an idf content.\n%s" % e)

        self._start_dt = None if start is None else get_start_dt(start)

    @property
    def header(self):
        return self._header

    @property
    def freq(self):
        return self._header.freq

    def to_str(self, add_copyright=True):
        # header
        _content = self._header.to_str(add_copyright=add_copyright)

        # data
        _f = io.StringIO()
        self._df.reset_index().to_csv(_f, header=False, index=False)
        _content += "\n" + _f.getvalue()

        return _content

    def save_as(self, file_or_path, add_copyright=True):
        """
        It enables to save an EPW file from EPW objects

        Parameters
        ----------
        file_or_path: os.path
            path of the EPW file. If it doesn't exist it would be created.
        add_copyright: bool
            option to add a copyright field. default value is True

        Returns
        -------

        """
        is_path = isinstance(file_or_path, str)

        # write to f
        f = (open(file_or_path, "w", encoding=self._encoding)
             if is_path else file_or_path)
        f.write(self.to_str(add_copyright=add_copyright))

        if is_path:
            f.close()

    def set_start(self, start):
        """
        Set the start day of the year for the EPW object. The end day would be defined automatically.
        An epw has to be one year long.

        Parameters
        ----------
        start: defines the start date. You can use a year date (int), a date (datetime.date),
         or a datetime (datetime.datetime)

        Returns
        -------

        """
        self._start_dt = get_start_dt(start)

    def df(self, start=None, datetime_index=None):
        """
        This function is a way to access weather data so that you can work on it more easily

        Parameters
        ----------
        start : optional
            option to define the starting date of the dataframe. If None it would be the start day attribute of
        datetime_index: str
            hello guys

        Returns
        -------
        :obj: `pandas.DataFrame()`
            The dataframe representing the weather data of the EPW file
        """
        # Order: will impose a freq, should not be used with reference climate (where years may differ by month)
        # start_dt and datetime index
        if start is None:
            start_dt = self._start_dt
        else:
            start_dt = get_start_dt(start)

        if datetime_index is None:
            datetime_index = start_dt is not None
        if (datetime_index is True) and (start_dt is None):
            # we get first value as start_dt
            i0 = self._df.index[0]
            start_dt = EPlusDt(i0[1], i0[2], i0[3], i0[4]).datetime(i0[0])

        # data frame
        df = self._df.copy()

        if not datetime_index:  # return if multi-index
            return df

        # manage datetime df
        start_standard_dt = EPlusDt.from_datetime(start_dt).standard_dt

        def index_to_dt(i):
            eplusdt = EPlusDt(i[1], i[2], i[3], i[4])
            _year = start_dt.year + 1 if eplusdt.standard_dt <= start_standard_dt else start_dt.year
            return eplusdt.datetime(_year)

        df.index = df.index.map(index_to_dt)
        df.sort(inplace=True)
        df = df.reindex(pd.date_range(df.index[0], df.index[-1], freq=self.freq))

        return df

    def set_df(self, value):
        if not isinstance(value, pd.DataFrame):
            raise EPWError("df must be a DataFrame")
        assert_index_equal(value.index, self._df.index)
        assert_index_equal(value.columns, self._df.columns)


def parse_epw(file_like, encoding=None):
    """
    Read and parse an EPW object as it was an EPW file

    Parameters
    ----------
    file_like
    encoding

    Returns
    -------
    first return is a dataframe and second is a header object (dataframe, header)
    """
    header_s = ""

    # header
    for line_s in file_like:
        header_s += line_s
        if re.match("^DATA PERIODS", line_s) is not None:
            break
    header = EPWHeader(header_s)

    # data
    df = pd.read_csv(file_like, header=None, low_memory=False, encoding=encoding)
    df.columns = EPW_COLUMNS[:len(df.columns)]
    df.index = pd.MultiIndex.from_arrays([df[c] for c in df.columns[:5]])
    for c in df.columns[:5].tolist():
        del df[c]

    return df, header

