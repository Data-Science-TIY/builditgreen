module.exports =  function (domLocation) {
  var d3 = require('d3');
  var $ = require('jquery');
  
    console.log('making histogram');
    
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    dataUrl = ['/api/projects/2009/','/api/projects/2-2/','/api/projects/2-1/'];

    var color = d3.scale.ordinal().range(['#00F8B1', '#3E5A65', '#FFDB00', '#327EFF']);

    var x = d3.scale.linear()
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
    
    d3.json(dataUrl[0], function(data0) {
      d3.json(dataUrl[1], function(data1) {
        d3.json(dataUrl[2], function(data2) {
      
      var data = data0;
      
      data.forEach(function(d, index) {
        if (d.certification_level=='Denied') {
          data.splice(index,1);
        };
        //console.log(d);
      });
      
      //console.log(data);
      
      var dataSet = data;
         
      //console.log(data);   
      
      x.domain(d3.extent(dataSet, function (d) { 
          return d.points_achieved; }));
      
      var bins = [];
      for (var i = x.domain()[0]; i <= x.domain()[1]; i++) {
          bins.push(i);
      }
      
      //console.log(bins);
      
      var values = dataSet.map(function (d) {
        return d.points_achieved;
      });
      
      var histo = d3.layout.histogram()
          .bins(x.ticks(bins.length))
          (values);
          
      //console.log(values);
      
      y.domain(d3.extent(histo, function (d) {
        //console.log(d.length);
        return d.length;
      }));
      
      var bar = svg.selectAll(".bar")
          .data(histo)
        .enter().append("g")
          .attr("class", "bar")
          .attr("transform", function(d) { 
            //console.log(d);
            return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

      bar.append("rect")
          .attr("x", 1)
          .attr('class', 'rect')
          .attr("height", function(d) { 
            //console.log(d);
            return height - y(d.y); })
          .attr("width", function(d) { 
            //console.log(d);
            return width/bins.length-1 })
          .style("fill", function(d) { 
            var output; 
            if (d.x>=40&&d.x<=49) {
              output = 'Certified';
            }
            else if (d.x>=50&&d.x<=59) {
              output = 'Silver';
            }
            else if (d.x>=60&&d.x<=79) {
              output = 'Gold';
            }
            else if (d.x>=80) {
              output = 'Platinum';
            }
            return color(output); });
      
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("x", 415)
          .attr("y", 45)
          .style("text-anchor", "middle")
          .text("Points Achieved");
    
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("y", 220)
          .attr("x", -30)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Count");
      
      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

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
          .text(function(d) { return d; });
      
      d3.selectAll('.btn-trend3').on('click', function () {
       setTimeout(function () {
        
        //console.log('click');
        
        data = eval('data'+d3.select(".btn-trend3-on").node().value);
        
        //console.log(data.length);
        
        data.forEach(function(d, index) {
          if (d.certification_level=='Denied') {
            data.splice(index,1);
          };
        //console.log(d);
        });
        
        dataSet = data;
        
        x.domain(d3.extent(dataSet, function (d) { 
          return d.points_achieved; }));
      
        bins = [];
        for (var i = x.domain()[0]; i <= x.domain()[1]; i++) {
            bins.push(i);
        }
        
        //console.log(bins);
        
        values = dataSet.map(function (d) {
          //console.log(d);
          return d.points_achieved;
        });
        
        histo = d3.layout.histogram()
            .bins(x.ticks(bins.length))
            (values);
            
        //console.log(histo);
        
        y.domain(d3.extent(histo, function (d) {
          //console.log(d.length);
          return d.length;
        }));
        
        
        svg.selectAll('.bar').remove();
        
        bar = svg.selectAll(".bar")
            .data(histo)
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { 
              //console.log(d);
              return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
          
        bar.append("rect")
            .attr("x", 1)
            .attr('class', 'rect')
            .attr("height", function(d) { 
              //console.log(d);
              return height - y(d.y); })
            .attr("width", function(d) { 
              //console.log(d);
              return width/bins.length-1 })
            .style("fill", function(d) {
              var output;
              console.log(histo.length);
              if (histo.length<57) { 
                if (d.x>=26&&d.x<=32) {
                  output = 'Certified';
                }
                else if (d.x>=33&&d.x<=38) {
                  output = 'Silver';
                }
                else if (d.x>=39&&d.x<=51) {
                  output = 'Gold';
                }
                else if (d.x>=52) {
                  output = 'Platinum';
                }
               return color(output);
              }
               if (histo.length>=57) { 
                if (d.x>=40&&d.x<=49) {
                  output = 'Certified';
                }
                else if (d.x>=50&&d.x<=59) {
                  output = 'Silver';
                }
                else if (d.x>=60&&d.x<=79) {
                  output = 'Gold';
                }
                else if (d.x>=80) {
                  output = 'Platinum';
                }
                return color(output); 
                }                 
            });
            
        svg.selectAll('.x').remove();
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("x", 415)
            .attr("y", 45)
            .style("text-anchor", "middle")
            .text("Points Achieved");
      
        svg.selectAll('.y').remove();
      
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("y", 220)
            .attr("x", -30)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Count");

        });
       });
      });
    });
  });      
}


