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


router.route('','overview', function () {

  render();
  
  function render () {
    $('.page-content').html(views['overview']);
    
    
    buildmap();
    //linechart(".trend-1");
    //linechart(".trend-2");
  }
  
  
  
});

