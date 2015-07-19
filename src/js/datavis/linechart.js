module.exports = function(domLocation) {
    var d3 = require('d3');
    var _ = require('underscore');
    var $ = require('jquery');

    console.log('making line chart');
        
    var margin = {
        top: 0,
        right: 80,
        bottom: 0,
        left: 50
    },
    width = 890 - margin.left - margin.right,
    height = 464 - margin.top - margin.bottom;

    var certLevels = ['platinum_certifications', 'gold_certifications', 'silver_certifications', 'certified_only_certifications'];
    var buildType = ['leed_for_multi_low_family_certifications', 'leed_for_multi_mid_family_certifications',
        'leed_for_single_family_certifications'
    ];
    var regVsCert = ['total_certifications', 'total_registrations'];
    var newConst = ['leed_nc_2_1_certifications', 'leed_nc_2_0_certifications', 'leed_nc_2_2_certifications',
        'leed_nc_2009_certifications'
    ];

    var color = d3.scale.ordinal().range(['#327EFF', '#FFDB00', '#3E5A65', '#00F8B1', '#FF3C41']);

    var svg = d3.select(domLocation).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr('class', 'linechart')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var yAxis = d3.svg.axis().scale(y).orient("left");

    var xAxis = d3.svg.axis().scale(x).orient("bottom")
        .ticks(14)
        .tickFormat(d3.format("04d"));

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) {
            //console.log(x);
            return x(d.date);
        })
        .y(function(d) {
            //console.log(y);
            return y(d.certifications);
        });


    d3.json("/api/trends/", function(error, data) {
        if (error) throw error;

        //console.log(data);

        var dateDomain = _.keys(_.pick(data, 'platinum_certifications').platinum_certifications);

        //console.log(dateDomain);

        //console.log(d3.select(".btn-trend1-on").node().value);

        var trendValues = _.pick(data, eval(d3.select(".btn-trend1-on").node().value));

        //console.log(trendValues);

        color.domain(_.keys(_.pick(data, eval(d3.select(".btn-trend1-on").node().value))));

        //console.log(d3.select(".btn-trend1-on").node().value);

        //console.log(_.pick(data, 'platinum_certifications', 'gold_certifications'));

        var trends = color.domain().map(function(name, index) {
            //console.log(trendValues);
            //console.log(name);
            //console.log(trendValues[(color.domain()[index])]);
            return {
                name: name,
                values: $.map(trendValues[(color.domain()[index])], function(d, index) {
                    //console.log(d + ' ' + index);
                    return {
                        date: index,
                        certifications: d
                    };
                })
            };
        });

        //console.log(trends);

        x.domain(d3.extent(dateDomain, function(d) {
            return d;
        }));

        y.domain([
            d3.min(trends, function(c) {
                return d3.min(c.values, function(v) {
                    return v.certifications;
                });
            }),
            d3.max(trends, function(c) {
                return d3.max(c.values, function(v) {
                    return v.certifications;
                });
            })
        ]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", 415)
            .attr("y", 45)
            .style("text-anchor", "middle")
            .text("Year");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Total Certifications");

        var trend = svg.selectAll(".trend")
            .data(trends)
            .enter().append("g")
            .attr("class", "trend");

        //console.log(trend);

        trend.append("path")
            .attr("class", "line")
            .attr("d", function(d) {
                //console.log(d);
                return line(d.values);
            })
            .style("stroke", function(d) {
                //console.log(d.name);
                return color(d.name);
            });

        trend.append("text")
            .datum(function(d) {
                return {
                    name: d.name,
                    values: d.values[d.values.length - 1]
                };
            })
            .attr("transform", function(d) {
                //console.log(d);
                return "translate(" + x(d.values.date) + "," + y(d.values.certifications) + ")";
            })
            .attr("x", 3)
            .attr('class', function(d) {
                return d.name
            })
            .attr("dy", ".35em")
            .text(function(d) {
                var label = (d.name).match(/^[^_]+(?=_)/);
                return label;
            });

        d3.select('.certified_only_certifications')
            .attr('dy', '0.9em');

        d3.select('.silver_certifications')
            .attr('dy', '-.1em');


        d3.selectAll('.btn-trend1').on('click', function() {
            setTimeout(function() {
                //console.log(d3.select(".btn-trend1-on").node().value);
                /*
                 svg = d3.select(domLocation)
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                */
                trendValues = _.pick(data, eval(d3.select(".btn-trend1-on").node().value));

                color.domain(_.keys(_.pick(data, eval(d3.select(".btn-trend1-on").node().value))));

                trends = color.domain().map(function(name, index) {
                    //console.log(trendValues);
                    //console.log(name);
                    //console.log(trendValues[(color.domain()[index])]);
                    return {
                        name: name,
                        values: $.map(trendValues[(color.domain()[index])], function(d, index) {
                            //console.log(d + ' ' + index);
                            return {
                                date: index,
                                certifications: d
                            };
                        })
                    };
                });



                y.domain([
                    d3.min(trends, function(c) {
                        return d3.min(c.values, function(v) {
                            return v.certifications;
                        });
                    }),
                    d3.max(trends, function(c) {
                        return d3.max(c.values, function(v) {
                            return v.certifications;
                        });
                    })
                ]);

                svg.select('.y').remove();

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Total Certifications");

                svg.selectAll('.trend').remove();

                trend = svg.selectAll(".trend")
                    .data(trends)
                    .enter().append("g")
                    .attr("class", "trend");

                //console.log(trend);

                trend.append("path")
                    .attr("class", "line")
                    .attr("d", function(d) {
                        //console.log(d);
                        return line(d.values);
                    })
                    .style("stroke", function(d) {
                        return color(d.name);
                    });

                trend.append("text")
                    .datum(function(d) {
                        return {
                            name: d.name,
                            values: d.values[d.values.length - 1]
                        };
                    })
                    .attr("transform", function(d) {
                        //console.log(d);
                        return "translate(" + x(d.values.date) + "," + y(d.values.certifications) + ")";
                    })
                    .attr("x", 3)
                    .attr('class', function(d) {
                        return d.name
                    })
                    .attr("dy", ".35em")
                    .text(function(d) {
                        var label = (d.name).match(/^[^_]+(?=_)/);

                        if (label == 'leed') {
                            if (d.name == 'leed_for_single_family_certifications') {
                                label = 'Single';
                            } else if (d.name == 'leed_for_multi_low_family_certifications') {
                                label = 'Multi-Low';
                            } else if (d.name == 'leed_for_multi_mid_family_certifications') {
                                label = 'Multi-Mid';
                            } else if (d.name == 'leed_nc_2_1_certifications') {
                                label = 'NC-2.1';
                            } else if (d.name == 'leed_nc_2_0_certifications') {
                                label = 'NC-2.0';
                            } else if (d.name == 'leed_nc_2_2_certifications') {
                                label = 'NC-2.2';
                            } else if (d.name == 'leed_nc_2009_certifications') {
                                label = 'NC-2009';
                            }
                        }

                        if (label == 'total') {
                            if (d.name == 'total_registrations') {
                                label = 'Registered';
                            } else if (d.name == 'total_certifications') {
                                label = 'Certified';
                            }
                        }

                        return label;
                    });

                d3.select('.certified_only_certifications')
                    .attr('dy', '0.9em');

                d3.select('.silver_certifications')
                    .attr('dy', '-.1em');

                d3.select('.leed_nc_2_0_certifications')
                    .attr('dy', '.55em');

                d3.select('.leed_nc_2_1_certifications')
                    .attr('dy', '-.1em');
            });
        });
    });

}