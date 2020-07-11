var ObjectId = require('mongodb').ObjectID;

var db = require('../modules/db');
var cache = require('../modules/cache');
var feedback = require('./feedbackExtension');

const getForm = (req, res) => {
    // Check cache
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();     
        else {
            const json = await db.getDocument('surveys')
            res.status(200).send(json[0]);
        } 
    });
};


const getData = (req, res) => {
    // Check cache
    cache.get(req.body.researcherEmail)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else res.status(200).send(await db.getDocument('answers') );       
    });
};

const removeData = (req, res) => {
    // Check cache
    cache.get(req.body.researcherEmail)
    .then(async result => {
        // Check if admin is in the cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            await db.deleteDocument('answers', { _id: ObjectId(req.body.id)})
            res.status(200).send();         
        }
    })
};

const submitForm = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else db.updateDocument('surveys',{}, JSON.parse(req.body.json))      
    });
    res.status(200).send();
};

const processAnswer = (req, res) => {
    // Immediate Feedback
    feedback.immediateFeedback();
    // Differenciated Feedback
    feedback.diffFeedback();
    // Database storage
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
            db.insertDocument('answers',newSurvey)
        }
    });
    res.status(200).send({immediateFeedback: 'Thank You!'});
};

const processPhoto = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const newPhoto = {
                base64: req.body.image_data,
                timestamp: new Date(),
            };
            db.insertDocument('answers', newPhoto)
        }
    });
    res.status(200).send();
};


const returnFeedback = (req, res) => {
    //if data is not available 
    if(false)
        res.status(400).send();
    //if data is available is sent
    else
        res.status(200).send();
};

exports.getForm = getForm;
exports.getData = getData;
exports.removeData= removeData;
exports.submitForm = submitForm;
exports.processAnswer = processAnswer;
exports.processPhoto = processPhoto;
exports.returnFeedback = returnFeedback;