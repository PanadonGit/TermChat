from textual.app import ComposeResult
from textual.widgets import Input,Static,Button
from textual.message import Message
from rich.text import Text


import requests

url = 'http://localhost:3000/api/login'



class LoginComponent(Static):
    CSS_PATH = "./css/login.tcss"

    username = ""
    password = ""

    class Succeeded(Message):
        def __init__(self,token:str) -> None:
            self.token = token
            super().__init__()


    def compose(self) -> ComposeResult:
        yield Static("\n\n\n")
        yield Static("Please Login\n")
        yield Input(placeholder="Login",id="user_input")
        yield Input(placeholder="Password",password=True,id="passwd_input")
        yield Static("\n")
        yield Button("Login",id="loginbtn")
        yield Static("\n")
        yield Static("",id='wrong_passwd')



    def on_button_pressed(self, event: Button.Pressed) -> None:

        if(event.button.id=="loginbtn"):
            body = {
                    'user': self.username,
                    'password': self.password
                    }
            
            result = requests.post(url, json = body)
            StatusCode = result.status_code
            if(StatusCode == 200):
                self.post_message(self.Succeeded(StatusCode))
            else:
                wrong_passwd = self.query_one("#wrong_passwd",Static)
                wrong_text = Text("invalid username or password", style="bold red")
                wrong_passwd.update(wrong_text)

            

            #send login request to Server here
    
    def on_input_changed (self,event:Input.Changed) -> None:  
        if(event.input.id == "user_input"):
            self.username = event.value
        elif(event.input.id == "passwd_input" ):
            self.password = event.value