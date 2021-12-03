import pandas as pd
from src.repositories.spreadsheet_repository import SpreadsheetRepository


class DBInitializer(SpreadsheetRepository):
    _TABLES = {
        'Users': pd.DataFrame(columns=['username', 'hashed_password', 'name']),
        'Gifts': pd.DataFrame(columns=['gift_id', 'username', 'name', 'detail', 'claimer']),
    }

    def init_db(self) -> None:
        if not self._is_already_initiaized():
            self._create_tables()

    def _is_already_initiaized(self) -> bool:
        return len(self._spreadsheet.worksheets()) > 1

    def _create_tables(self) -> None:
        for table_name in self._TABLES:
            table = self._spreadsheet.add_worksheet(table_name)
            table.resize(1)
            table.set_dataframe(self._TABLES[table_name], (1, 1))
        # delete default spreadsheet
        self._spreadsheet.del_worksheet(self._spreadsheet[0])
