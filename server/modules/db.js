var mongodb = require('mongodb');

// Object with db credentials
const db = {
    url: 'mongodb://127.0.0.1:27017/crowdsourcing',
    name: 'crowdsourcing'
};

// Load collection
var loadCollection = async (collection) => {
    // Create connection
    const client = await mongodb.MongoClient.connect
        (db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    // Return 'collection' passed as arg
    return client.db(db.name).collection(collection);
}

exports.loadCollection = loadCollection;