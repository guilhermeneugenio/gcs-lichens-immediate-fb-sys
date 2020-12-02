// Set admin credentials
const admin = [
    {
        email: 'admin',
        password: '616d2a76ce744eb777e15569cdc93528'
    }
];

// Database credentials
const db = {
    url: 'mongodb://127.0.0.1:27017/crowdsourcing',
   name: 'crowdsourcing'
};

const distance = 30;

//Database credentials
const db = {
    url: 'mongodb://127.0.0.1:27017/GCS-LIF',
    name: 'GCS-LIF'
};*/


// Set cache timeout
const userTimeout = 3600;

// Exports
exports.admin = admin;
exports.db = db;
exports.distance = distance;
exports.userTimeout = userTimeout;
