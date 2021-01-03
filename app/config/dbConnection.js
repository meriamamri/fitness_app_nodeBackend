const mongoose = require('mongoose');
const dbConfig = require('./mongodb.config.js');

// Connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true}, null)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    },
    {useMongoClient: true}
);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Configuring the database
mongoose.Promise = global.Promise;
