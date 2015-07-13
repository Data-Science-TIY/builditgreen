'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var topojson = require('topojson');
var queue = require("queue-async");
var d3 = require('d3');
var c3 = require('c3');
var mapdata = require('../datavis/mapdata');
var buildmap = require('../datavis/buildmap');
var linechart = require('../datavis/linechart');
var gradients = require('../datavis/gradients');
var Rainbow = require('rainbowvis.js');
var toggle = require('../datavis/toggle-creator');
var scatter = require('../datavis/scatter');
var histo = require('../datavis/histogram');

router.route('','overview', function () {

  render();
  
  function render () {
    $('.page-content').html(views['overview']);
    /*
    d3.select('#dropdown').on("change", function () {
      
      setTimeout(buildmap(d3.select("#dropdown").node().value, gradients[d3.select("#dropdown").node().value]),10000);
      
    });
    */
    
    toggle("#map-dropdown div", 'btn-map');
    toggle("#trend1-dropdown div", 'btn-trend1');
    toggle("#trend2-dropdown div", 'btn-trend2');
    toggle("#trend3-dropdown div", 'btn-trend3');
    
    //console.log(d3.select(".on").node().value);
    buildmap(d3.select(".btn-map-on").node().value, gradients[d3.select(".btn-map-on").node().value]);
    
    linechart(".trend-1");
    scatter(".trend-2");
    histo('.trend-3');

    
  }
  
  
  
});

