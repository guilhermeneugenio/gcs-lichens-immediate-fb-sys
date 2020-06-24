var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

var feedback = require('./feedbackExtension');
var dbStorage = require('./dbExtension');

const getForm = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const surveys = await db.loadCollection('surveys');
            const json = await surveys.find().toArray();
            res.status(200).send(json[0]);
        }
    });
};

const submitForm = (req, res) => {
    dbStorage.storeForm(req);
    res.status(200).send();
};

const processAnswer = (req, res) => {
    // Immediate Feedback
    feedback.immediateFeedback();
    // Differenciated Feedback
    feedback.diffFeedback();
    // Database storage
    dbStorage.storeAnswer(req);
    res.status(200).send({immediateFeedback: 'Thank You!'});
};

const processPhoto = (req, res) => {
    dbStorage.storePhoto(req);
    res.status(200).send();
};


const returnFeedback = (req, res) => {

    // Fetch Methods to send bellow

    //if data is not available 
    if(false)
        res.status(400).send();

    //if data is available is sent
    else
        res.status(200).send();
};

exports.getForm = getForm;
exports.submitForm = submitForm;
exports.processAnswer = processAnswer;
exports.processPhoto = processPhoto;
exports.returnFeedback = returnFeedback;