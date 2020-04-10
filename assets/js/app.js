// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("class", "chart")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXaxis = "poverty";


//import data
d3.csv("assets/data/data.csv").then(function(healthData){
    //parse data
    console.log(healthData);
    healthData.forEach(function(data){
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });
//scales

    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d=> d.poverty)-.5, d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.obesity)-.5, d3.max(healthData, d=> d.obesity)])
        .range([height, 0]);

//axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

//append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);
//create circles
    var circlesGroup = chartGroup.selectAll("circle").data(healthData).enter();
    circlesGroup
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");
 //tooltip
 var toolTip = d3.tip()
 .attr("class", "d3-tip")
 .offset([80, -60])
 .html(function(d) {
     return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Obesity: ${d.obesity}`);
 });
 console.log("I'm Here");

 svg.call(toolTip);

 console.log("I'm Here");
 circlesGroup.append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => (yLinearScale(d.obesity) +(15/2.5)))
    .attr("font-size", 15)
    .attr("class", "stateText")
    .on("mouseover", function(data) {
       toolTip.show(data);
      })
      .on("mouseout", function(data, index) {
       toolTip.hide(data);
      });
      console.log("I'm Here");

        // Create axes labels

        var labelsGroup = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 30})`);
        console.log("I'm Here");

      var povertyLabel = labelsGroup.append("text")
        .attr("x", 30)
        .attr("y", 30)
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("Percent in Poverty");
    
      var obesityLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 150)
        .attr("y", -350)
        .attr("value", "obesity") 
        .text("Obesity Percentage");

        labelsGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left + 40)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .classed("class", "axis-text")
          .text("Percent in Poverty");
    
        labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Obesity Percentage");

      })
      .catch(function(error) {
        console.log(error);
      })
;