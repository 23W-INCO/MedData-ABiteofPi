import { setSelectedCityCallback2 } from "./loc.js";


function chartvis(){


    const svgWidth = 1100;
const svgHeight = 300;


    
    let citydata2 = { name: "", lat: 0, lng: 0 };
    let uvIndex; // Declare a variable to store the uvIndex globally
    let rawdata;
    let times;
    // Function to handle the selectedCity update in the second file
    function handleUpdatechart(selectedCity2) {
        console.log("Selected City in the second file:", selectedCity2);
        citydata2 = { name: selectedCity2.name, lat: selectedCity2.lat, lng: selectedCity2.lng };
    
        const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${citydata2.lat}&longitude=${citydata2.lng}&hourly=uv_index`;
    
        // Fetch data from the API
        d3.json(apiUrl)
            .then(apidata => {
                console.log('API Data:', apidata);
                rawdata = apidata;
                // Check if the expected properties are present in the API response
                if (apidata && apidata.hourly && apidata.hourly.uv_index) {
                    // Extract the uv_index array
                    times = apidata.hourly.time;
                    uvIndex = apidata.hourly.uv_index;
    
                    // Handle the uv_index array as needed
                    console.log("uv_index array:", uvIndex);
                    console.log("time array: ", times);

    
                    // Continue with the rendering logic
                    renderChart();
                } else {
                    console.error('Invalid data structure in API response');
                }
            })
            .catch(error => {
                // Handle errors if any
                console.error('Error fetching data:', error);
            });
    }
    
    const colorScaleC = d3.scaleLinear()
        .domain([0, 0.01, 2, 5, 7, 10, 15])
        .range(['#FFEAB6', '#FFD25F', '#FFB800', '#FF9900', '#FF6B00', '#FF3D00']);


    
    function renderChart() {
        d3.select("#pchart").remove();
    

        const container = d3.select("body")
            .append("div")
            .attr("class", "container")
            .attr("id", "pchart")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("align-items", "center")


        container.append("h2")
            .attr("class", "chart-title")
            .text(`${citydata2.name} UV Index Overview for This Week`)
            .style("text-align", "center")
            .style("color", "#d0d0d0")
            .style("font-weight", "100")
            .style("font-size", "25px")



        container.append("h3")
            .attr("class", "chart-title")
            .text("(Hover on points to view exact values)")
            .style("text-align", "center")
            .style("color", "#d0d0d0")
            .style("font-weight", "100")
            .style("font-size", "15px")    

        // Filter data for the current day
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log("it be workin?", uvIndex);

        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;


        const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
        const timeArray = times.map(parseTime);



        
        const chartSvg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "pchart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);



        // Set up scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(timeArray))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(uvIndex)+0.1])
            .range([height, 0]);

            

            // Connect the circles with lines
        chartSvg.selectAll("line")
            .data(uvIndex.slice(0, -1)) // Exclude the last data point for lines
            .enter()
            .append("line")
            .attr("x1", (d, i) => xScale(timeArray[i]))
            .attr("y1", (d, i) => yScale(d))
            .attr("x2", (d, i) => xScale(timeArray[i + 1]))
            .attr("y2", (d, i) => yScale(uvIndex[i + 1]))
            .attr("stroke", "#666666")
            .attr("stroke-width", 2);    

        // Create circles for each data point
        chartSvg.selectAll("circle")
            .data(uvIndex)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(timeArray[i]))
            .attr("cy", d => yScale(d))
            .attr("r", 5) // Adjust the radius based on your preference
            .attr("fill", d => colorScaleC(d))
            .on("mouseover", (d, i) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(`UV Index: ${d.toFixed(2)}`)
                    .style("left", (xScale(timeArray[i]) + margin.left + 355) + "px") // Adjust left position
                    .style("top", (yScale(d) + margin.top + 1155) + "px"); // Adjust top position
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });








        // Create x axis
        chartSvg.append("g")
            .attr("transform", `translate(0, ${height-1})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("fill", "#d0d0d0"); // Set x axis text color
    
        // Create y axis
        chartSvg.append("g")
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .attr("fill", "#d0d0d0"); // Set y axis text color

        chartSvg.selectAll(".domain")
            .attr("stroke", "#d0d0d0");

        // Create x axis label
        chartSvg.append("text")
            .attr("transform", `translate(${width / 2}, ${height + 30})`)
            .style("text-anchor", "middle")
            .text("Time")
            .attr("fill", "#d0d0d0");

        // Create y axis label
        chartSvg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("UV Index")
            .attr("fill", "#d0d0d0");

            

    
        // Set the callback function using the imported function
        //setSelectedCityCallback(handleUpdatechart);
    }
    
    
  // Set the callback function using the imported function
  setSelectedCityCallback2(handleUpdatechart);

}

chartvis();