module.exports =  function (descriptor, gradient) {
   var d3 = require('d3');
   var $ = require('jquery');
   var gradients = require('../datavis/gradients');
 //  console.log('buildmap');

   var width = 960,
   height = 500;
   
   var legendDomain = [0.0,0.01,.02, .04, .06, .08, .10, .25, .50, .75, 0.9];
   
   var legendTextLabels = ['< 0.01','0.01+','.02+', '.04+', '.06+', '.08+', '.10+', '.25+', '.50+', '.75+', '0.9+'];
   
   var colorDomain = [0.01,.02, .04, .06, .08, .10, .25, .50, .75, 0.9];
   
   var projection = d3.geo.albersUsa()
        .translate([width/2, height/2])
        .scale([1000]);
   
   var path = d3.geo.path()
        .projection(projection);
                
   var color = d3.scale.threshold()
        .domain(colorDomain)
        .range(gradient);

   var svg = d3.select(".map").append("svg")
        .attr("width", width)
        .attr("height", height);
        
   var legend = svg.selectAll("g.legend")
        .data(legendDomain)
        .enter().append("g");
        
   var ls_w = 20, ls_h = 20;

     
   d3.json("/api/us", function (data) {
        //console.log(d3.max(data, function(d) { return d.number_of_projects; }));

        d3.json("/static/data/us.json", function(json) {
        //console.log(data[0].name);
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            //Grab state name
            var dataState = data[i].name;
            //console.log(data[i][descriptor]);
            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i][descriptor]);
            
            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

            var jsonState = json.features[j].properties.name;

            if (dataState == jsonState) {

                //Copy the data value into the JSON
                json.features[j].properties.value = dataValue/d3.max(data, function(d) { return d[descriptor]; });

                //Stop looking through the JSON
                break;

                }
            }
        }
       
       svg.selectAll("path")
                   .data(json.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                   .style("fill", function(d) {
                    //Get data value
                    //console.log(d.properties.value);
                    var value = d.properties.value;

                    if (value) {
                            //If value exists…
                            return color(value);
                    } else {
                            //If value is undefined…
                            return "#ccc";
                    }
                    
                   })
                   .style("stroke", "#fff");
                   
       legend.append("rect")
        .attr("x", 20)
        .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function(d, i) { return color(d); })
        .style("opacity", 0.8);     
   
       legend.append("text")
        .attr("x", 50)
        .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
        .text(function(d, i){ return legendTextLabels[i]; });  
          
            d3.select('#dropdown').on('change', function () {
                
                
                color = d3.scale.threshold()
                    .domain([0.01,.02, .04, .06, .08, .10, .25, .50, .75, 0.9])
                    .range(gradients[d3.select("#dropdown").node().value]);
                    
                legend.select('rect').style("fill", function(d, i) { return color(d); }); 
                
                 for (var i = 0; i < data.length; i++) {
                    //Grab state name
                    var dataState = data[i].name;
                    //console.log(data[i][d3.select('#dropdown').node().val]);
                    //Grab data value, and convert from string to float
                    var dataValue = parseFloat(data[i][d3.select('#dropdown').node().value]);
                    
                    //Find the corresponding state inside the GeoJSON
                    for (var j = 0; j < json.features.length; j++) {
        
                    var jsonState = json.features[j].properties.name;
        
                    if (dataState == jsonState) {
        
                        //Copy the data value into the JSON
                        json.features[j].properties.value = dataValue/d3.max(data, function(d) { return d[d3.select('#dropdown').node().value]; });
        
                        //Stop looking through the JSON
                        break;
        
                        }
                }
                
                 }
                
                  svg.selectAll("path")
                   .data(json.features)
                   
                   .attr("d", path)
                   .style("fill", function(d) {
                    //Get data value
                    //console.log(d.properties.value);
                    var value = d.properties.value;

                    if (value) {
                            //If value exists…
                            return color(value);
                    } else {
                            //If value is undefined…
                            return "#ccc";
                    }
                    
                   })
                   .style("stroke", "#fff");
                 
             });
                    
       });
      
    }); 
  }


