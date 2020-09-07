var db = require('../modules/db');
var cache = require('../modules/cache');

/* 
 * profileExtension
 * Description : Functions that extend the profile endpoints
 * should implement functions to get and edit the profile.
 */

// Get user profile from extension of Profile
const getProfile = (req, res) => {

};

// Request to edit user's profile from extension of Profile
const editProfileRequest = (req, res) => {
    
};

// Edit user's profile (submit changes) from extension of Profile
const editProfile = (req, res) => {


};

// Edit user's ranking 
const editProfileRanking = (req, res) => {
    // Check cache
    cache.get(req.body.email)
    .then(async result => {
    // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else{
            let previousRank=0;
            const user = await db.getDocument('users', { email: req.body.email }) 
            if (user[0].ranking) previousRank=user[0].ranking;
            await db.updateDocument('users', { email: req.body.email }, {ranking: (previousRank + req.body.ranking)}) 
            res.status(200).send();
        }     
    });
};

// Export funtions
exports.getProfile = getProfile;
exports.editProfileRequest = editProfileRequest;
exports.editProfile = editProfile;
exports.editProfileRanking = editProfileRanking;