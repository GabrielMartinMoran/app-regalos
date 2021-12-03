from typing import List

import pandas as pd

from exceptions.element_not_found_exception import ElementNotFoundException
from exceptions.gift_already_claimed_exception import GiftAlreadyClaimedException
from exceptions.gift_not_claimed_by_provided_user_exception import GiftNotClaimedByProvidedUserException
from models.gift import Gift
from repositories.spreadsheet_repository import SpreadsheetRepository


class GiftRepository(SpreadsheetRepository):
    _TABLE_NAME = 'Gifts'

    def create_gift(self, gift: Gift) -> None:
        # df = self._get_table_df()
        to_insert = gift.to_dict()
        to_insert['claimer'] = None
        # df = df.append(pd.DataFrame([to_insert]))
        table = self._get_table() + [to_insert]
        self._update_table(table)

    def get_user_gifts(self, username: str) -> List[Gift]:
        # df = self._get_table_df()
        # rows = df[(df.username == username)].to_dict('records')
        return [Gift.from_dict(row) for row in self._get_table() if row['username'] == username]

    def update_gift(self, gift: Gift) -> None:
        # df = self._get_table_df()
        # condition = (df.gift_id == gift.gift_id) & (df.username == gift.username)
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift.gift_id and
                    row['username'] == gift.username]
        # if df[condition].empty:
        if not filtered:
            raise ElementNotFoundException()

        # Update fields using log to avoid losing reference
        # df.loc[condition, 'name'] = gift.name
        # df.loc[condition, 'detail'] = gift.detail
        filtered[0]['name'] = gift.name
        filtered[0]['detail'] = gift.detail

        self._update_table(table)

    def get(self, username: str, gift_id: str) -> Gift:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id and
                    row['username'] == username]
        if filtered:
            return Gift.from_dict(filtered[0])
        return None
        """
        
        df = self._get_table_df()
        rows = df[(df.gift_id == gift_id) & (df.username == username)].to_dict('records')
        if rows:
            return Gift.from_dict(rows[0])
        return None
        """

    def claim(self, claimer_username: str, gift_id: str) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id]
        if not filtered:
            raise ElementNotFoundException()
        if filtered[0]['claimer']:
            raise GiftAlreadyClaimedException()
        filtered[0]['claimer'] = claimer_username
        self._update_table(table)
        """
        df = self._get_table_df()
        condition = (df.gift_id == gift_id)
        if df[condition].empty:
            raise ElementNotFoundException()
        if df[condition].to_dict('records')[0]['claimer']:
            raise GiftAlreadyClaimedException()
        df.loc[condition, 'claimer'] = claimer_username
        self._update_table(df)
        """

    def unclaim(self, claimer_username: str, gift_id: str) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id]
        if not filtered:
            raise ElementNotFoundException()
        if filtered[0]['claimer'] != claimer_username:
            raise GiftNotClaimedByProvidedUserException()
        filtered[0]['claimer'] = None
        self._update_table(table)

        """
        df = self._get_table_df()
        condition = (df.gift_id == gift_id)
        if df[condition].empty:
            raise ElementNotFoundException()
        if df[condition].to_dict('records')[0]['claimer'] != claimer_username:
            raise GiftNotClaimedByProvidedUserException()
        df.loc[condition, 'claimer'] = None
        self._update_table(df)
        """

    def get_user_claims(self, username: str) -> List[Gift]:
        table = self._get_table()
        return [Gift.from_dict(row) for row in table if row['claimer'] == username]
        """        
        df = self._get_table_df()
        rows = df[(df.claimer == username)].to_dict('records')
        return [Gift.from_dict(row) for row in rows]
        """

    def delete(self, username: str, gift_id: str) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id and
                    row['username'] == username]
        if not filtered:
            raise ElementNotFoundException()
        table.remove(filtered[0])
        self._update_table(table)
        """

        return [Gift.from_dict(row) for row in filtered]

        df = self._get_table_df()
        condition = (df.gift_id == gift_id) & (df.username == username)
        if df[condition].empty:
            raise ElementNotFoundException()
        df = df.drop(df.loc[condition].index)
        self._update_table(df)
        """
