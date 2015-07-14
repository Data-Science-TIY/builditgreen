module.exports =  function (domLocation) {
  var d3 = require('d3');
  var $ = require('jquery');
  
  var margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      dataUrl = ['/api/projects/2009/','/api/projects/2-2/','/api/projects/2-1/'];

  
  var parseDate = d3.time.format("%Y-%m-%d").parse;
  
  var color = d3.scale.ordinal()
              .range(['#00F8B1', '#327EFF', '#3E5A65', '#FFDB00']);
   
  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);
   
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
  var svg = d3.select(domLocation).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  d3.json(dataUrl[0], function (data0) {
    d3.json(dataUrl[1], function(data1) {
      d3.json(dataUrl[2], function(data2) {
      //console.log(data);
      
      var data = data0;
      //console.log(data);
      
      var maxR = d3.max(data, function(d) { 
                    //console.log(d);
                    return d.gross_square_foot;
                    });
                    
      //console.log(maxR);
      
      data.forEach(function(d, index) {
        if (d.certification_level=='Denied') {
          data.splice(index,1);
        };
        //console.log(d);
        return d.certification_date = parseDate(d.certification_date);
      });
      
      x.domain(d3.extent(data, function (d) { 
          return d.certification_date; }));
      
      y.domain(d3.extent(data, function (d) { 
          return d.points_achieved; }));
      
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("x", 415)
          .attr("y", 45)
          .style("text-anchor", "middle")
          .text("Time");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Points Achieved");
      
      var circles = svg.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "circle")
          .attr("id", function (d) { return d.certification_level })
          .attr("cx", function (d) {
             var output = d.certification_date;
             //console.log(output);
             return x(output); })
          .attr("cy", function (d) { 
            //console.log(d['points_achieved']);
            return y(d['points_achieved']); })
          .attr("r", function (d) { 
            //console.log(d);
            return (((d.gross_square_foot/maxR)+0.15)*10); })
          .style("fill", function(d) { return color(d.certification_level); })
          .style("opacity", 1);
       
       
       
       var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color)
          .on("click", function (d) {
          circles.filter(function () {
               //console.log(d);
               //console.log(this.id);
               return this.id===d;
             })
             .transition().duration(750)
             .style("opacity", function () {
                //console.log(this.style.opacity);
                return (parseInt(this.style.opacity)) ? 0 : 1;
             });

          });

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
     
     d3.selectAll('.btn-trend2').on('click', function () {
       setTimeout(function () {
         
       //console.log(d3.select(".btn-trend2-on").node().value);
     
       data = eval('data'+d3.select(".btn-trend2-on").node().value);
      
       maxR = d3.max(data, function(d) { 
                      //console.log(d);
                      return d.gross_square_foot;
                      });
                      
        //console.log(maxR);
        
        data.forEach(function(d, index) {
          if (d.certification_level=='Denied') {
            data.splice(index,1);
          };
          //console.log(d);
          //console.log(d.certification_date.length)
          if (d.certification_date.length<=10) {
          return d.certification_date = parseDate(d.certification_date);
          }
        });
        
        x.domain(d3.extent(data, function (d) { 
            return d.certification_date; }));
        
        y.domain(d3.extent(data, function (d) { 
            return d.points_achieved; }));
        
        svg.selectAll('.x').remove();
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("x", 415)
            .attr("y", 45)
            .style("text-anchor", "middle")
            .text("Time");
        
        svg.selectAll('.y').remove();
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Points Achieved");
        
        svg.selectAll('.circle').remove();
        
        circles = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "circle")
            .attr("id", function (d) { return d.certification_level })
            .attr("cx", function (d) {
               var output = d.certification_date;
               //console.log(output);
               return x(output); })
            .attr("cy", function (d) { 
              //console.log(d['points_achieved']);
              return y(d['points_achieved']); })
            .attr("r", function (d) { 
              //console.log(d);
              return (((d.gross_square_foot/maxR)+0.15)*10); })
            .style("fill", function(d) { return color(d.certification_level); })
            .style("opacity", 1);
         
         svg.selectAll('.legend').remove();
         
         legend = svg.selectAll(".legend")
            .data(color.domain())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { 
              console.log(color.domain());
              return "translate(0," + i * 20 + ")"; });
  
         legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color)
            .on("click", function (d) {
            circles.filter(function () {
                 //console.log(d);
                 //console.log(this.id);
                 return this.id===d;
               })
               .transition().duration(750)
               .style("opacity", function () {
                  //console.log(this.style.opacity);
                  return (parseInt(this.style.opacity)) ? 0 : 1;
               });
  
            });
  
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { 
              console.log(d);
              return d; });
  

       });
     });
      });
    });
         
  });

}

