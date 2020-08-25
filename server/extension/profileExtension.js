var db = require('../modules/db');
var cache = require('../modules/cache');

/* 
 * profileExtension
 * Description : Functions that extend the profile endpoints
 * should implement functions to get and edit the profile.
 */

// Get user profile
const getProfile = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else res.status(200).send(await db.getDocument('users', { email: req.body.email }) );       
    });
};

// Request to edit user's profile form
const editProfileRequest = (req, res) => {
    
};

// Edit user's profile (submit changes)
const editProfile = (req, res) => {
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

// Export funtions
exports.getProfile = getProfile;
exports.editProfileRequest = editProfileRequest;
exports.editProfile = editProfile;