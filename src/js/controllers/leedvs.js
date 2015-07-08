'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('leedvs', function () {

  $('.page-content').html(views['leedvs']);
  
});