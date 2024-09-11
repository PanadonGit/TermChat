from textual.app import ComposeResult
from textual.widgets import Input,Static,Button
from textual.message import Message
from textual.containers import Horizontal 
from rich.text import Text
import requests

url = 'http://localhost:3000/api/auth/register'

class RegisterComponent(Static):
    email = ""
    username = ""
    password = ""
    firstname = ""
    lastname = ""

    def compose(self) -> ComposeResult:
        yield Static("\n\n\n")
        yield Static("Register")

        yield Static("\n")

        yield Horizontal(
            Input(placeholder="First Name",classes="input-login",id="firstname-register-input"),
            Input(placeholder="Last Name",classes="input-login",id="lastname-register-input")
            )
        yield Static("\n")
        yield Input(placeholder="Email",classes="input-login",id="email-register-input")
        yield Input(placeholder="Username",classes="input-login",id="username-register-input")
        yield Input(placeholder="Password",classes="input-login",password=True,id="password-register-input")
        yield Static("\n")
        yield Button("Register",id="register-submit-btn")

    def on_input_changed (self,event:Input.Changed) -> None:  
        if(event.input.id == "firstname-register-input"):
            self.firstname = event.value
        elif(event.input.id == "lastname-register-input" ):
            self.lastname = event.value  
        elif(event.input.id == "email-register-input" ):
            self.email = event.value  
        elif(event.input.id == "username-register-input" ):
            self.username = event.value 
        elif(event.input.id == "password-register-input" ):
            self.password = event.value 

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if (event.button.id == "register-submit-btn"):
            #raise Exception(event.button.id)
            body = {
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "username": self.username,
            "password": self.password
            }
            result = requests.post(url, json = body)
            