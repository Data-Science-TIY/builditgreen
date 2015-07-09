module.exports =  function () {
   var topojson = require('topojson');
   var queue = require("queue-async");
   var d3 = require('d3');
   var $ = require('jquery');
   console.log('buildmap');

   var width = 960,
   height = 500;
   
   var projection = d3.geo.albersUsa()
        .translate([width/2, height/2])
        .scale([1000]);
   
   var path = d3.geo.path()
        .projection(projection);
                
   var color = d3.scale.quantize()
        .domain([0.01,.02, .04, .06, .08, .10, .25, .50, .75, 0.9])
        .range(["#C1F7DD","#B5EFCE", "#A9E8C0", "#9DE1B2", "#92DAA4", "#86D396", "#7ACB88", "#6FC47A", "#63BD6C", "#57B65E", "#4CAF50"]);

   var svg = d3.select(".map").append("svg")
        .attr("width", width)
        .attr("height", height);
        
   $.ajax({
    url: '/api/us/',
      method: 'GET'
    })
    .then(function (data) {
        
        color.domain([
                d3.min(data, function(d) { return d.number_of_projects; }),
                d3.max(data, function(d) { return d.number_of_projects; })
        ]);
        
        d3.json("/static/data/us.json", function(json) {
        //console.log(data[0].name);
        
        
        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].name;
   
            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].number_of_projects);
            
            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

            var jsonState = json.features[j].properties.name;

            if (dataState == jsonState) {

                //Copy the data value into the JSON
                json.features[j].properties.value = dataValue;

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
                    console.log(d.properties.value);
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
  }
   
   /*
   var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);
    
   var path = d3.geo.path()
        .projection(projection);
    
   d3.json('/static/data/us.json', function(error, us) {
      if (error) throw error;
    
   svg.insert("path", ".graticule")
          .datum(topojson.feature(us, us.objects.land))
          .attr("class", "land")
          .attr("d", path);
    
   svg.insert("path", ".graticule")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "state-boundary")
          .attr("d", path);
   });
    
   d3.select(self.frameElement).style("height", height + "px");
*/
