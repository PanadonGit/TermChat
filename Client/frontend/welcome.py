from textual.app import ComposeResult
from textual.widgets import Input,Static,Button
from textual.message import Message


class WelcomePage(Static):
    def compose(self) -> ComposeResult:
        yield Static("\n\n\n\n")
        yield Static(" Welcome!! :D \n")