'use strict';

var material = require('./material.js');
var bulk = require('bulk-require');
var router = require('./router');

// Require all of our controllers
bulk(__dirname, ['controllers/**/*.js']);

// Start the router
router.init();