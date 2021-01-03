const mongoose = require('mongoose');
var User = require('../models/Compte.js');
const Schema = mongoose.Schema;

const ProfileSchema = mongoose.Schema({
    phone: {
        type: String,
        required: false
    },
    dateOfBirthday: {
        type: Date,
        required: false
    },
    adress: {
        type: String,
        require: false
    },
    weight: {
        type: String,
        require: false
    },
    height: {
        type: String,
        require: false
    },
    _user: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }]
});
module.exports = mongoose.model('profile', ProfileSchema);