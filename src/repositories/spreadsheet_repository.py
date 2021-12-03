from typing import List

import pygsheets
import pandas as pd

from src.config_provider import ConfigProvider


class SpreadsheetRepository:
    __gc = pygsheets.authorize(service_account_env_var='GOOGLE_JSON_TOKEN')
    _spreadsheet = __gc.open(ConfigProvider.GOOGLE_SHEET_DB_NAME)

    _TABLE_NAME = None

    _cached_tables = {}

    def _get_table_worksheet(self) -> pygsheets.Worksheet:
        return self._spreadsheet.worksheet_by_title(self._TABLE_NAME)

    def _get_table(self) -> List[dict]:
        if not self._TABLE_NAME:
            return []
        if self._TABLE_NAME not in SpreadsheetRepository._cached_tables:
            SpreadsheetRepository._cached_tables[self._TABLE_NAME] = self._get_table_worksheet().get_as_df().to_dict(
                'records')
        return SpreadsheetRepository._cached_tables[self._TABLE_NAME]

    def _update_table(self, data: List[dict]) -> None:
        df = pd.DataFrame(data)
        self._get_table_worksheet().resize(len(df.index) + 1)
        self._get_table_worksheet().set_dataframe(df, (1, 1), nan='')
        SpreadsheetRepository._cached_tables[self._TABLE_NAME] = data
