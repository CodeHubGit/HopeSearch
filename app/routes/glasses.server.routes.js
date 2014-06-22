'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	glasses = require('../../app/controllers/glasses');

module.exports = function(app) {
	// Article Routes
	app.route('/glassesDB')
		.get(glasses.list)
		.post(glasses.create);

	app.route('/glasses/:glassesID')
		.get(glasses.read)
		.put(glasses.update)
		.delete(glasses.delete);

	// Finish by binding the glasses middleware
	app.param('glassesID', glasses.glassesByID);
};