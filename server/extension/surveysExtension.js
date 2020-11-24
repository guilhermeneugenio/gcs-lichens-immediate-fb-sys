/* 
 * surveysExtension
 * Description : Functions that extend the surveys endpoints
 * should implement functions to get the surveys,
 * process answers, get feedback from the answer, submit new
 * surveys to the system and get info about the system to
 * help answer the survey.
 */

// Imports
var ObjectId = require('mongodb').ObjectID;
var db = require('../modules/db');
var cache = require('../modules/cache');
var feedback = require('../modules/feedback');

const getSurvey = (req, res) => {
    // Check cache
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();     
        else {
            const json = await db.getDocument('surveys')
            if(json){
                res.status(200).send(json);
            } 
            else{
                res.status(404).send();
            }
           
        } 
    });
};


const getData = (req, res) => {
    // Check cache
    cache.get(req.body.researcherEmail)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else res.status(200).send(await db.getDocument('answers') );       
    });
};

const removeData = (req, res) => {
    // Check cache
    cache.get(req.body.researcherEmail)
    .then(async result => {
        // Check if admin is in the cache
        if (typeof result === 'undefined') res.status(403).send();
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
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const surveys = await db.getDocument('surveys', {});
            if (surveys.length !== 0) db.deleteAllDocuments('surveys', {});
            db.insertDocument('surveys', JSON.parse(req.body.json));     
        }    
    });
    res.status(200).send();
};

const processData = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            var flag = false;
            const newSurvey = {
                user: req.body.email,
                timestamp: new Date(),
                data: req.body.answer
            };
           await db.insertDocument('answers', newSurvey).then(result => {feedback.differenciated(result, flag)})
        }
    });

    // Immediate Feedback
    feedback.immediate();
    
    res.status(200).send({immediateFeedback: 'Thank You!'});
};

const processImage = (req, res) => {
    /*cache.get(req.body.email)
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
    res.status(200).send();*/
};


const returnFeedback = (req, res) => {
    //if data is not available 
    if(false)
        res.status(400).send();
    //if data is available is sent
    else
        res.status(200).send();
};

exports.getSurvey = getSurvey;
exports.getData = getData;
exports.removeData= removeData;
exports.submitForm = submitForm;
exports.processData = processData;
exports.processImage = processImage;
exports.returnFeedback = returnFeedback;
