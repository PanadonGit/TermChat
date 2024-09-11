from textual.app import ComposeResult
from textual.widgets import Input,Static,Button
from textual.message import Message
from textual.containers import Horizontal 
from rich.text import Text


import requests


url = 'http://localhost:3000/api/auth/login'



class LoginComponent(Static):
    #CSS_PATH = "login.css"


    username = ""
    password = ""

    class Succeeded(Message):
        def __init__(self,token:str) -> None:
            self.token = token
            super().__init__()


    def compose(self) -> ComposeResult:
        yield Static("\n\n\n")
        yield Static("Please Login\n")
        yield Input(placeholder="Email",id="user_input" , classes="input-login")
        yield Input(placeholder="Password",password=True,id="passwd_input" , classes="input-login")
        yield Static("",id='wrong_passwd')
        yield Static("\n")
        yield Button("Login",id="loginbtn")
        yield Static("\n")
        yield Horizontal(Button("forgot password",classes="forgot-button"), Button("Register",classes="forgot-button",id="register-btn"))

    



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
                wrong_text = Text(result.json()['msg'],style="bold red")
                wrong_passwd.update(wrong_text)

            

            #send login request to Server here
    
    def on_input_changed (self,event:Input.Changed) -> None:  
        if(event.input.id == "user_input"):
            self.username = event.value
        elif(event.input.id == "passwd_input" ):
            self.password = event.value