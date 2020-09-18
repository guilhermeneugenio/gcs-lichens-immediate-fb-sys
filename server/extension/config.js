// Set admin credentials
const admin = [
    {
        email: 'admin',
        password: 'admin'
    }
];

// Database credentials
const db = {
    url: 'mongodb://127.0.0.1:27017/crowdsourcing',
    name: 'crowdsourcing'
};


// Set cache timeout
const userTimeout = 3600;

// Exports
exports.admin = admin;
exports.db = db;
exports.userTimeout = userTimeout;