'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Prescription Schema
 */
var PrescriptionSchema = new Schema({
	sphere: {
		type: Number
	},
    cylinder: {
        type: Number
    },
    axis: {
        type: Number
    },
    eye:{
        type:String
    }
});

mongoose.model('Prescription', PrescriptionSchema);

exports.PrescriptionSchema = PrescriptionSchema;