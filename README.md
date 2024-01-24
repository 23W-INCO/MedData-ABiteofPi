# MedData: UV Index Guide

UV radiation could cause a variety of different issues ranging from irritation to different types of skin cancer.<br>
The intensity of UV radiation present in any given location could be measured by the "UV Index".<br>
Once we understand the general harms of UV radiation, It becomes important to respond accordingly.<br>
This means limiting the time we spend outside and in the sun, and taking other protective measures such as using proper sun protection agents.<br>
<br>
Many cancer patients who are currently, or have gone through chemotheray and/or radiation therapy in the past, experience hightened skin sensitivity. This puts them in a more vulnerable position against the sun's radiation. 
This project aims to guide these patients in a way that is easy to understand and navigate, in taking the proper measures to be safer when it comes to the sun. Although targeted towards these patients, others with sensitive skin could also benefit from the finished project.

## Data
The project uses a json database, holding cities' names, longitude, and latitude information.
The file's source of data is [GeoNames Gazetteer](http://www.geonames.org/)
This file is licensed under a [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/) and the version used in the project was accessed from [here](https://github.com/lutangar/cities.json).
<br>
The project additionally accesses UV Index data from [Open Meteo](https://open-meteo.com/)


## How It Works

Upon openning the page, You are greated and prompted to search for your city.<br>
Simply start typing your city name, and from the frop down, select your city when it appears.<br>
You will then be shown the current UV index value of your selected city and recommendations based on this value.<br>
Additionally, you have access to an overview of the UV index for your city for the current week.<br>

### Important
To avoid issues or bugs, after searching for your initial city and selecting it, please wait about 5 seconds before searching for another city.
The project works best on Firefox and chrome. There may be some issues with effects on Safari.
