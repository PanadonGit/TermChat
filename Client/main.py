from frontend import LoginComponent,WelcomePage
from textual.widgets import  Footer, Header
from textual.screen import Screen


from textual.app import App, ComposeResult
from textual.widgets import Input



class LoginScreen(Screen):
    def compose(self) -> ComposeResult:
        yield Header()
        yield LoginComponent()
        yield Footer()

class WelcomeScreen(Screen):
    def compose(self) -> ComposeResult:
        yield WelcomePage()


class MainApp(App):
    #SCREENS = {"login": LoginScreen}
    CSS_PATH="global.css"

    def on_mount(self) -> None:
        self.install_screen(LoginScreen(), name="login")
        self.install_screen(WelcomeScreen(), name="welcome")
        self.push_screen('login')

    def on_login_component_succeeded(self,message:LoginComponent.Succeeded) -> None:
        #raise Exception(message.token)
        self.push_screen('welcome')
        self.switch_screen('welcome')
        self.pop_screen
        
        




if __name__  == "__main__":
    app = MainApp()
    app.run()