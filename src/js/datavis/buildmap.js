module.exports = function(descriptor, gradient) {
    var d3 = require('d3');
    var $ = require('jquery');
    var gradients = require('../datavis/gradients');
    console.log('building a map');

    var width = 960,
        height = 500;

    var legendDomain = [0.0, 0.01, .02, .04, .06, .08, .10, .25, .50, .75, 0.9];

    var colorDomain = [0.01, .02, .04, .06, .08, .10, .25, .50, .75, 0.9];

    var projection = d3.geo.albersUsa()
        .translate([width / 2, height / 2])
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

    var ls_w = 20,
        ls_h = 20;


    d3.json("/api/us", function(data) {
        //console.log(d3.max(data, function(d) { return d.number_of_projects; }));

        d3.json("/static/data/us.json", function(json) {

            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                //Grab state name
                var dataState = data[i].name;
                //console.log(dataState);
                //Grab data value, and convert from string to float
                var dataValue = parseFloat(data[i][descriptor]);
                //console.log(dataValue);
                //Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++) {

                    var jsonState = json.features[j].properties.name;
                    //console.log(json.features[j].properties.name);
                    if (dataState == jsonState) {
                        //console.log(dataState == jsonState);
                        //Copy the data value into the JSON
                        json.features[j].properties.value = dataValue / d3.max(data, function(d) {
                            //console.log(d);
                            return d[descriptor];
                        });

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
                .attr("y", function(d, i) {
                    return height - (i * ls_h) - 2 * ls_h;
                })
                .attr("width", ls_w)
                .attr("height", ls_h)
                .style("fill", function(d, i) {
                    return color(d);
                })
                .style("opacity", 0.8);

            var dF = d3.max(data, function(d) {
                //console.log(d);
                return d[descriptor];
            });

            //console.log(dF);

            var legendTextLabels = ['< ' + Math.floor(0.01 * dF), Math.floor(0.01 * dF) + '+', Math.floor(.02 * dF) + '+',
                Math.floor(.04 * dF) + '+', Math.floor(.06 * dF) + '+', Math.floor(.08 * dF) + '+', Math.floor(.10 * dF) + '+', Math.floor(.25 * dF) + '+', Math.floor(.50 * dF) + '+',
                Math.floor(.75 * dF) + '+', Math.floor(0.9 * dF) + '+'
            ];

            legend.append("text")
                .attr("x", 50)
                .attr("y", function(d, i) {
                    return height - (i * ls_h) - ls_h - 4;
                })
                .text(function(d, i) {
                    return legendTextLabels[i];
                });

            d3.selectAll('.btn-map').on('click', function() {
                //alert('yay');
                //  console.log(d3.select(".on").node().value); 
                setTimeout(function() {
                    color = d3.scale.threshold()
                        .domain([0.01, .02, .04, .06, .08, .10, .25, .50, .75, 0.9])
                        .range(gradients[d3.select(".btn-map-on").node().value]);

                    dF = d3.max(data, function(d) {
                        //console.log(d);
                        return d[d3.select(".btn-map-on").node().value];
                    });

                    //console.log(dF);

                    legendTextLabels = ['< ' + Math.floor(0.01 * dF), Math.floor(0.01 * dF) + '+', Math.floor(.02 * dF) + '+',
                        Math.floor(.04 * dF) + '+', Math.floor(.06 * dF) + '+', Math.floor(.08 * dF) + '+', Math.floor(.10 * dF) + '+', Math.floor(.25 * dF) + '+', Math.floor(.50 * dF) + '+',
                        Math.floor(.75 * dF) + '+', Math.floor(0.9 * dF) + '+'
                    ];

                    //console.log(legendTextLabels); 

                    legend.select('rect').transition().style("fill", function(d, i) {
                        return color(d);
                    });


                    legend.select('text').transition().text(function(d, i) {
                        return legendTextLabels[i];
                    });


                    for (var i = 0; i < data.length; i++) {
                        //Grab state name
                        //console.log(data);
                        var dataState = data[i].name;
                        //console.log(data[i][d3.select('#dropdown').node().val]);
                        //Grab data value, and convert from string to float
                        var dataValue = parseFloat(data[i][d3.select('.btn-map-on').node().value]);

                        //Find the corresponding state inside the GeoJSON
                        for (var j = 0; j < json.features.length; j++) {

                            var jsonState = json.features[j].properties.name;

                            if (dataState == jsonState) {

                                //Copy the data value into the JSON
                                json.features[j].properties.value = dataValue / d3.max(data, function(d) {
                                    return d[d3.select('.btn-map-on').node().value];
                                });

                                //Stop looking through the JSON
                                break;

                            }
                        }

                    }

                    svg.selectAll("path")
                        .data(json.features)

                    .attr("d", path)
                        .transition()
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

    });
}