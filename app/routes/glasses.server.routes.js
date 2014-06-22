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
		.post(users.requiresLogin, glasses.create);

	app.route('/articles/:articleId')
		.get(glasses.read)
		.put(users.requiresLogin, glasses.update)
		.delete(users.requiresLogin, glasses.delete);

	// Finish by binding the glasses middleware
	app.param('glassesID', glasses.glassesByID);
};