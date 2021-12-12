from typing import List, Set

from src.utils import hashing


class User:

    def __init__(self, username: str, hashed_password: str, name: str, groups: Set[int]) -> None:
        self._username = username
        self._hashed_password = hashed_password
        self._name = name
        self._groups = groups

    @property
    def username(self) -> str:
        return self._username

    @property
    def hashed_password(self) -> str:
        return self._hashed_password

    @property
    def name(self) -> str:
        return self._name

    @property
    def groups(self) -> Set[int]:
        return self._groups

    @staticmethod
    def from_dict(data: dict) -> 'User':
        return User(
            username=data.get('username'),
            hashed_password=data.get('hashed_password', hashing.hash_password(data.get('password'))),
            name=data.get('name'),
            groups=User._map_groups(data)
        )

    @staticmethod
    def _map_groups(data: dict) -> Set[int]:
        groups = data.get('groups', [])
        if isinstance(groups, int):
            return {groups}
        if isinstance(groups, str):
            return set([int(x) for x in groups.split(',')])
        return set(groups)

    def to_dict(self, include_hashed_password=False) -> dict:
        user_dict = {
            'username': self.username,
            'name': self.name,
            'groups': list(self.groups)
        }
        if include_hashed_password:
            user_dict['hashed_password'] = self.hashed_password
        return user_dict
