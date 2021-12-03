from flask import Response
import os
import pathlib

from src.config_provider import ConfigProvider


class StaticFilesProvider:
    _MIMETYPES = {
        None: 'text/plain',
        '': 'text/plain',
        'js': 'application/javascript',
        'css': 'text/css',
        'html': 'text/html',
        'ico': 'image/x-icon',
        'json': 'application/json',
        'svg': 'image/svg+xml',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
    }

    def __init__(self) -> None:
        self._files = {}
        self._load_files()

    def _load_files(self) -> None:
        dir_path = os.path.dirname(os.path.realpath(__file__))
        static_files_path = dir_path + '/' + ConfigProvider.CLIENT_APP_FOLDER
        for path, subdirs, files in os.walk(static_files_path):
            for name in files:
                file_path = os.path.join(path, name).replace(static_files_path, '')
                file_content = None
                try:
                    with open(os.path.join(path, name), 'r') as f:
                        file_content = f.read()
                    self._files[file_path] = file_content
                except Exception as e:
                    print(f"An error has occurred when trying to get the file content of file '{file_path}': {e}")

    def _get_mimetype(self, path: str) -> str:
        extension = pathlib.Path(path).suffix.replace('.', '')
        if extension in self._MIMETYPES:
            return self._MIMETYPES[extension]
        print(f"Mimetype not found for file extension '.{extension}'")
        return self._MIMETYPES[None]

    def _get_file_content(self, path: str) -> str:
        return self._files.get(path, None)

    def static_file_response(self, path: str) -> Response:
        file_content = f'/{self._get_file_content(path)}'.replace('//', '/')
        if file_content is None:
            return Response(status=404)
        return Response(file_content, mimetype=self._get_mimetype(path))
