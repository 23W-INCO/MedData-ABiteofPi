import { setSelectedCityCallback } from "./loc.js";

const colorScaleC = d3.scaleLinear()
    .domain([0, 0.01, 2, 5, 7, 10, 15])
    .range(['#FFEAB6', '#FFD25F', '#FFB800', '#FF9900', '#FF6B00', '#FF3D00']);

const colorScaleB = d3.scaleLinear()
    .domain([0, 0.01, 2, 5, 7, 10, 15])
    .range(['#FFEAB6', '#FFD873', '#FF7816', '#FF1616', '#FF0000', '#FF0000']);

const svgWidth = 700;
const svgHeight = 700;

function initvis(){
        const container = d3.select("body")
            .append("div")
            .attr("class", "container")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("align-items", "center");

        const svg = container.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("id", "initial-svg");
    

    // Create the circles
    const circleRadius = 200;
    const blurValue = 20 ; // Define the range of blur values

    // Circle in the back with blur
    const blurcircle = svg.append("circle")
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

    
    const lineHeight = 40;
    
    svg.selectAll("text")
        .data(textLines)
        .enter()
        .append("text")
        .attr("x", svgWidth / 2)
        .attr("y", (d, i) => svgHeight / 2 + i * lineHeight)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("style", d => d.style)
        .text(d => d.text)
}



    
    initvis();





    //function sunvis(){



    let citydata = { name: "", lat: 0, lng: 0 };
    let uvIndex; // Declare a variable to store the uvIndex globally
    
    // Function to handle the selectedCity update in the second file
    function handleSelectedCityUpdate(selectedCity) {
        console.log("Selected City in uvindex file :", selectedCity);
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

       
    
        const initcontainer = d3.select("body")
            .append("div")
            .attr("class", "container")
            .attr("id", "updatedsvg")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("align-items", "center")
            .style("margin", "0");


        const initsvg = initcontainer.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("id", "updatedsvg");
    
        const circleRadius = 200;
    
        const blurRange = [20, 30, 40, 50];
        const backgroundCircle = initsvg.append("circle")
            .attr("cx", svgWidth / 2)
            .attr("cy", svgHeight / 2)
            .attr("r", circleRadius)
            .style("fill", colorScaleB(uvIndex))
            .style("filter", "blur(" + blurRange[0] + "px)");
    
        initsvg.append("circle")
            .attr("cx", svgWidth / 2)
            .attr("cy", svgHeight / 2)
            .attr("r", circleRadius)
            .style("fill", colorScaleC(uvIndex));
    
        const textLines = [
            { text: uvIndex, style: "font-size: 60px; font-weight:1000; fill: #1B272E" },
            { text: "UV Index", style: "font-size: 20px; font-weight:800; fill: #1B272E;" },
            { text: citydata.name, style: "font-size: 25px; font-weight:800; fill: #1B272E;" }
        ];
    
        const lineHeight = 40;
    
        initsvg.selectAll("text")
            .data(textLines)
            .enter()
            .append("text")
            .attr("x", svgWidth / 2)
            .attr("y", (d, i) => svgHeight / 2 + i * lineHeight)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("style", d => d.style)
            .text(d => d.text)
    
        // Function to animate the blur continuously
    function animateBlur() {
        backgroundCircle.transition()
            .duration(1500) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[0], blurRange[1]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(1500) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[1], blurRange[0]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2500) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[0], blurRange[3]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(1500) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[3], blurRange[2]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(1500) // Adjust the duration as needed
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[2], blurRange[3]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2500) // Adjust the duration as needed
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

    let recommendation;
    let recspf;
    let adrec;
    if (uvIndex===0){
        recommendation= "You can enjoy outside without worry"
        recspf = " "
        adrec = " "
    } else if (uvIndex> 0 && uvIndex<= 2){
        recommendation= "You can enjoy outside for upwards 30 minutes."
        recspf = "upwards 45 minutes if you wear spf 30 sunscreen and lipbalm."
        adrec = " "
    } else if (uvIndex> 2 && uvIndex<= 5){
        recommendation= "It is recommended to only spend 15-20 minutes outside."
        recspf = "30-45 minutes if you wear spf 30 sunscreen and lipbalm."
        adrec = "You could also consider wearing protective clothing, including a hat and sunglasses."
    } else if (uvIndex> 5 && uvIndex<= 7){
        recommendation= "It is recommended to spend no more than 10 minutes outside."
        recspf = "20-30 minutes if you wear spf 30 sunscreen and lipbalm."
        adrec = "You should also consider wearing protective clothing, including a hat and sunglasses."
    } else if (uvIndex> 7 && uvIndex<= 10){
        recommendation= "It is recommended to spend 5 minutes or less outside."
        recspf = "10-20 minutes if you wear and diligently apply and re-apply spf 30 sunscreen and lipbalm."
        adrec = "You should also consider wearing protective clothing, including a hat and sunglasses."
    } else{
        recommendation= "It is best to avoid the sun."
        recspf= "Please wear and diligently apply and re-apply spf 30 sunscreen and lipbalm."
        adrec= "Wear protective clothing and seek shade. Try to avoid going out unless absolutely necessary."
    }


           // Transition the entire updated visualization to the left
    initsvg.transition()
        .duration(2000)  // Adjust the duration as needed
        .attr("transform", "translate(-300, 0)")  // Translate to the left
        .on("end", function(){
            const rec = initcontainer.append("h3")
            .style("position", "absolute")
            .style("left", svgWidth + 300 + "px")  // Adjust the left position for horizontal spacing
            .style("bottom", svgHeight / 2 -20 + "px")
            .style("font-size", "20px")
            .style("font-weight", "100")
            .style("color", "#d0d0d0")
            .text(`${recommendation}`)
            .style("opacity", 0)  // Initially set opacity to 0
            .transition()
            .duration(500)  // Adjust the duration as needed
            .style("opacity", 1);  // Smoothly transition to full opacity

            const spf = initcontainer.append("h3")
            .style("position", "absolute")
            .style("left", svgWidth + 300 + "px")  // Adjust the left position for horizontal spacing
            .style("bottom", svgHeight / 2 -60+ "px")
            .style("font-size", "20px")
            .style("font-weight", "100")
            .style("color", "#d0d0d0")
            .text(`${recspf}`)
            .style("opacity", 0)  // Initially set opacity to 0
            .transition()
            .duration(500)  // Adjust the duration as needed
            .style("opacity", 1);  // Smoothly transition to full opacity


            const morerec = initcontainer.append("h3")
            .style("position", "absolute")
            .style("left", svgWidth + 300 + "px")  // Adjust the left position for horizontal spacing
            .style("bottom", svgHeight / 2 -100 + "px")
            .style("font-size", "20px")
            .style("font-weight", "100")
            .style("color", "#d0d0d0")
            .text(`${adrec}`)
            .style("opacity", 0)  // Initially set opacity to 0
            .transition()
            .duration(500)  // Adjust the duration as needed
            .style("opacity", 1);  // Smoothly transition to full opacity


             
        });









    }
    
    
  
  // Set the callback function using the imported function
  setSelectedCityCallback(handleSelectedCityUpdate);

    //}


//sunvis();