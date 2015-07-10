'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var topojson = require('topojson');
var queue = require("queue-async");
var d3 = require('d3');
var mapdata = require('../datavis/mapdata');
var buildmap = require('../datavis/buildmap');
var linechart = require('../datavis/linechart');
var gradients = require('../datavis/gradients');
var Rainbow = require('rainbowvis.js');

router.route('','overview', function () {

  render();
  
  function render () {
    $('.page-content').html(views['overview']);
    /*
    d3.select('#dropdown').on("change", function () {
      
      setTimeout(buildmap(d3.select("#dropdown").node().value, gradients[d3.select("#dropdown").node().value]),10000);
      
    });
    */
    buildmap(d3.select("#dropdown").node().value, gradients[d3.select("#dropdown").node().value]);
    
    
    //linechart(".trend-1");
    //linechart(".trend-2");
  }
  
  
  
});

