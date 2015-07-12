module.exports =  function (domLocation) {
  var d3 = require('d3');
  var $ = require('jquery');
  
    console.log('making scatterplot');
    
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var parseDate = d3.time.format("%Y%m%d").parse;
    
    var svg = d3.select(domLocation).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);
    
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.temperature); });
    
	d3.json("/api/trends/", function(error, data) {
	  if (error) throw error;
    
    console.log(data);
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
    
        
  });
}

