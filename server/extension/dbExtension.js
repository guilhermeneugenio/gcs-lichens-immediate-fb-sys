var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

const storeAnswer = (req) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const newSurvey = {
                user: req.body.email,
                timestamp: new Date(),
                data: req.body.answer
            };
            const surveys = await db.loadCollection('answers');
            await surveys.insertOne(newSurvey);
        }
    });
};

const storeForm = (req) => {
    
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const surveys = await db.loadCollection('surveys');
            const json = await surveys.find().toArray();
            if (json.length > 0){}
                await surveys.deleteOne({name: json[0].name});
            await surveys.insertOne(JSON.parse(req.body.json));    
            

        }
    });
};

exports.storeAnswer = storeAnswer;
exports.storeForm = storeForm;
