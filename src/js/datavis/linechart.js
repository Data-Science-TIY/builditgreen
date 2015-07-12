module.exports =  function (domLocation) {
  var d3 = require('d3');
  var _ = require('underscore');
  var $ = require('jquery');

console.log('making line chart');
    
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var certLevels = ['platinum_certifications', 'gold_certifications', 'silver_certifications', 'certified_only_certifications'];
    var regVsCert = ['leed_for_multi_low_family_registrations', 'leed_nc_2_1_certifications', 'leed_nc_2009_certifications',
       'leed_for_multi_low_family_certifications', 'leed_for_multi_mid_family_certifications', 'leed_nc_2_2_certifications', 
       'leed_for_single_family_certifications', 'leed_nc_2_0_certifications', 'leed_for_single_family_registrations'];
    var buildType = ['total_certifications', 'total_registrations'];
    
    var color = d3.scale.category10();
    
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

    var xAxis = d3.svg.axis().scale(x).orient("bottom")
      .ticks(14)
      .tickFormat(d3.format("04d"));    
    
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { 
          //console.log(x);
          return x(d.date); })
        .y(function(d) { 
          //console.log(y);
          return y(d.certifications); });  
    
       
	d3.json("/api/trends/", function(error, data) {
	  if (error) throw error;
    
    //console.log(data);
    
    var dateDomain = _.keys(_.pick(data, 'platinum_certifications').platinum_certifications);
    
    //console.log(dateDomain);
    
    console.log(d3.select(".btn-trend1-on").node().value);
    
    var trendValues = _.pick(data, eval(d3.select(".btn-trend1-on").node().value));
    
    //console.log(trendValues);
    
    color.domain(_.keys(_.pick(data, eval(d3.select(".btn-trend1-on").node().value))));
   
   console.log(d3.select(".btn-trend1-on").node().value);
   
    //console.log(_.pick(data, 'platinum_certifications', 'gold_certifications'));
   
    var trends = color.domain().map(function(name, index) {
      //console.log(trendValues);
      //console.log(name);
      //console.log(trendValues[(color.domain()[index])]);
      return {
        name: name,
        values: $.map(trendValues[(color.domain()[index])] , function(d, index) {
          //console.log(d + ' ' + index);
          return {date: index, certifications: d};
        })
      };
    });

    //console.log(trends);

    x.domain(d3.extent(dateDomain, function(d) { return d; }));
    
    y.domain([
      d3.min(trends, function(c) { return d3.min(c.values, function(v) { return v.certifications; }); }),
      d3.max(trends, function(c) { return d3.max(c.values, function(v) { return v.certifications; }); })
    ]);
    
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
        return line(d.values); });
        
     d3.selectAll('.btn-trend1').on('click', function () {
       setTimeout( function() {
       console.log(d3.select(".btn-trend1-on").node().value);
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
            values: $.map(trendValues[(color.domain()[index])] , function(d, index) {
              //console.log(d + ' ' + index);
              return {date: index, certifications: d};
            })
          };
        });
        
        y.domain([
          d3.min(trends, function(c) { return d3.min(c.values, function(v) { return v.certifications; }); }),
          d3.max(trends, function(c) { return d3.max(c.values, function(v) { return v.certifications; }); })
        ]);
        
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
            .text("Total Certifications");
        
        trend = svg.selectAll(".trend")
          .data(trends)
        .enter().append("g")
          .attr("class", "trend");
          
        //console.log(trend);
        
        trend.append("path")
          .attr("class", "line")
          .attr("d", function(d) { 
            //console.log(d);
            return line(d.values); });
        
       });
        
     });
  });

} 
  
   