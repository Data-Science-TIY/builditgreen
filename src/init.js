'use strict';

var bulk = require('bulk-require');
var router = require('./util/router');

// Require all of our controllers
bulk(__dirname, ['controllers/**/*.js']);

// Start the router
router.init();