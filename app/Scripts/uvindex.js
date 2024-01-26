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
    


    const circleRadius = 200;
    const blurValue = 20 ; 


    const blurcircle = svg.append("circle")
        .attr("cx", svgWidth / 2)
        .attr("cy", svgHeight / 2)
        .attr("r", circleRadius)
        .style("fill", "#FFEAB6")  
        .style("filter", `blur(${blurValue}px)`);

    // Circle in the front
    svg.append("circle")
        .attr("cx", svgWidth / 2)
        .attr("cy", svgHeight / 2)
        .attr("r", circleRadius)
        .style("fill", "#FFEAB6"); 



   
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









    let citydata = { name: "", lat: 0, lng: 0 };
    let uvIndex; 
    
   
    function handleSelectedCityUpdate(selectedCity) {
        console.log("Selected City in uvindex file :", selectedCity);
        citydata = { name: selectedCity.name, lat: selectedCity.lat, lng: selectedCity.lng };
    
        const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${citydata.lat}&longitude=${citydata.lng}&current=uv_index`;
    
      
        d3.json(apiUrl)
            .then(apidata => {
              
                uvIndex = apidata.current.uv_index;
    
                console.log("uv_index:", uvIndex);
    
                renderVisualization();
            })
            .catch(error => {
                
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
            .style("position", "relative")
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
    
    
    function animateBlur() {
        backgroundCircle.transition()
            .duration(1500) 
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[0], blurRange[1]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(1500) 
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[1], blurRange[0]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2500) 
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[0], blurRange[3]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(1500)
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[3], blurRange[2]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(1500)
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[2], blurRange[3]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .transition()
            .duration(2500)
            .tween("blur", function () {
                const interpolator = d3.interpolate(blurRange[3], blurRange[0]);
                return function (t) {
                    const blurValue = interpolator(t);
                    this.style.filter = "blur(" + blurValue + "px)";
                };
            })
            .on("end", animateBlur); // Restart the animation
    }



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



    initsvg.transition()
        .duration(2000)  
        .attr("transform", "translate(-300, 0)") 
        .on("end", function(){
            const rec = initcontainer.append("h3")
            .style("position", "absolute")
            .style("left", "50%")  
            .style("bottom", "55%")
            .style("width", "800px")
            .style("height", "30px")
            .style("font-size", "20px")
            .style("font-weight", "100")
            .style("color", "#d0d0d0")
            .text(`${recommendation}`)
            .style("opacity", 0)  
            .transition()
            .duration(500)  
            .style("opacity", 1);  

            const spf = initcontainer.append("h3")
            .style("position", "absolute")
            .style("left", "50%")  
            .style("bottom", "50%")
            .style("width", "800px")
            .style("height", "30px")
            .style("font-size", "20px")
            .style("font-weight", "100")
            .style("color", "#d0d0d0")
            .text(`${recspf}`)
            .style("opacity", 0)  
            .transition()
            .duration(500)  
            .style("opacity", 1); 


            const morerec = initcontainer.append("h3")
            .style("position", "absolute")
            .style("left", "50%")  
            .style("bottom", "45%")
            .style("width", "800px")
            .style("height", "30px")
            .style("font-size", "20px")
            .style("font-weight", "100")
            .style("color", "#d0d0d0")
            .text(`${adrec}`)
            .style("opacity", 0)  
            .transition()
            .duration(500)  
            .style("opacity", 1);  


             
        });









    }
    
    
  
  
  setSelectedCityCallback(handleSelectedCityUpdate);

 


