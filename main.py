from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from os import listdir, rename
from os.path import isfile, join
import numpy as np


app = FastAPI()
app.mount("/styles", StaticFiles(directory="styles"), name="styles")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")
app.mount("/files", StaticFiles(directory="files"), name="files")

def makehtml(filter=None):
  index= """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css" />
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <title>UV Index Guide</title>
</head>
<body>


    <div style="text-align: center; color: #d0d0d0;">
        <h1 style="font-weight: 100; font-size: 40px;">Welcome to UV Index Guide</h1>
        <h2 style="font-weight: 100; font-size: 25px; margin-bottom: 6vh;">To start, first enter the city you're located in</h2>
    </div>
    <div class="search-container">
        <input type="text" class="city-search" placeholder="Enter your city">
        <ul class="search-results"></ul>
        <script type="module" src="scripts/loc.js"></script>
    </div>
    
      



    <div class="uv-index-container">
        <div>
            <script type="module" src="scripts/loc.js"></script>
            <script type="module" src="scripts/uvindex.js"></script>
        </div>
    </div>
    



</body>
</html>
"""

  return index


@app.get("/")
def viewpage():
    html_content = makehtml()
    return HTMLResponse(content=html_content, status_code=200)