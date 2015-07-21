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
  renderCluster();
  renderNav();
  
  
  function renderOverview () {
    
    $('.overview').html(views['overview']);
    
    toggle("#map-dropdown div", 'btn-map');
    toggle("#trend1-dropdown div", 'btn-trend1');
    toggle("#trend2-dropdown div", 'btn-trend2');
    toggle("#trend3-dropdown div", 'btn-trend3');
    toggle('#plotly-dropdown div', 'btn-plotly');
    
    buildmap(d3.select(".btn-map-on").node().value, gradients[d3.select(".btn-map-on").node().value]);  
    linechart(".trend-1");
    scatter(".trend-2");
    histo('.trend-3'); 
    
    
    
    $('#plotly-dropdown').on('click', function(e) {
      setTimeout(function() {
        
        if ($(e.target).parent().val()==='total') {
        $('.plotly-total').css('visibility', 'visible');
        $('.plotly-adjusted').css('visibility', 'hidden');
      }
        else if ($(e.target).parent().val()==='adjusted') {
        $('.plotly-total').css('visibility', 'hidden');
        $('.plotly-adjusted').css('visibility', 'visible');
      }
        
      });
    });
  }
  
  function renderCredit () {
    
    $('.scoring').html(views['scoring']);
    toggle("#scoring1-dropdown div", 'btn-overall');
    toggle("#scoring-version1-dropdown div", 'btn-sc1-version');
    toggle("#scoring-category1-dropdown div", 'btn-sc1-category');
    toggle("#scoring-version2-dropdown div", 'btn-sc2-version');
    toggle("#scoring-category2-dropdown div", 'btn-sc2-category');
    toggle('#scoring-plotly-dropdown div', 'btn-scoring-plotly');
    overbar('.overallbar', '.cc-by-year', '.cc-by-category');
    
    
    $('#scoring1-dropdown').on('click', function(e) {
      setTimeout(function () {
      if ($('.btn-overall-on').val()=='0') {
        $('.m-btn1').css('display', 'inline-block');
      }
      else if ($('.btn-overall-on').val()!=='0') {
        $('.m-btn1').css('display', 'none');
        $('.modal1').css('display', 'none');
      }
      });
    });
    
    $('#scoring-version2-dropdown').on('click', function(e) {
      setTimeout(function() {
      if ($(e.target).parent().text()==='LEED 2.1'||$(e.target).parent().text()==='LEED 2.2') {
        var extra = $('[value="extra"]');
        console.log(extra);
        $('#scoring-category2-dropdown').find(extra).attr('disabled', true);
      }
      });
    });
    
    $('#scoring-version1-dropdown').on('click', function(e) {
      setTimeout(function() {
      if ($(e.target).parent().text()==='LEED 2.1'||$(e.target).parent().text()==='LEED 2.2') {
        var extra = $('[value="extra"]');
        $('#scoring-category1-dropdown').find(extra).attr('disabled', true);
      }
      });
    });
    
    $('#scoring-version1-dropdown').on('click', function(e) {
      setTimeout(function() {
      if ($(e.target).parent().text()==='LEED 2009') {
        var extra = $('[value="extra"]');
        $('#scoring-category1-dropdown').find(extra).attr('disabled', false);
      }
      });
    });
    
    $('#scoring-version2-dropdown').on('click', function(e) {
      setTimeout(function() {
      if ($(e.target).parent().text()==='LEED 2009') {
        var extra = $('[value="extra"]');
        $('#scoring-category2-dropdown').find(extra).attr('disabled', false);
      }
      });
    });  
    
    $('#scoring-plotly-dropdown').on('click', function(e) {
      setTimeout(function() {
        
        if ($(e.target).parent().val()==='total') {
        $('.total').css('visibility', 'visible');
        $('.ea').css('visibility', 'hidden');
        $('.eq').css('visibility', 'hidden');
        $('.mr').css('visibility', 'hidden');
        $('.ss').css('visibility', 'hidden');
        $('.we').css('visibility', 'hidden');
        $('.rpid').css('visibility', 'hidden');
        
        $('.total-plotly-desc').css('display', 'inline-block');
        $('.total-plotly-ea').css('display', 'none');
        $('.total-plotly-eq').css('display', 'none');
        $('.total-plotly-mr').css('display', 'none');
        $('.total-plotly-ss').css('display', 'none');
        $('.total-plotly-we').css('display', 'none');
        $('.total-plotly-rpid').css('display', 'none');     
        
        $('.modal4-total').css('display', 'block');
        $('.modal4-ea').css('display', 'none');
        $('.modal4-eq').css('display', 'none');
        $('.modal4-mr').css('display', 'none');
        $('.modal4-ss').css('display', 'none');
        $('.modal4-we').css('display', 'none');
        $('.modal4-rpid').css('display', 'none');     
        
        $('.modal4').css('top', '-210px');         
      }
        else if ($(e.target).parent().val()==='ea') {
        $('.total').css('visibility', 'hidden');
        $('.ea').css('visibility', 'visible');
        $('.eq').css('visibility', 'hidden');
        $('.mr').css('visibility', 'hidden');
        $('.ss').css('visibility', 'hidden');
        $('.we').css('visibility', 'hidden');
        $('.rpid').css('visibility', 'hidden');
        
        $('.total-plotly-desc').css('display', 'none');
        $('.total-plotly-ea').css('display', 'inline-block');
        $('.total-plotly-eq').css('display', 'none');
        $('.total-plotly-mr').css('display', 'none');
        $('.total-plotly-ss').css('display', 'none');
        $('.total-plotly-we').css('display', 'none');
        $('.total-plotly-rpid').css('display', 'none');  
        
        $('.modal4-total').css('display', 'none');
        $('.modal4-ea').css('display', 'block');
        $('.modal4-eq').css('display', 'none');
        $('.modal4-mr').css('display', 'none');
        $('.modal4-ss').css('display', 'none');
        $('.modal4-we').css('display', 'none');
        $('.modal4-rpid').css('display', 'none');    
        
        $('.modal4').css('top', '-230px');               
      }
        else if ($(e.target).parent().val()==='eq') {
        $('.total').css('visibility', 'hidden');
        $('.ea').css('visibility', 'hidden');
        $('.eq').css('visibility', 'visible');
        $('.mr').css('visibility', 'hidden');
        $('.ss').css('visibility', 'hidden');
        $('.we').css('visibility', 'hidden');
        $('.rpid').css('visibility', 'hidden');
        
        $('.total-plotly-desc').css('display', 'none');
        $('.total-plotly-ea').css('display', 'none');
        $('.total-plotly-eq').css('display', 'inline-block');
        $('.total-plotly-mr').css('display', 'none');
        $('.total-plotly-ss').css('display', 'none');
        $('.total-plotly-we').css('display', 'none');
        $('.total-plotly-rpid').css('display', 'none');  
       
        $('.modal4-total').css('display', 'none');
        $('.modal4-ea').css('display', 'none');
        $('.modal4-eq').css('display', 'block');
        $('.modal4-mr').css('display', 'none');
        $('.modal4-ss').css('display', 'none');
        $('.modal4-we').css('display', 'none');
        $('.modal4-rpid').css('display', 'none');  
        
        $('.modal4').css('top', '-155px');            
      }
        else if ($(e.target).parent().val()==='mr') {
        $('.total').css('visibility', 'hidden');
        $('.ea').css('visibility', 'hidden');
        $('.eq').css('visibility', 'hidden');
        $('.mr').css('visibility', 'visible');
        $('.ss').css('visibility', 'hidden');
        $('.we').css('visibility', 'hidden');
        $('.rpid').css('visibility', 'hidden');
        
        $('.total-plotly-desc').css('display', 'none');
        $('.total-plotly-ea').css('display', 'none');
        $('.total-plotly-eq').css('display', 'none');
        $('.total-plotly-mr').css('display', 'inline-block');
        $('.total-plotly-ss').css('display', 'none');
        $('.total-plotly-we').css('display', 'none');
        $('.total-plotly-rpid').css('display', 'none');
        
        $('.modal4-total').css('display', 'none');
        $('.modal4-ea').css('display', 'none');
        $('.modal4-eq').css('display', 'none');
        $('.modal4-mr').css('display', 'block');
        $('.modal4-ss').css('display', 'none');
        $('.modal4-we').css('display', 'none');
        $('.modal4-rpid').css('display', 'none'); 
        
        $('.modal4').css('top', '-210px');            
      }
        else if ($(e.target).parent().val()==='ss') {
        $('.total').css('visibility', 'hidden');
        $('.ea').css('visibility', 'hidden');
        $('.eq').css('visibility', 'hidden');
        $('.mr').css('visibility', 'hidden');
        $('.ss').css('visibility', 'visible');
        $('.we').css('visibility', 'hidden');
        $('.rpid').css('visibility', 'hidden');
        
        $('.total-plotly-desc').css('display', 'none');
        $('.total-plotly-ea').css('display', 'none');
        $('.total-plotly-eq').css('display', 'none');
        $('.total-plotly-mr').css('display', 'none');
        $('.total-plotly-ss').css('display', 'inline-block');
        $('.total-plotly-we').css('display', 'none');
        $('.total-plotly-rpid').css('display', 'none');  
        
        $('.modal4-total').css('display', 'none');
        $('.modal4-ea').css('display', 'none');
        $('.modal4-eq').css('display', 'none');
        $('.modal4-mr').css('display', 'none');
        $('.modal4-ss').css('display', 'block');
        $('.modal4-we').css('display', 'none');
        $('.modal4-rpid').css('display', 'none');    
        
        $('.modal4').css('top', '-210px');       
      }
        else if ($(e.target).parent().val()==='we') {
        $('.total').css('visibility', 'hidden');
        $('.ea').css('visibility', 'hidden');
        $('.eq').css('visibility', 'hidden');
        $('.mr').css('visibility', 'hidden');
        $('.ss').css('visibility', 'hidden');
        $('.we').css('visibility', 'visible');
        $('.rpid').css('visibility', 'hidden');
        
        $('.total-plotly-desc').css('display', 'none');
        $('.total-plotly-ea').css('display', 'none');
        $('.total-plotly-eq').css('display', 'none');
        $('.total-plotly-mr').css('display', 'none');
        $('.total-plotly-ss').css('display', 'none');
        $('.total-plotly-we').css('display', 'inline-block');
        $('.total-plotly-rpid').css('display', 'none');    
        
        $('.modal4-total').css('display', 'none');
        $('.modal4-ea').css('display', 'none');
        $('.modal4-eq').css('display', 'none');
        $('.modal4-mr').css('display', 'none');
        $('.modal4-ss').css('display', 'none');
        $('.modal4-we').css('display', 'block');
        $('.modal4-rpid').css('display', 'none');     
        
        $('.modal4').css('top', '-250px');               
      }
        else if ($(e.target).parent().val()==='rpid') {
        $('.total').css('visibility', 'hidden');
        $('.ea').css('visibility', 'hidden');
        $('.eq').css('visibility', 'hidden');
        $('.mr').css('visibility', 'hidden');
        $('.ss').css('visibility', 'hidden');
        $('.we').css('visibility', 'hidden');
        $('.rpid').css('visibility', 'visible');
        
        $('.total-plotly-desc').css('display', 'none');
        $('.total-plotly-ea').css('display', 'none');
        $('.total-plotly-eq').css('display', 'none');
        $('.total-plotly-mr').css('display', 'none');
        $('.total-plotly-ss').css('display', 'none');
        $('.total-plotly-we').css('display', 'none');
        $('.total-plotly-rpid').css('display', 'inline-block');   
        
        $('.modal4-total').css('display', 'none');
        $('.modal4-ea').css('display', 'none');
        $('.modal4-eq').css('display', 'none');
        $('.modal4-mr').css('display', 'none');
        $('.modal4-ss').css('display', 'none');
        $('.modal4-we').css('display', 'none');
        $('.modal4-rpid').css('display', 'block');   
        
        $('.modal4').css('top', '-250px');          
      }                              
        
      });
    });
    
    $('#scoring-category1-dropdown').on('click', function(e) {
      setTimeout(function() {
      console.log($('.btn-sc1-version-on').val()); 
        
        
        if ($('.btn-sc1-version-on').val()=='0') {
        
          $('.ac-d3-2009').css('display','inline-block');
          $('.ac-d3-22').css('display','none');
          $('.ac-d3-21').css('display','none');
          $('.m-btn2').css('display','inline-block');
          
          if ($('.btn-sc1-category-on').val()=='eac') {
            $('.ac-d3-desc-ea').css('display', 'inline-block');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.modal2-ea').css('display', 'block');
            $('.modal2-eq').css('display', 'none');
            $('.modal2-rp').css('display', 'none');
            $('.modal2-id').css('display', 'none');
            $('.modal2-mr').css('display', 'none');
            $('.modal2-ss').css('display', 'none');
            $('.modal2-we').css('display', 'none'); 
            
            $('.m-btn2').css('margin', '0 1em 4em 0');  
            $('.modal2').css('top', '-190px');  
          }
          else if ($('.btn-sc1-category-on').val()=='eqc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'inline-block');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none'); 
            
            $('.modal2-ea').css('display', 'none');
            $('.modal2-eq').css('display', 'block');
            $('.modal2-rp').css('display', 'none');
            $('.modal2-id').css('display', 'none');
            $('.modal2-mr').css('display', 'none');
            $('.modal2-ss').css('display', 'none');
            $('.modal2-we').css('display', 'none'); 
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');   
            $('.modal2').css('top', '-270px');             
          }
          else if ($('.btn-sc1-category-on').val()=='extra') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'inline-block');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.modal2-ea').css('display', 'none');
            $('.modal2-eq').css('display', 'none');
            $('.modal2-rp').css('display', 'block');
            $('.modal2-id').css('display', 'none');
            $('.modal2-mr').css('display', 'none');
            $('.modal2-ss').css('display', 'none');
            $('.modal2-we').css('display', 'none');      
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');     
            $('.modal2').css('top', '-155px');     
          }
          else if ($('.btn-sc1-category-on').val()=='idc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'inline-block');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');  
            
            $('.modal2-ea').css('display', 'none');
            $('.modal2-eq').css('display', 'none');
            $('.modal2-rp').css('display', 'none');
            $('.modal2-id').css('display', 'block');
            $('.modal2-mr').css('display', 'none');
            $('.modal2-ss').css('display', 'none');
            $('.modal2-we').css('display', 'none');         
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');     
            $('.modal2').css('top', '-115px');   
          }
          else if ($('.btn-sc1-category-on').val()=='mrc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'inline-block');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.modal2-ea').css('display', 'none');
            $('.modal2-eq').css('display', 'none');
            $('.modal2-rp').css('display', 'none');
            $('.modal2-id').css('display', 'none');
            $('.modal2-mr').css('display', 'block');
            $('.modal2-ss').css('display', 'none');
            $('.modal2-we').css('display', 'none');       
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');        
            $('.modal2').css('top', '-115px'); 
          }
          else if ($('.btn-sc1-category-on').val()=='ssc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'inline-block');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.modal2-ea').css('display', 'none');
            $('.modal2-eq').css('display', 'none');
            $('.modal2-rp').css('display', 'none');
            $('.modal2-id').css('display', 'none');
            $('.modal2-mr').css('display', 'none');
            $('.modal2-ss').css('display', 'block');
            $('.modal2-we').css('display', 'none');     
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');         
            $('.modal2').css('top', '-190px');   
          }
          else if ($('.btn-sc1-category-on').val()=='wec') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'inline-block'); 
            
            $('.modal2-ea').css('display', 'none');
            $('.modal2-eq').css('display', 'none');
            $('.modal2-rp').css('display', 'none');
            $('.modal2-id').css('display', 'none');
            $('.modal2-mr').css('display', 'none');
            $('.modal2-ss').css('display', 'none');
            $('.modal2-we').css('display', 'block');
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');   
            $('.modal2').css('top', '-190px');              
          }       
      }
      
      else if ($('.btn-sc1-version-on').val()=='1') {
        
        $('.ac-d3-2009').css('display','none');
        $('.ac-d3-22').css('display','inline-block');
        $('.ac-d3-21').css('display','none');
        $('.m-btn2').css('display','none');
        $('.modal2').css('display', 'none');
        
         if ($('.btn-sc1-category-on').val()=='eac') {
            $('.ac-d3-desc-ea22').css('display', 'inline-block');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc1-category-on').val()=='eqc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'inline-block');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='extra') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'inline-block');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');     
          }
          else if ($('.btn-sc1-category-on').val()=='idc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'inline-block');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc1-category-on').val()=='mrc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'inline-block');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='ssc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'inline-block');
            $('.ac-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='wec') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'inline-block');   
          }              
      }
        else if ($('.btn-sc1-version-on').val()=='2') {
          
          
          $('.ac-d3-2009').css('display','none');
          $('.ac-d3-22').css('display','none');
          $('.ac-d3-21').css('display','inline-block');
          $('.m-btn2').css('display','none');
          $('.modal2').css('display', 'none');
        
         if ($('.btn-sc1-category-on').val()=='eac') {
            $('.ac-d3-desc-ea21').css('display', 'inline-block');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='eqc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'inline-block');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc1-category-on').val()=='extra') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'inline-block');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none'); 
          }
          else if ($('.btn-sc1-category-on').val()=='idc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'inline-block');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc1-category-on').val()=='mrc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'inline-block');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc1-category-on').val()=='ssc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'inline-block');
            $('.ac-d3-desc-we21').css('display', 'none');    
          }
          else if ($('.btn-sc1-category-on').val()=='wec') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'inline-block');  
          }            
      } 
        
      });
    });
      
    
    $('#scoring-version1-dropdown').on('click', function(e) {
      setTimeout(function() {
        
        if ($('.btn-sc1-version-on').val()=='0') {
        
          $('.ac-d3-2009').css('display','inline-block');
          $('.ac-d3-22').css('display','none');
          $('.ac-d3-21').css('display','none');
          $('.m-btn2').css('display','inline-block');
          
          if ($('.btn-sc1-category-on').val()=='eac') {
            $('.ac-d3-desc-ea').css('display', 'inline-block');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');    
            
            $('.m-btn2').css('margin', '0 1em 4em 0');
          }
          else if ($('.btn-sc1-category-on').val()=='eqc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'inline-block');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none'); 
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');
          }
          else if ($('.btn-sc1-category-on').val()=='extra') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'inline-block');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');
          }
          else if ($('.btn-sc1-category-on').val()=='idc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'inline-block');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');
          }
          else if ($('.btn-sc1-category-on').val()=='mrc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'inline-block');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'none');   
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');
          }
          else if ($('.btn-sc1-category-on').val()=='ssc') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'inline-block');
            $('.ac-d3-desc-we').css('display', 'none');    
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');
          }
          else if ($('.btn-sc1-category-on').val()=='wec') {
            $('.ac-d3-desc-ea').css('display', 'none');
            $('.ac-d3-desc-eq').css('display', 'none');
            $('.ac-d3-desc-rp').css('display', 'none');
            $('.ac-d3-desc-id').css('display', 'none');
            $('.ac-d3-desc-mr').css('display', 'none');
            $('.ac-d3-desc-ss').css('display', 'none');
            $('.ac-d3-desc-we').css('display', 'inline-block');  
            
            $('.m-btn2').css('margin', '0 1em 1.5em 0');
          }      
        }
      
          else if ($('.btn-sc1-version-on').val()=='1') {
          
          $('.ac-d3-2009').css('display','none');
          $('.ac-d3-22').css('display','inline-block');
          $('.ac-d3-21').css('display','none');
          $('.m-btn2').css('display','none');
          $('.modal2').css('display', 'none');
          
          if ($('.btn-sc1-category-on').val()=='eac') {
            $('.ac-d3-desc-ea22').css('display', 'inline-block');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');      
          }
          else if ($('.btn-sc1-category-on').val()=='eqc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'inline-block');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='extra') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'inline-block');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='idc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'inline-block');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc1-category-on').val()=='mrc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'inline-block');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc1-category-on').val()=='ssc') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'inline-block');
            $('.ac-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc1-category-on').val()=='wec') {
            $('.ac-d3-desc-ea22').css('display', 'none');
            $('.ac-d3-desc-eq22').css('display', 'none');
            $('.ac-d3-desc-rp22').css('display', 'none');
            $('.ac-d3-desc-id22').css('display', 'none');
            $('.ac-d3-desc-mr22').css('display', 'none');
            $('.ac-d3-desc-ss22').css('display', 'none');
            $('.ac-d3-desc-we22').css('display', 'inline-block');   
          } 
          
          }
          else if ($('.btn-sc1-version-on').val()=='2') {
          
          $('.ac-d3-2009').css('display','none');
          $('.ac-d3-22').css('display','none');
          $('.ac-d3-21').css('display','inline-block');
          $('.m-btn2').css('display','none');
          $('.modal2').css('display', 'none');
          
          if ($('.btn-sc1-category-on').val()=='eac') {
            $('.ac-d3-desc-ea21').css('display', 'inline-block');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');     
          }
          else if ($('.btn-sc1-category-on').val()=='eqc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'inline-block');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none'); 
          }
          else if ($('.btn-sc1-category-on').val()=='extra') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'inline-block');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc1-category-on').val()=='idc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'inline-block');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc1-category-on').val()=='mrc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'inline-block');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc1-category-on').val()=='ssc') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'inline-block');
            $('.ac-d3-desc-we21').css('display', 'none'); 
          }
          else if ($('.btn-sc1-category-on').val()=='wec') {
            $('.ac-d3-desc-ea21').css('display', 'none');
            $('.ac-d3-desc-eq21').css('display', 'none');
            $('.ac-d3-desc-rp21').css('display', 'none');
            $('.ac-d3-desc-id21').css('display', 'none');
            $('.ac-d3-desc-mr21').css('display', 'none');
            $('.ac-d3-desc-ss21').css('display', 'none');
            $('.ac-d3-desc-we21').css('display', 'inline-block'); 
          } 
          }
          
      
            });
      
      });
        
$('#scoring-category2-dropdown').on('click', function(e) {
      setTimeout(function() {
        
        
        
        if ($('.btn-sc2-version-on').val()=='0') {
        
          $('.cc-d3-2009').css('display','inline-block');
          $('.cc-d3-22').css('display','none');
          $('.cc-d3-21').css('display','none');
          $('.m-btn3').css('display','inline-block');
          
          
          
          if ($('.btn-sc2-category-on').val()=='eac') {
            $('.cc-d3-desc-ea').css('display', 'inline-block');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');   
            
            $('.modal3-ea').css('display', 'block');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');  
            
            $('.modal3').css('top', '-265px');  
          }
          else if ($('.btn-sc2-category-on').val()=='eqc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'inline-block');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none'); 
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'block');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');   
            
            $('.modal3').css('top', '-205px');               
          }
          else if ($('.btn-sc2-category-on').val()=='extra') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'inline-block');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');   
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'block');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');     
            
            $('.modal3').css('top', '-170px');            
          }
          else if ($('.btn-sc2-category-on').val()=='idc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'inline-block');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');  
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'block');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');
            
            $('.modal3').css('top', '-115px');                  
          }
          else if ($('.btn-sc2-category-on').val()=='mrc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'inline-block');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');   
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'block');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');      
            
            $('.modal3').css('top', '-225px');           
          }
          else if ($('.btn-sc2-category-on').val()=='ssc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'inline-block');
            $('.cc-d3-desc-we').css('display', 'none');   
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'block');
            $('.modal3-we').css('display', 'none');    
            
            $('.modal3').css('top', '-285px');              
          }
          else if ($('.btn-sc2-category-on').val()=='wec') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'inline-block'); 
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'block');   
            
            $('.modal3').css('top', '-230px');               
          }       
      }
      
      else if ($('.btn-sc2-version-on').val()=='1') {
        
        
        $('.cc-d3-2009').css('display','none');
          $('.cc-d3-22').css('display','inline-block');
          $('.cc-d3-21').css('display','none');
        $('.m-btn3').css('display','none');
        $('.modal3').css('display', 'none');
        
         if ($('.btn-sc2-category-on').val()=='eac') {
            $('.cc-d3-desc-ea22').css('display', 'inline-block');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc2-category-on').val()=='eqc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'inline-block');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='extra') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'inline-block');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');     
          }
          else if ($('.btn-sc2-category-on').val()=='idc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'inline-block');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc2-category-on').val()=='mrc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'inline-block');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='ssc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'inline-block');
            $('.cc-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='wec') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'inline-block');   
          }              
      }
        else if ($('.btn-sc2-version-on').val()=='2') {
          
          
          $('.cc-d3-2009').css('display','none');
          $('.cc-d3-22').css('display','none');
          $('.cc-d3-21').css('display','inline-block');
          $('.m-btn3').css('display','none');
          $('.modal3').css('display', 'none');
        
         if ($('.btn-sc2-category-on').val()=='eac') {
            $('.cc-d3-desc-ea21').css('display', 'inline-block');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='eqc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'inline-block');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc2-category-on').val()=='extra') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'inline-block');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none'); 
          }
          else if ($('.btn-sc2-category-on').val()=='idc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'inline-block');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc2-category-on').val()=='mrc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'inline-block');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc2-category-on').val()=='ssc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'inline-block');
            $('.cc-d3-desc-we21').css('display', 'none');    
          }
          else if ($('.btn-sc2-category-on').val()=='wec') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'inline-block');  
          }            
      } 
        
      });
    });
      
    
    $('#scoring-version2-dropdown').on('click', function(e) {
      setTimeout(function() {
        
        if ($('.btn-sc2-version-on').val()=='0') {
        
          $('.cc-d3-2009').css('display','inline-block');
          $('.cc-d3-22').css('display','none');
          $('.cc-d3-21').css('display','none');
          $('.m-btn3').css('display','inline-block');
          
          if ($('.btn-sc2-category-on').val()=='eac') {
            $('.cc-d3-desc-ea').css('display', 'inline-block');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');    
            
            $('.modal3-ea').css('display', 'block');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='eqc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'inline-block');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none'); 
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'block');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='extra') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'inline-block');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');   
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'block');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='idc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'inline-block');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none');   
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'block');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');               
          }
          else if ($('.btn-sc2-category-on').val()=='mrc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'inline-block');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'none'); 
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'block');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'none');                 
          }
          else if ($('.btn-sc2-category-on').val()=='ssc') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'inline-block');
            $('.cc-d3-desc-we').css('display', 'none');  
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'block');
            $('.modal3-we').css('display', 'none');                 
          }
          else if ($('.btn-sc2-category-on').val()=='wec') {
            $('.cc-d3-desc-ea').css('display', 'none');
            $('.cc-d3-desc-eq').css('display', 'none');
            $('.cc-d3-desc-rp').css('display', 'none');
            $('.cc-d3-desc-id').css('display', 'none');
            $('.cc-d3-desc-mr').css('display', 'none');
            $('.cc-d3-desc-ss').css('display', 'none');
            $('.cc-d3-desc-we').css('display', 'inline-block'); 
            
            $('.modal3-ea').css('display', 'none');
            $('.modal3-eq').css('display', 'none');
            $('.modal3-rp').css('display', 'none');
            $('.modal3-id').css('display', 'none');
            $('.modal3-mr').css('display', 'none');
            $('.modal3-ss').css('display', 'none');
            $('.modal3-we').css('display', 'block');                
          }      
        }
      
          else if ($('.btn-sc2-version-on').val()=='1') {
          
          $('.cc-d3-2009').css('display','none');
          $('.cc-d3-22').css('display','inline-block');
          $('.cc-d3-21').css('display','none');
          $('.m-btn3').css('display','none');
          $('.modal3').css('display', 'none');
          
         if ($('.btn-sc2-category-on').val()=='eac') {
            $('.cc-d3-desc-ea22').css('display', 'inline-block');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');      
          }
          else if ($('.btn-sc2-category-on').val()=='eqc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'inline-block');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='extra') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'inline-block');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='idc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'inline-block');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');   
          }
          else if ($('.btn-sc2-category-on').val()=='mrc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'inline-block');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc2-category-on').val()=='ssc') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'inline-block');
            $('.cc-d3-desc-we22').css('display', 'none');    
          }
          else if ($('.btn-sc2-category-on').val()=='wec') {
            $('.cc-d3-desc-ea22').css('display', 'none');
            $('.cc-d3-desc-eq22').css('display', 'none');
            $('.cc-d3-desc-rp22').css('display', 'none');
            $('.cc-d3-desc-id22').css('display', 'none');
            $('.cc-d3-desc-mr22').css('display', 'none');
            $('.cc-d3-desc-ss22').css('display', 'none');
            $('.cc-d3-desc-we22').css('display', 'inline-block');   
          } 
          
          }
          else if ($('.btn-sc2-version-on').val()=='2') {
          
          $('.cc-d3-2009').css('display','none');
          $('.cc-d3-22').css('display','none');
          $('.cc-d3-21').css('display','inline-block');
          $('.m-btn3').css('display','none');
          $('.modal3').css('display', 'none');
          
          if ($('.btn-sc2-category-on').val()=='eac') {
            $('.cc-d3-desc-ea21').css('display', 'inline-block');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');     
          }
          else if ($('.btn-sc2-category-on').val()=='eqc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'inline-block');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none'); 
          }
          else if ($('.btn-sc2-category-on').val()=='extra') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'inline-block');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc2-category-on').val()=='idc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'inline-block');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc2-category-on').val()=='mrc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'inline-block');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'none');  
          }
          else if ($('.btn-sc2-category-on').val()=='ssc') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'inline-block');
            $('.cc-d3-desc-we21').css('display', 'none'); 
          }
          else if ($('.btn-sc2-category-on').val()=='wec') {
            $('.cc-d3-desc-ea21').css('display', 'none');
            $('.cc-d3-desc-eq21').css('display', 'none');
            $('.cc-d3-desc-rp21').css('display', 'none');
            $('.cc-d3-desc-id21').css('display', 'none');
            $('.cc-d3-desc-mr21').css('display', 'none');
            $('.cc-d3-desc-ss21').css('display', 'none');
            $('.cc-d3-desc-we21').css('display', 'inline-block'); 
          } 
          }
          
      
            });
      
      });        
    
      $('.m-btn1').on('click', function(e) {
       
       if( $(".modal1").css('display').toLowerCase() == 'block') {
         $('.modal1').css('display', 'none');
       }
       else {
        $('.modal1').css('display', 'block');
       };
       
     });
     $('.m-btn2').on('click', function(e) {
       
       if( $(".modal2").css('display').toLowerCase() == 'block') {
         $('.modal2').css('display', 'none');
       }
       else {
        $('.modal2').css('display', 'block');
       };
       
     });
     $('.m-btn3').on('click', function(e) {
       
       if( $(".modal3").css('display').toLowerCase() == 'block') {
         $('.modal3').css('display', 'none');
       }
       else {
        $('.modal3').css('display', 'block');
       };
       
     });
     $('.m-btn4').on('click', function(e) {
       
       if( $(".modal4").css('display').toLowerCase() == 'block') {
         $('.modal4').css('display', 'none');
       }
       else {
        $('.modal4').css('display', 'block');
       };
       
     });
    
  }
  
  
  function renderAbout () {
    
    $('.about').html(views['about']);
    
  }
  
  function renderLeedvs () {
  
    $('.leedvs').html(views['leedvs']);
    
    toggle("#leedvs-plotly-dropdown div", 'btn-leedvs-plotly');   
    
    $('#leedvs-plotly-dropdown').on('click', function(e) {
      setTimeout(function() {
        
        if ($(e.target).parent().val()==='oeui') {
        $('.oeui').css('display', 'block');
        $('.ueui').css('display', 'none');
        $('.oghg').css('display', 'none');
        $('.ughg').css('display', 'none');
      }
        else if ($(e.target).parent().val()==='ueui') {
        $('.oeui').css('display', 'none');
        $('.ueui').css('display', 'block');
        $('.oghg').css('display', 'none');
        $('.ughg').css('display', 'none');
      }
      else if ($(e.target).parent().val()==='oghg') {
        $('.oeui').css('display', 'none');
        $('.ueui').css('display', 'none');
        $('.oghg').css('display', 'block');
        $('.ughg').css('display', 'none');
      }
      else if ($(e.target).parent().val()==='ughg') {
        $('.oeui').css('display', 'none');
        $('.ueui').css('display', 'none');
        $('.oghg').css('display', 'none');
        $('.ughg').css('display', 'block');
      }
        
      });
    }); 
    
     $('.m-btn5').on('click', function(e) {
       
       if( $(".modal5").css('display').toLowerCase() == 'block') {
         $('.modal5').css('display', 'none');
       }
       else {
        $('.modal5').css('display', 'block');
       };
       
     });
  
  }
  
  function renderCluster () {
    
    $('.cluster').html(views['cluster']);
    
  }
  
  function renderNav () {
    $('.ov-btn').click(function () {
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'block');
      $('.cluster').css('display', 'none');
    });
    $('.sc-btn').click(function () {
      $('.scoring').css('display', 'block');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'none');
      $('.cluster').css('display', 'none');
    });
    $('.leed-btn').click(function () {
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'block');
      $('.overview').css('display', 'none');
      $('.cluster').css('display', 'none');
    });
    $('.abt-btn').click(function () {
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'block');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'none');
      $('.cluster').css('display', 'none');
    });
    $('.cluster-btn').click(function () {
      $('.cluster').css('display', 'block');
      $('.scoring').css('display', 'none');
      $('.about').css('display', 'none');
      $('.leedvs').css('display', 'none');
      $('.overview').css('display', 'none');
    });
  }
  
});

