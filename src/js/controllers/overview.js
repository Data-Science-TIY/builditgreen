'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('','overview', function () {

  $('.page-content').html(views['overview']);
  
});