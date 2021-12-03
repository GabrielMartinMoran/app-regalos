from typing import List

from models.user import User
from repositories.spreadsheet_repository import SpreadsheetRepository


class UserRepository(SpreadsheetRepository):
    _TABLE_NAME = 'Users'

    def get_by_credentials(self, username: str, hashed_password: str) -> User:
        table = self._get_table()
        filtered = [row for row in table if row['username'] == username and
                    row['hashed_password'] == hashed_password]
        if filtered:
            return User.from_dict(filtered[0])
        return None
        """
        df = self._get_table_df()
        rows = df[(df.username == username) & (df.hashed_password == hashed_password)].to_dict('records')
        if rows:
            return User.from_dict(rows[0])
        return None
        """

    def get_all(self) -> List[User]:
        """
        df = self._get_table_df()
        rows = df.to_dict('records')
        """
        return [User.from_dict(row) for row in self._get_table()]

    def get_by_username(self, username: str) -> User:
        table = self._get_table()
        filtered = [row for row in table if row['username'] == username]
        if filtered:
            return User.from_dict(filtered[0])
        return None
        """        
        df = self._get_table_df()
        rows = df[(df.username == username)].to_dict('records')
        if rows:
            return User.from_dict(rows[0])
        return None
        """