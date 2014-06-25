'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Prescription = mongoose.model('Prescription'),
    _ = require('lodash');

var presdata = require('/home/macsj200/export.json');

//clear db
Prescription.remove(function(err, prescription){
    if(err){
        console.log(err);
    }
});

for(var i = 0; i < presdata.glasses.length; i++){
    var prescription = new Prescription(presdata.glasses[i]);
    prescription.save(function(err){
        if(err){
            console.log(err);
        }
    });
}

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Prescription already exists';
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
 * Create a Prescription
 */
exports.create = function(req, res) {
    var prescription = new Prescription(req.body);
    prescription.user = req.user;

    prescription.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(prescription);
        }
    });
};

/**
 * Show the current Prescription
 */
exports.read = function(req, res) {
    res.jsonp(req.prescription);
};

/**
 * Update a Prescription
 */
exports.update = function(req, res) {
    var prescription = req.prescription ;

    prescription = _.extend(prescription , req.body);

    prescription.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(prescription);
        }
    });
};

/**
 * Delete an Prescription
 */
exports.delete = function(req, res) {
    var prescription = req.prescription ;

    prescription.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(prescription);
        }
    });
};

/**
 * Function that performs filtered searches
 */
function doSearch(req, res, Prescription, depth){
    Prescription.find().sort('+number').exec(function (err, prescriptions) {

    });
}

/**
 * Helper function that checks if num is between two numbers
 * syntactic sugar
 */

function isBetween(num, low, high){
    return (num >= low) && (num <= high);
}

/**
 * Check if axis1 is within range of axis2
 * mod 180
 */
function checkAxis(axis1, axis2, range){
    axis1 = axis1 % 180;
    axis2 = axis2% 180;

    if(axis2 + range > 180){
        if(!(axis1 <= axis2 + range - 180 || axis1 >= axis2 - range)){
            return false;
        }
    }
    else if(axis2 - range < 0){
        if(!(axis1 <= axis2 + range || axis1 >= axis2 - range + 180)){
            return false;
        }
    }
    else{
        if(!isBetween(axis1, axis2 - range, axis2 + range)){
            return false;
        }
    }

    return true;
}

/**
 * List of Prescriptions
 *
 * if req is not empty, return filtered items
 * else return all prescriptions
 */
exports.list = function(req, res) {
    //if request has a prescription object do a search
    if(req.query.hasOwnProperty('prescription')){
        var prescription = JSON.parse(req.query.prescription);

        var searches = 0;
        var numberOfResults = 0;
        var results;

        var rightEye = prescription.eyes[0];
        var leftEye = prescription.eyes[1];
//        while(searches <= 8 && numberOfResults <= 15){
//            searches = searches + 1;
//
//
//        }

//        Prescription.find(
//            {
//                $and: [{'eyes.cylinder' : {'$gte': 0}}, {'eyes.position' : 'Right'}]
//            }
//        ).exec(function(err, prescriptions){
//            if (err) {
//                return res.send(400, {
//                    message: getErrorMessage(err)
//                });
//            } else {
//                res.jsonp(prescriptions);
//            }
//        });

        Prescription.find().exec(function(err, prescriptions){
            if(err){
                console.log(getErrorMessage(err));
            }
            else{
                console.log(prescriptions);
            }
        });
    }
    //else list all prescriptions
    else {
        Prescription.find().sort('+number').exec(function (err, prescriptions) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(prescriptions);
            }
        });
    }
};


/**
 * Prescription middleware
 */
exports.prescriptionByID = function(req, res, next, id) { Prescription.findById(id).populate('user', 'displayName').exec(function(err, prescription) {
    if (err) return next(err);
    if (! prescription) return next(new Error('Failed to load Prescription ' + id));
    req.prescription = prescription ;
    next();
});
};

/**
 * Prescription authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.prescription.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
    }
    next();
};