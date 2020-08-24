var db = require('../modules/db');
var cache = require('../modules/cache');


const getProfile = async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else res.status(200).send(await db.getDocument('users', { email: req.body.email }) );       
    });
};
const editProfile = async (req, res) => {
    // Check cache
   cache.get(req.body.email)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else{
            await db.updateDocument('users', { email: req.body.email }, {base64: req.body.base64, name: req.body.name }) 
            res.status(200).send();
        }     
    });

};


exports.getProfile = getProfile;
exports.editProfile = editProfile;
