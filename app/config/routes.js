var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cors = require('cors');


const sign = require('app/routes/file.router');
const profile = require('app/routes/profile.router')
// routes
module.exports = function (app) {
    app.use('/api', jsonParser, cors(), sign);
    app.use('/api/user', jsonParser, cors(), profile);
};
