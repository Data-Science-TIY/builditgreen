module.exports = function(domLocation) {
    var d3 = require('d3');
    var $ = require('jquery');
    var _ = require('underscore');

    console.log('making overall score bar chart');

    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        dataUrl = ['/api/score-trends-2009/', '/api/score-trends-2-2/', '/api/score-trends-2-1/'],
        endPoint2009 = "average_normal_scores_2009",
        endPoint22 = "average_normal_scores_v2_2",
        endPoint21 = "average_normal_scores_v2_1";

    var color = d3.scale.ordinal().range(['#327EFF', '#FFDB00', '#3E5A65', '#00F8B1', '#FF3C41', '#00943E', '#5D00A9']);

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(domLocation).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    function removeUnderscore(y) {
                    for (var x in y) {
                        var regex = /[_\s]+/g;
                        if (x.match(regex)) {
                            y[x.replace(regex, '.')] = y[x];
                            delete y[x];
                        }
                    }
                };

    d3.json(dataUrl[0], function(data0) {
        d3.json(dataUrl[1], function(data1) {
            d3.json(dataUrl[2], function(data2) {

                var dataSource = data0;
                var category = 'ea';

                d3.selectAll('.btn-sc1-version').on('click', function() {

                    setTimeout(function() {

                        dataSource = eval('data' + d3.select(".btn-sc1-version-on").node().value);
                        category = d3.select(".btn-sc1-category-on").node().value;
                        buildYearPlot(dataSource, category);

                    });

                });

                d3.selectAll('.btn-sc1-category').on('click', function() {

                    setTimeout(function() {

                        dataSource = eval('data' + d3.select(".btn-sc1-version-on").node().value);
                        category = d3.select(".btn-sc1-category-on").node().value;
                        buildYearPlot(dataSource, category);

                    });

                });

                buildYearPlot(dataSource, category);
                //buildOverallPlot();

                function buildYearPlot(data, cat) {
                    
                    var x0 = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);
                        
                    var x1 = d3.scale.ordinal();

                    console.log(data);

                    console.log(cat);
                    
                    data = data.cat;

                    var creditNames = d3.keys(data).filter(function(key) {
                        return removeUnderscore(key);
                    });

                    data.forEach(function(d) {
                        d.credits = creditNames.map(function(name) {
                            return {
                                credit: name,
                                value: +d[name]
                            };
                        });
                    });

                    x0.domain(data.map(function(d) {
                        return d.State;
                    }));
                    
                    x1.domain(creditNames).rangeRoundBands([0, x0.rangeBand()]);
                    
                    y.domain([0, d3.max(data, function(d) {
                        return d3.max(d.ages, function(d) {
                            return d.value;
                        });
                    })]);

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
                        .style("text-anchor", "end")
                        .text("Average");

                    var state = svg.selectAll(".state")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "g")
                        .attr("transform", function(d) {
                            return "translate(" + x0(d.year) + ",0)";
                        });

                    state.selectAll("rect")
                        .data(function(d) {
                            return d.ages;
                        })
                        .enter().append("rect")
                        .attr("width", x1.rangeBand())
                        .attr("x", function(d) {
                            return x1(d.name);
                        })
                        .attr("y", function(d) {
                            return y(d.value);
                        })
                        .attr("height", function(d) {
                            return height - y(d.value);
                        })
                        .style("fill", function(d) {
                            return color(d.name);
                        });

                    var legend = svg.selectAll(".legend")
                        .data(ageNames.slice().reverse())
                        .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) {
                            return "translate(0," + i * 20 + ")";
                        });

                    legend.append("rect")
                        .attr("x", width - 18)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                    legend.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "end")
                        .text(function(d) {
                            return d;
                        });

                };

                function buildOverallPlot() {
                    //console.log('getting data');

                    // console.log(data1);
                    // console.log(data2);

                    //console.log(endPoint[3]);

                    var data = data0[endPoint2009];

                    console.log(data);

                    removeUnderscore(data);

                    function sortObject(o) {
                        var sorted = {},
                            key, a = [];

                        for (key in o) {
                            if (o.hasOwnProperty(key)) {
                                a.push(key);
                            }
                        }

                        a.sort();

                        for (key = 0; key < a.length; key++) {
                            sorted[a[key]] = o[a[key]];
                        }
                        return sorted;
                    }

                    data = sortObject(data);

                    console.log(data);


                    //console.log(data);

                    x.domain(_.keys(data).map(function(d) {
                        //console.log(d);
                        return d;
                    }));

                    y.domain([0, d3.max(_.values(data), function(d) {
                        return d;
                    })]);

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis)
                        .selectAll("text")
                        .attr("y", 0)
                        .attr("x", -10)
                        .attr("transform", "rotate(315)")
                        .style("text-anchor", "end");


                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Average");

                    //console.log(_.keys(data));

                    svg.selectAll(".bar")
                        .data(_.keys(data))
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) {
                            return x(d);
                        })
                        .attr("width", x.rangeBand())
                        .style("fill", function(d) {

                            if (d.match(/ea/)) {
                                return color('ea');
                            } else if (d.match(/eq/)) {
                                return color('eq');
                            } else if (d.match(/extr/)) {
                                return color('extr');
                            } else if (d.match(/id/)) {
                                return color('id');
                            } else if (d.match(/mr/)) {
                                return color('mr');
                            } else if (d.match(/ss/)) {
                                return color('ss');
                            } else if (d.match(/we/)) {
                                return color('we');
                            }
                        });

                    svg.selectAll("rect")
                        .data(_.values(data))
                        .attr("y", function(d) {
                            return y(d);
                        })
                        .attr("height", function(d) {
                            return height - y(d);
                        });

                    var legend = svg.selectAll(".legend")
                        .data(color.domain())
                        .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) {
                            return "translate(0," + i * 20 + ")";
                        });

                    legend.append("rect")
                        .attr("x", width - 18)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                    legend.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "end")
                        .text(function(d) {
                            return d;
                        });

                    d3.selectAll('.btn-overall').on('click', function() {
                        setTimeout(function() {

                            function addUnderscore(y) {
                                for (var x in y) {
                                    var regex = /[.\s]+/g;
                                    if (x.match(regex)) {
                                        y[x.replace(regex, '_')] = y[x];
                                        delete y[x];
                                    }
                                }
                            }

                            //console.log(eval('data'+d3.select(".btn-overall-on").node().value));

                            var data = eval('data' + d3.select(".btn-overall-on").node().value);

                            //console.log(data);   

                            addUnderscore(data);

                            //console.log(data);

                            if (data === data0) {
                                data = data[endPoint2009];
                            } else if (data === data1) {
                                data = data[endPoint22];
                            } else if (data === data2) {
                                data = data[endPoint21];
                            }


                            //console.log(data);    

                            //console.log(data);

                            removeUnderscore(data);

                            function sortObject(o) {
                                var sorted = {},
                                    key, a = [];

                                for (key in o) {
                                    if (o.hasOwnProperty(key)) {
                                        a.push(key);
                                    }
                                }

                                a.sort();

                                for (key = 0; key < a.length; key++) {
                                    sorted[a[key]] = o[a[key]];
                                }
                                return sorted;
                            }

                            data = sortObject(data);

                            function update(data) {

                                svg.selectAll('.x').remove();

                                x.domain(_.keys(data).map(function(d) {
                                    //console.log(d);
                                    return d;
                                }));

                                // y.domain([0, d3.max(_.values(data), function(d) { return d; })]);

                                svg.append("g")
                                    .attr("class", "x axis")
                                    .attr("transform", "translate(0," + height + ")")
                                    .call(xAxis)
                                    .selectAll("text")
                                    .attr("y", 0)
                                    .attr("x", -10)
                                    .attr("transform", "rotate(315)")
                                    .style("text-anchor", "end");

                                svg.selectAll(".bar").remove();

                                svg.selectAll(".bar")
                                    .data(_.keys(data))
                                    .enter().append("rect")
                                    .attr("class", "bar")
                                    .attr("x", function(d) {
                                        return x(d);
                                    })
                                    .attr("width", x.rangeBand())
                                    .style("fill", function(d) {

                                        if (d.match(/ea/)) {
                                            return color('ea');
                                        } else if (d.match(/eq/)) {
                                            return color('eq');
                                        } else if (d.match(/extr/)) {
                                            return color('extr');
                                        } else if (d.match(/id/)) {
                                            return color('id');
                                        } else if (d.match(/mr/)) {
                                            return color('mr');
                                        } else if (d.match(/ss/)) {
                                            return color('ss');
                                        } else if (d.match(/we/)) {
                                            return color('we');
                                        }
                                    });

                                svg.selectAll('.bar')
                                    .data(_.values(data))
                                    .transition().duration(1000)
                                    .attr("y", function(d) {
                                        return y(d);
                                    })
                                    .attr("height", function(d) {
                                        return height - y(d);
                                    });

                            }

                            update(data);

                        });
                    });
                }
            });
        });
    });

    function type(d) {
        d.frequency = +d.frequency;
        return d;
    }

}