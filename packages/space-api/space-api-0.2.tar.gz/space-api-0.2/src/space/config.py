#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pathlib import Path
from configparser import ConfigParser


class Config:

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._values = {}

        return cls._instance

    def __setitem__(self, name, value):
        self._values[name] = value

    def __getitem__(self, name):
        if name not in self._values:
            raise ConfigError("Unknown configuration variable '%s'" % name)

        return self._values[name]

    @classmethod
    def load(cls, path):

        path = Path(path)

        if not path.exists():
            raise FileNotFoundError(path)

        confpath = path / "space.conf"

        if not confpath.exists():
            raise FileNotFoundError(confpath)

        confparser = ConfigParser()
        confparser.read(str(confpath))

        for section in confparser.sections():
            cls._instance[section] = dict(confparser[section])

        cls._instance['folder'] = path


class ConfigError(RuntimeError):
    pass


config = Config()


try:
    # Load the '~/.space' folder
    config.load(Path.home() / ".space")
except FileNotFoundError:
    # If it doesn't exist, use an empty config dict
    pass
