module.exports = function(domLocation, domLocation2, domLocation3) {
    var d3 = require('d3');
    var $ = require('jquery');
    var _ = require('underscore');
    
    var dataUrl = ['/api/score-trends-2009/', '/api/score-trends-2-2/', '/api/score-trends-2-1/'];
    
    var chosenColors = ['#00F8B1', '#327EFF', '#FFDB00', '#3E5A65', '#5D00A9', '#EB6C48', '#5D00A9'];
    
    var color = d3.scale.category10();
    
    
    
    var svg = d3.select(domLocation).append("svg");
    
    var svg2 = d3.select(domLocation2).append("svg");
    
    var svg3 = d3.select(domLocation3).append("svg");
        
    function removeUnderscore(y) {
                    for (var x in y) {
                        var regex = /[_\s]+/g;
                        if (x.match(regex)) {
                            y[x.replace(regex, '.')] = y[x];
                            delete y[x];
                        }
                    }
                };
                
    Array.prototype.alphanumSort = function(caseInsensitive) {
      for (var z = 0, t; t = this[z]; z++) {
        this[z] = [];
        var x = 0, y = -1, n = 0, i, j;
    
        while (i = (j = t.charAt(x++)).charCodeAt(0)) {
          var m = (i == 46 || (i >=48 && i <= 57));
          if (m !== n) {
            this[z][++y] = "";
            n = m;
          }
          this[z][y] += j;
        }
      }
    
      this.sort(function(a, b) {
        for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
          if (caseInsensitive) {
            aa = aa.toLowerCase();
            bb = bb.toLowerCase();
          }
          if (aa !== bb) {
            var c = Number(aa), d = Number(bb);
            if (c == aa && d == bb) {
              return c - d;
            } else return (aa > bb) ? 1 : -1;
          }
        }
        return a.length - b.length;
      });
    
      for (var z = 0; z < this.length; z++)
        this[z] = this[z].join("");
    }
    
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

    d3.json(dataUrl[0], function(data0) {
        d3.json(dataUrl[1], function(data1) {
            d3.json(dataUrl[2], function(data2) {

                var dataSource = data0;
                var category = 'eac';
                var dataSource2 = data0;
                var category2 = 'eac';

                d3.selectAll('.btn-sc1-version').on('click', function() {

                    setTimeout(function() {

                        dataSource = eval('data' + d3.select(".btn-sc1-version-on").node().value);
                        console.log(dataSource)
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
                
                d3.selectAll('.btn-sc2-version').on('click', function() {

                    setTimeout(function() {

                        dataSource2 = eval('data' + d3.select(".btn-sc2-version-on").node().value);
                        category2 = d3.select(".btn-sc2-category-on").node().value;
                        buildCategoryPlot(dataSource2, category2);

                    });

                });

                d3.selectAll('.btn-sc2-category').on('click', function() {

                    setTimeout(function() {

                        dataSource2 = eval('data' + d3.select(".btn-sc2-version-on").node().value);
                        category2 = d3.select(".btn-sc2-category-on").node().value;
                        buildCategoryPlot(dataSource2, category2);

                    });

                });
                
                buildOverallPlot();
                buildYearPlot(dataSource, category);
                buildCategoryPlot(dataSource2, category2);
                
                

                function buildYearPlot(data, cat) {
                    
                    svg2.selectAll('g').remove();
                    
                    console.log('building year plot')
                    
                    var margin = {
                        top: 15,
                        right: 15,
                        bottom: 23,
                        left: 30
                    },
                    width = 890 - margin.left - margin.right,
                    height = 464 - margin.top - margin.bottom;
                    
                    svg2
                    .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    
                    var y = d3.scale.linear()
                        .range([height, 0]);
                    
                    var x0 = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);
                        
                    var x1 = d3.scale.ordinal();
                    
                    var xAxis = d3.svg.axis()
                        .scale(x0)
                        .orient("bottom");
                    
                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left");
                    
                    // console.log(data);

                    // console.log(cat);
                    
                    data = data[cat];
                    
                    //console.log(data);
                    
                    var creditNames = d3.keys(data).filter(function(key) {
                        removeUnderscore(key);
                        return key;
                    });
                    
                    creditNames.alphanumSort();
                    
                    var years = d3.keys(data[creditNames[0]]).filter(function(key) {
                        //console.log(key); 
                        if (key.match(/\d{4}/)) {
                            return key;    
                        }
                    });
                    
                    //console.log(years); 
                   
                    //console.log(creditNames);
                    
                    var allValues = [];
                    
                    var objArr = [];
                    
                    //console.log(data);
                    
                    _.keys(data).forEach(function(d, index) {
                        //console.log(data[d]);
                        data[d].credit = d;
                        objArr.push(data[d]);
                        years.forEach(function(year) {
                           //console.log(year);
                           //console.log(data[d][year]);
                           allValues.push(data[d][year]);
                            
                        });
                        
                    });
                    
                    objArr.forEach(function(d) {
                      d.years = years.map(function(year) { return {year: year, value: +d[year]}; });
                    });
                    
                    console.log(data);
                    
                    // console.log(data);
                    console.log(objArr);
                    // console.log(allValues);
                    
                    x0.domain(creditNames.map(function(d) {
                        //console.log(d);
                        return d;
                    }));
                    
                    x1.domain(years).rangeRoundBands([0, x0.rangeBand()]);
                    
                    console.log(x1.domain());
                    
                    y.domain([0, d3.max(allValues, function(d) {
                        return d;
                    })]);
                    
                    svg2.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                    
                    svg2.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Average");
                    
                    //console.log(data);
                    
                    var year = svg2.selectAll(".year")
                        .data(objArr)
                        .enter().append("g")
                        .attr("class", "g")
                        .attr("transform", function(d) {
                            return "translate(" + x0(d.credit) + ",0)";
                        });
                    
                    year.selectAll("rect")
                        .data(function(d) { return d.years; })
                        .enter().append("rect") 
                        .attr("width", x1.rangeBand())
                        .attr("x", function(d) { 
                            
                            return x1(d.year); 
                            })
                        .attr("y", function(d) { return y(d.value); })
                        .attr("height", function(d) { return height - y(d.value); })
                        .style("fill", function(d) { return color(d.year); }); 
                          
                    var legend2 = svg2.selectAll(".legend2")
                        .data(years.slice().reverse())
                        .enter().append("g")
                        .attr("class", "legend2")
                        .attr("transform", function(d, i) {
                            return "translate(0," + i * 20 + ")";
                        });
                    
                    legend2.append("rect")
                        .attr("x", width - 18)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                    legend2.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "end")
                        .text(function(d) {
                            return d;
                        });
                };
                
                function buildCategoryPlot(data, cat) {
                    
                    svg3.selectAll('g').remove();
                    
                    console.log('building category plot');
                    
                    var margin = {
                        top: 15,
                        right: 15,
                        bottom: 23,
                        left: 30
                    },
                    width = 890 - margin.left - margin.right,
                    height = 464 - margin.top - margin.bottom;
                    
                    svg3
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    
                    var y = d3.scale.linear()
                        .range([height, 0]);
                    
                    var x0 = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);
                        
                    var x1 = d3.scale.ordinal();
                    
                    var xAxis = d3.svg.axis()
                        .scale(x0)
                        .orient("bottom");
                    
                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left");
                    
                    // console.log(data);

                    // console.log(cat);
                    
                    data = data[cat];
                    
                    //console.log(data);
                    
                    var creditNames = d3.keys(data).filter(function(key) {
                        removeUnderscore(key);
                        return key;
                    });
                    
                    creditNames.alphanumSort();
                    
                    //console.log(creditNames);
                    
                    var categories = d3.keys(data[creditNames[0]]).filter(function(key) {
                        //console.log(key); 
                        if (!key.match(/\d{4}/)) {
                            return key;    
                        }
                    });
                    
                    //console.log(categories);
                    
                    var allValues = [];
                    var objArr = [];
                    
                    //console.log(data);
                    
                    _.keys(data).forEach(function(d, index) {
                        //console.log(data[d]);
                        data[d].credit = d;
                        objArr.push(data[d]);
                        categories.forEach(function(category) {
                           //console.log(year);
                           //console.log(data[d][year]);
                           allValues.push(data[d][category]);
                            
                        });
                        
                    });
                    
                    objArr.forEach(function(d) {
                      d.categories = categories.map(function(category) { return {category: category, value: +d[category]}; });
                    });
                    
                    console.log(allValues);
                    
                    x0.domain(creditNames.map(function(d) {
                        //console.log(d);
                        return d;
                    }));
                    
                    x1.domain(categories).rangeRoundBands([0, x0.rangeBand()]);
                    
                    
                    y.domain([0, d3.max(allValues, function(d) {
                        return d;
                    })]);
                    
                    svg3.selectAll('.x').remove();
                    
                    svg3.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                    
                    svg3.selectAll('.y').remove();
                    
                    svg3.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Average");
                    
                    var category = svg3.selectAll(".category")
                        .data(objArr)
                        .enter().append("g")
                        .attr("class", "g")
                        .attr("transform", function(d) {
                            return "translate(" + x0(d.credit) + ",0)";
                        });
                    
                    category.selectAll("rect")
                        .data(function(d) { return d.categories; })
                        .enter().append("rect") 
                        .attr("width", x1.rangeBand())
                        .attr("x", function(d) { 
                            
                            return x1(d.category); 
                            })
                        .attr("y", function(d) { return y(d.value); })
                        .attr("height", function(d) { return height - y(d.value); })
                        .style("fill", function(d) { return color(d.category); }); 
                    
                    var legend3 = svg3.selectAll(".legend")
                        .data(categories.slice().reverse())
                        .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) {
                            return "translate(0," + i * 20 + ")";
                        });

                    legend3.append("rect")
                        .attr("x", width - 18)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                    legend3.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "end")
                        .text(function(d) {
                            return d;
                        });
                };

                function buildOverallPlot() {
                    
                    console.log('making overall score bar chart');
                    
                    var margin = {
                        top: 0,
                        right: 30,
                        bottom: 50,
                        left: 30
                    },
                    width = 824 - margin.left - margin.right,
                    height = 430 - margin.top - margin.bottom,
                    endPoint2009 = "average_normal_scores_2009",
                    endPoint22 = "average_normal_scores_v2_2",
                    endPoint21 = "average_normal_scores_v2_1";
                    
                    svg
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
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
                    
                    //console.log('getting data');

                    // console.log(data1);
                    // console.log(data2);

                    //console.log(endPoint[3]);

                    var data = data0[endPoint2009];

                    console.log(data);

                    removeUnderscore(data);

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
                        .attr("x", width + 14)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                    legend.append("text")
                        .attr("x", width + 7)
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