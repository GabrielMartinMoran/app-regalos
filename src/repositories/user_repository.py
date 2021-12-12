from typing import List, Set

from src.models.user import User
from src.repositories.spreadsheet_repository import SpreadsheetRepository


class UserRepository(SpreadsheetRepository):
    _TABLE_NAME = 'Users'

    def get_by_credentials(self, username: str, hashed_password: str) -> User:
        table = self._get_table()
        filtered = [row for row in table if row['username'] == username and
                    row['hashed_password'] == hashed_password]
        if filtered:
            return User.from_dict(filtered[0])
        return None

    def get_by_groups(self, groups: Set[int]) -> List[User]:
        users = []
        for row in self._get_table():
            user = User.from_dict(row)
            # Sets intersection
            if len(groups & user.groups) > 0:
                users.append(user)
        return users

    def get_by_username(self, username: str) -> User:
        table = self._get_table()
        filtered = [row for row in table if row['username'] == username]
        if filtered:
            return User.from_dict(filtered[0])
        return None
