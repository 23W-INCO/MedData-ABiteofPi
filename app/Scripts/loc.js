
let selectedCityCallback = null;
let selectedCityCallback2 = null;

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}





function handleSelectedCityUpdate(selectedCity) {

  console.log("Selected City outside of D3 function:", selectedCity);

  if (selectedCityCallback) {
    selectedCityCallback(selectedCity);
  }
}


function handleUpdatechart(selectedCity2) {

  console.log("Selected City outside of D3 function 2:", selectedCity2);


  if (selectedCityCallback2) {
    selectedCityCallback2(selectedCity2);
  }
}


d3.json("../Data/locations.json").then(function (data) {

  let selectedCity = { name: "", lat: 0, lng: 0 };
  let selectedCity2 = { name: "", lat: 0, lng: 0 };


  function extractCoordinates(city) {
    const coordinates = city.geometry.coordinates;
    return { lat: coordinates[1], lng: coordinates[0] };
  }


  const searchInput = d3.select(".city-search");
  const searchResults = d3.select(".search-results");

  const updateSearchResults = debounce(function () {
    const searchTerm = searchInput.property("value").toLowerCase();


    if (!searchTerm) {
      selectedCityCallback = null;
    }

    if (!searchTerm) {
      selectedCityCallback2 = null;
    }

    const filteredCities = searchTerm
      ? data.features.filter((city) =>
          city.properties.name.toLowerCase().includes(searchTerm)
        )
      : [];

    // Update the search results container
    const results = searchResults
      .selectAll("li")
      .data(filteredCities, (d) => d.properties.name);

    // Remove old results
    results.exit().remove();

    // Add new results
    const newResults = results
      .enter()
      .append("li")
      .text((d) => d.properties.name)
      .on("click", function (d) {
        // When a city is selected, update the selectedCity variable
        selectedCity = {
          name: d.properties.name,
          ...extractCoordinates(d),
        };


        console.log("Selected City:", selectedCity);

        selectedCity2 = {
          name: d.properties.name,
          ...extractCoordinates(d),
        };


        // Clear the search input and hide the results
        searchInput.property("value", "");
        searchResults.style("display", "none");

        handleSelectedCityUpdate(selectedCity);
        handleUpdatechart(selectedCity2);
      });

    // Merge new and existing results
    results.merge(newResults);

    // Show the results container
    searchResults.style(
      "display",
      filteredCities.length ? "block" : "none"
    );
  }, 300);


  searchInput.on("input", updateSearchResults);

  document.addEventListener("click", function (event) {
    if (!searchResults.node().contains(event.target)) {
      searchResults.style("display", "none");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      searchResults.style("display", "none");
    }
  });
});


function setSelectedCityCallback(callback) {
  selectedCityCallback = callback;
}

function setSelectedCityCallback2(callback) {
  selectedCityCallback2 = callback;
}

export { setSelectedCityCallback };
export { setSelectedCityCallback2 };
