from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount("/Data", StaticFiles(directory="Data"), name="Data")
app.mount("/Scripts", StaticFiles(directory="Scripts"), name="Scripts")
app.mount("/Styles", StaticFiles(directory="Styles"), name="Styles")
templates = Jinja2Templates(directory="Templates")

def makehtml():
    with open("Templates/index.html", "r", encoding="utf-8") as file:
        return file.read()


@app.get("/")
def viewpage():
    html_content = makehtml()
    return HTMLResponse(content=html_content, status_code=200)