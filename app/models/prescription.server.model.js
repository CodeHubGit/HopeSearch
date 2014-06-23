'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Eye Schema
 */
var EyeSchema = new Schema({
    cylinder: {
        type: Number
    },
    sphere: {
        type: Number
    },
    axis: {
        type: Number
    },
    position: {
        type: String
    }
});

/**
 * Prescription Schema
 */
var PrescriptionSchema = new Schema({
	eyes: [EyeSchema],
    number:{
        type: Number
    },
    frame:{
        type: String,
        default: ""
    },
    lens:{
        type: String,
        default: ""
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Prescription', PrescriptionSchema);