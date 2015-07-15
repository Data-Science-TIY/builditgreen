'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var topojson = require('topojson');
var queue = require("queue-async");
var d3 = require('d3');
var buildmap = require('../datavis/buildmap');
var linechart = require('../datavis/linechart');
var gradients = require('../datavis/gradients');
var Rainbow = require('rainbowvis.js');
var toggle = require('../datavis/toggle-creator');
var scatter = require('../datavis/scatter');
var histo = require('../datavis/histogram');
var hero = require('../datavis/heroimage');
var overbar = require('../datavis/overallbar');

router.route('','overview', function () {

  renderOverview();
  renderCredit();
  renderAbout();
  renderLeedvs();
  renderNav();
  
  
  function renderOverview () {
    
    $('.overview').html(views['overview']);
    
    // toggle("#map-dropdown div", 'btn-map');
    // toggle("#trend1-dropdown div", 'btn-trend1');
    // toggle("#trend2-dropdown div", 'btn-trend2');
    // toggle("#trend3-dropdown div", 'btn-trend3');
    // toggle('#plotly-dropdown div', 'btn-plotly');
    
    // buildmap(d3.select(".btn-map-on").node().value, gradients[d3.select(".btn-map-on").node().value]);  
    // linechart(".trend-1");
    // scatter(".trend-2");
    // histo('.trend-3'); 
  
  }
  
  function renderCredit () {
    
    $('.scoring').html(views['scoring']);
    toggle("#scoring1-dropdown div", 'btn-overall');
    toggle("#scoring-version1-dropdown div", 'btn-sc1-version');
    toggle("#scoring-category1-dropdown div", 'btn-sc1-category');
    toggle("#scoring-version2-dropdown div", 'btn-sc2-version');
    toggle("#scoring-category2-dropdown div", 'btn-sc2-category');
    overbar('.overallbar');
    
  }
  
  function renderAbout () {
    
    $('.about').html(views['about']);
    
  }
  
  function renderLeedvs () {
  
    $('.leedvs').html(views['leedvs']);
  
  }
  
  function renderNav () {
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
  }
  
});

