'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Glasses = mongoose.model('Glasses'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Glasses pair already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a pair of Glasses
 */
exports.create = function(req, res) {
	var glasses = new Glasses(req.body);
	//article.user = req.user;

	glasses.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(glasses);
		}
	});
};

/**
 * Show the current glasses
 */
exports.read = function(req, res) {
	res.jsonp(req.glasses);
};

/**
 * Update glasses
 */
exports.update = function(req, res) {
	var glasses = req.glasses;

	glasses = _.extend(glasses, req.body);

	glasses.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(glasses);
		}
	});
};

/**
 * Delete glasses
 */
exports.delete = function(req, res) {
	var glasses = req.glasses;

    glasses.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(glasses);
		}
	});
};

/**
 * List of glasses
 */
exports.list = function(req, res) {
	//not sure about this
    Glasses.find().exec(function(err, glassesResults) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(glassesResults);
		}
	});
};

/**
 * Glasses middleware
 */
exports.glassesByID = function(req, res, next, id) {
	//not sure about this either
    Glasses.findById(id).exec(function(err, glasses) {
		if (err) return next(err);
		if (!glasses) return next(new Error('Failed to load glasses ' + id));
		req.glasses = glasses;
		next();
	});
};