import { setSelectedCityCallback } from "./loc.js";




const svgWidth = 800;
const svgHeight = 600;

const svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("id", "initial-svg");
    

// Create the circles
const circleRadius = 150;
const blurValue = 20 ; // Define the range of blur values

// Circle in the back with blur
svg.append("circle")
    .attr("cx", svgWidth / 2)
    .attr("cy", svgHeight / 2)
    .attr("r", circleRadius)
    .style("fill", "#FFEAB6")  // Set your desired color
    .style("filter", `blur(${blurValue}px)`);

// Circle in the front
svg.append("circle")
    .attr("cx", svgWidth / 2)
    .attr("cy", svgHeight / 2)
    .attr("r", circleRadius)
    .style("fill", "#FFEAB6");  // Set your desired color



// Add text lines to the center of the circles
const textLines = [
    { text: "--", style: "font-size: 60px; font-weight:1000; fill: #314652;" },
    { text: "UV Index", style: "font-size: 20px; font-weight:1000; fill: #314652;" }
];

svg.selectAll("text")
    .data(textLines)
    .enter()
    .append("text")
    .attr("x", svgWidth / 2)
    .attr("y", (d, i) => svgHeight / 2 + i * 50)  // Adjust the vertical spacing
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("style", d => d.style)  // Apply individual styles
    .text(d => d.text);


    



    let citydata = { name: "", lat: 0, lng: 0 };
    let uvIndex; // Declare a variable to store the uvIndex globally
    
    // Function to handle the selectedCity update in the second file
    function handleSelectedCityUpdate(selectedCity) {
        console.log("Selected City in the second file:", selectedCity);
        citydata = { name: selectedCity.name, lat: selectedCity.lat, lng: selectedCity.lng };

    
        const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${citydata.lat}&longitude=${citydata.lng}&current=uv_index`;
    
        // Fetch data from the API
        d3.json(apiUrl)
            .then(apidata => {
                // Extract the uv_index value
                uvIndex = apidata.current.uv_index;
    
                // Handle the uv_index value as needed
                console.log("uv_index:", uvIndex);
    
                // Continue with the rendering logic
                renderVisualization();
            })
            .catch(error => {
                // Handle errors if any
                console.error('Error fetching data:', error);
            });
    }
    
    function renderVisualization() {
        d3.select("#initial-svg").remove();
        d3.select("#updatedsvg").remove();

        
        const svgWidth = 800;
        const svgHeight = 600;
    
        const initsvg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("id", "updatedsvg");
    
        const circleRadius = 150;
    
        const blurRange = [20, 30, 40, 50];
        const backgroundCircle = initsvg.append("circle")
            .attr("cx", svgWidth / 2)
            .attr("cy", svgHeight / 2)
            .attr("r", circleRadius)
            .style("fill", "#FFEAB6")
            .style("filter", "blur(" + blurRange[0] + "px)");
    
        initsvg.append("circle")
            .attr("cx", svgWidth / 2)
            .attr("cy", svgHeight / 2)
            .attr("r", circleRadius)
            .style("fill", "#FFEAB6");
    
        const textLines = [
            { text: uvIndex, style: "font-size: 60px; font-weight:1000; fill: #314652;" },
            { text: "UV Index", style: "font-size: 20px; font-weight:1000; fill: #314652;" }
        ];
    
        const lineHeight = 50;
    
        initsvg.selectAll("text")
            .data(textLines)
            .enter()
            .append("text")
            .attr("x", svgWidth / 2)
            .attr("y", (d, i) => svgHeight / 2 + i * lineHeight)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("style", d => d.style)
            .text(d => d.text);
    
        // Function to animate the blur continuously
           // Function to animate the blur continuously
    function animateBlur() {
        backgroundCircle.transition()
            .duration(2000) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[0], blurRange[1]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2000) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[1], blurRange[0]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(3000) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[0], blurRange[3]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2000) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[3], blurRange[2]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2000) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[2], blurRange[3]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(3000) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[3], blurRange[0]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .on("end", animateBlur); // Restart the animation
    }

        // Start the initial animation
        animateBlur();
    }
    
    
  
  // Set the callback function using the imported function
  setSelectedCityCallback(handleSelectedCityUpdate);
  

