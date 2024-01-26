# MedData: UV Index Guide

UV radiation could cause a variety of different issues ranging from irritation to different types of skin cancer.<br>
The intensity of UV radiation present in any given location could be measured by the "UV Index".<br>
Once we understand the general harms of UV radiation, It becomes important to respond accordingly.<br>
This means limiting the time we spend outside and in the sun, and taking other protective measures such as using proper sun protection agents.<br>
<br>
Many cancer patients who are currently, or have gone through chemotheray and/or radiation therapy in the past, experience hightened skin sensitivity. This puts them in a more vulnerable position against the sun's radiation. 
This project aims to guide these patients in a way that is easy to understand and navigate, in taking the proper measures to be safer when it comes to the sun. Although targeted towards these patients, others with sensitive skin could also benefit from the finished project.<br>
This repositiry can be accessed from the following URL: https://github.com/ABiteofPi/MedData/

## Data
The project uses a JSON database, holding cities' names, longitude, and latitude information.<br>
The JSON file is encoded in GeoJSON format.
The file's source of data is [GeoNames Gazetteer](http://www.geonames.org/)
This file is licensed under a [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/) and the version used for the project was accessed from [here](https://github.com/lutangar/cities.json), and then converted to GeoJSON encoding.
<br>
The project additionally accesses UV Index data from [Open Meteo](https://open-meteo.com/)<br>

There is a link under the search bar that would redirect you to an upload page. From here you can upload your own JSON file containing location data.<br>
The data must include a name, latitude, and longitude, if nothing else.<br>
It must also follow GeoJSON encoding standard.<br>
You can use the provided "sample.json" file to test this feature.<br>
The location names included in the sample file, are "Aaa", "Bbb", "Ccc", and follow the english alphabetical order until the letter J ("Jjj"). keep this in mind when searching for location names after your upload.


## How It Works

The project can be saved and run locally or in Codespaces.<br>
In Codespaces, the project should automatically install dependencies and required libraries. It will then redirect to the "app" directory and run "python3 -m uvicorn main:app --reload".<br>
you can open the app by clicking on the ports tab next to terminal, and ctrl+clicking on the link being shown under Forwarded Address.<br>
Upon openning the page, You are greeted and prompted to search for your location.<br>
Simply start typing your city name, and from the drop down, select your city when it appears.<br>
You will then be shown the current UV index value of your selected city and recommendations based on this value.<br>
Additionally, you have access to an overview of the UV index for your city for the current week.<br>
You can upload your own location data for more specific results.<br>
This could include data for neighbourhoods or streets. Please read the Data section for more information on uploading your own data.<br>
If you face issues when trying to re-upload data (ex. the app slowing down), Please close the app and run again, the issue may be because of cache, and js loading/unloading data.

### Important
The following can be done to avoid noticed issues or bugs:<br>
- When running the app in Codespaces, the devcontainer will be built. When the editor environment loads, please wait until you can read "Running postCreateCommand..." followed by "cd app && python3 -m uvicorn main:app --reload" in the terminal. Then wait an additional few seconds to allow the initial json library to be loaded properly brefore going to the ports tab and ctrl+clicking on the link under Forwarded Address.<br>
- When opening the app for the first time (ex. in codespaces), please wait about 5 seconds before typing your location in the search bar.<br>
- If you notice clicking on your selected city or location doesn't trigger the visuals to take place, refreshing the page will most likely resolve the issue. This also stands if you notice the same issue selecting a different location after having already selected previous ones with not issues.<br>
- When typing your location (ex. Passau), please wait a split second before typing in the last character or few characters (ex. Passa) to allow the data to load. The city name MUST be selected from the list that loads.<br>
- after searching for your initial location and selecting it, please wait about 5 seconds before searching for another city.<br>
- The project works best on Firefox and chrome. There may be some issues with transition effects on Safari.<br>
- If you notice the sun effect not moving towards the left, and the recommendations not showing up, there may be an issue with the browser interpreting transition effects. Your browser may not be updated to the latest version. Please consider opening the project on updated Firefox or Chrome.
- If you already have another project running and active on port: 8000, The app will not load, and you may notice issues with the devcontainer running postCreateCommand. 


## Screenshots
![alt text](https://raw.githubusercontent.com/ABiteofPi/MedData/main/Screenshots/01.png)<br>
![alt text](https://raw.githubusercontent.com/ABiteofPi/MedData/main/Screenshots/02.png)
