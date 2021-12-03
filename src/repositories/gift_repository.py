from typing import List

from src.exceptions.element_not_found_exception import ElementNotFoundException
from src.exceptions.gift_already_claimed_exception import GiftAlreadyClaimedException
from src.exceptions.gift_not_claimed_by_provided_user_exception import GiftNotClaimedByProvidedUserException
from src.models.gift import Gift
from src.repositories.spreadsheet_repository import SpreadsheetRepository


class GiftRepository(SpreadsheetRepository):
    _TABLE_NAME = 'Gifts'

    def create_gift(self, gift: Gift) -> None:
        to_insert = gift.to_dict()
        to_insert['claimer'] = None
        table = self._get_table() + [to_insert]
        self._update_table(table)

    def get_user_gifts(self, username: str) -> List[Gift]:
        return [Gift.from_dict(row) for row in self._get_table() if row['username'] == username]

    def update_gift(self, gift: Gift) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift.gift_id and
                    row['username'] == gift.username]
        if not filtered:
            raise ElementNotFoundException()

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

    def claim(self, claimer_username: str, gift_id: str) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id]
        if not filtered:
            raise ElementNotFoundException()
        if filtered[0]['claimer']:
            raise GiftAlreadyClaimedException()
        filtered[0]['claimer'] = claimer_username
        self._update_table(table)

    def unclaim(self, claimer_username: str, gift_id: str) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id]
        if not filtered:
            raise ElementNotFoundException()
        if filtered[0]['claimer'] != claimer_username:
            raise GiftNotClaimedByProvidedUserException()
        filtered[0]['claimer'] = None
        self._update_table(table)

    def get_user_claims(self, username: str) -> List[Gift]:
        table = self._get_table()
        return [Gift.from_dict(row) for row in table if row['claimer'] == username]

    def delete(self, username: str, gift_id: str) -> None:
        table = self._get_table()
        filtered = [row for row in table if row['gift_id'] == gift_id and
                    row['username'] == username]
        if not filtered:
            raise ElementNotFoundException()
        table.remove(filtered[0])
        self._update_table(table)
