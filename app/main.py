from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()
app.mount("/Data", StaticFiles(directory="Data"), name="Data")
app.mount("/Scripts", StaticFiles(directory="Scripts"), name="Scripts")
app.mount("/Styles", StaticFiles(directory="Styles"), name="Styles")
app.mount("/Templates", StaticFiles(directory="Templates"), name="Templates")
templates = Jinja2Templates(directory="Templates")

def makehtml(htmlpath: str):
    with open(htmlpath, "r", encoding="utf-8") as file:
        return file.read()
    

def checkjson(filename):
    return filename.endswith('.json')


@app.get("/")
def viewpage():
    indexhtml = makehtml("Templates/index.html")
    return HTMLResponse(content=indexhtml, status_code=200)


@app.get("/upload")
def getupload():
    uploadhtml = makehtml("Templates/upload.html")
    return HTMLResponse(content=uploadhtml, status_code=200)


@app.post("/uploadgeojson")
async def create_upload_file(file: UploadFile = File(...)):
    if not checkjson(file.filename):
        raise HTTPException(status_code=400, detail="Uploaded file must be a JSON file with GeoJSON encoding")
    new_filename = "userlocation.json"
    upload_dir = "Data"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, new_filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    userindex = makehtml("Templates/userlocindex.html")

   

    """return {"Message": "Upload Successful!", "File Name": file.filename}"""
    return HTMLResponse(content=userindex, status_code=200)

@app.get("/backtoindex")
def back():
    return RedirectResponse(url="/", status_code=302)


