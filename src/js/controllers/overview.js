'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var topojson = require('topojson');
var queue = require("queue-async");
var d3 = require('d3');

router.route('','overview', function () {

  render();
  
  function render () {
    $('.page-content').html(views['overview']);
    //getData();
    //buildMap();
  }
  
  function getData () {
    $.ajax({
    url: '/api/us/',
      method: 'GET'
    })
    .then(function (data) {
      console.log(data);
    }); 
  }
  
  function buildMap () {
   var width = 960,
   height = 500;

   var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);
    
   var path = d3.geo.path()
        .projection(projection);
    
   var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
    
   d3.json('data/us-10m.json', function(error, us) {
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

  }
  
});

