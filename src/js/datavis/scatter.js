module.exports =  function (domLocation) {
  var d3 = require('d3');
  var $ = require('jquery');

  var w = 960,
    h = 500,
    pad = 20,
    left_pad = 100,
    Data_url = '/api/projects/2009/';
  
  var parseDate = d3.time.format("%Y-%m-%d").parse;
  
  var svg = d3.select(domLocation)
          .append("svg")
          .attr("width", w)
          .attr("height", h);
   
  var x = d3.scale.linear().range([left_pad, w-pad]),
      y = d3.scale.linear().range([pad, h-pad*2]);
   
  var xAxis = d3.svg.axis().scale(x).orient("bottom"),
      yAxis = d3.svg.axis().scale(y).orient("left");
   
  d3.json(Data_url, function (data) {
      //console.log(data.results);
      
      var dataSet = data.results;
      
      //console.log(dataSet);
      
      svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, "+(h-pad)+")")
      .call(xAxis);
   
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+(left_pad-pad)+", 0)")
        .call(yAxis);
      
      /*
      var max_r = d3.max(data.results.map(
                         function (d) { return d[2]; })),
          r = d3.scale.linear()
              .domain([0, d3.max(data, function (d) { return d[2]; })])
              .range([0, 12]);
      */
      
      
      dataSet.forEach(function(d) {
        console.log(d);
        return d.certification_date = parseDate(d.certification_date);
      });
      
      dataSet.forEach(function(d) {
        console.log(d);
      });
      
      x.domain(d3.extent(dataSet, function (d) { 
          return d.certification_date; }));
      
      svg.selectAll("circle")
          .data(dataSet)
          .enter()
          .append("circle")
          .attr("class", "circle")
          .attr("cx", function (d) {
             var output = d.certification_date;
             console.log(output);
             return x(output); })
          /*
          .attr("cy", function (d) { 
            //console.log(d);
            return y(d['points_achieved']); })
          .transition()
          .duration(800)
          .attr("r", function (d) { 
            //console.log(d);
            return r(d['gross_square_foot']); });
            
          */
  });

}

