'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    PrescriptionSchema = require('./prescription.server.model').PrescriptionSchema;

/**
 * Glasses Schema
 */

//Right eye is first element, left second
var GlassesSchema = new Schema({
	prescriptions: [PrescriptionSchema]
});

mongoose.model('Glasses', GlassesSchema);