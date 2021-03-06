var ObjectId = require('mongodb').ObjectID;

var db = require('../modules/db');
var cache = require('../modules/cache');


const getData = async (req, res) => {
    // Check cache
    cache.get(req.body.email)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else res.status(200).send(await db.getDocument('diffFeedback2') );       
    });
};

exports.getData = getData;