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
var hero = require('../datavis/heroimage');

router.route('','overview', function () {

  render();
  
  
  function render () {
    
    $('.overview').html(views['overview']);
    $('.about').html(views['about']);
    $('.scoring').html(views['scoring']);
    $('.leedvs').html(views['leedvs']);
    
    toggle("#map-dropdown div", 'btn-map');
    toggle("#trend1-dropdown div", 'btn-trend1');
    toggle("#trend2-dropdown div", 'btn-trend2');
    toggle("#trend3-dropdown div", 'btn-trend3');
    
    buildmap(d3.select(".btn-map-on").node().value, gradients[d3.select(".btn-map-on").node().value]);  
    linechart(".trend-1");
    scatter(".trend-2");
    histo('.trend-3');
    
    $('.ov-btn').click(function () {
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'block');
    });
    $('.sc-btn').click(function () {
      $('.scoring').css('display', 'block');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'none');
    });
    $('.leed-btn').click(function () {
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'block');
      $('.overview').css('display', 'none');
    });
    $('.abt-btn').click(function () {
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'block');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'none');
    });
    
    //hero();
    
  }
});

