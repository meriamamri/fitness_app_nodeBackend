var Profile = require('../models/Profile.model');
const User = require("../models/Compte");

exports.create = (req, res) => {

    const profile = new Profile({
        phone: req.body.phone,
        dateOfBirthday: req.body.dateOfBirthday,
        adress: req.body.adress,
        weight: req.body.weight,
        height: req.body.height,
        _user: req.params.id
    });

    // Save Meta in the database
    profile.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the  Profile."
            });
        });
};

exports.update = (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, {
        phone: req.body.phone,
        dateOfBirthday: req.body.dateOfBirthday,
        adress: req.body.adress,
        weight: req.body.weight,
        height: req.body.height
    }, { new: true })
        .then(Profile => {
            if (!Profile) {
                return res.status(404).send({
                    message: " Boisson not found with id " + req.params.id
                });
            }
            User.findByIdAndUpdate(Profile._user, {
                userName: req.body.userName,
                email: req.body.email
            }, { new: true })
                .then(user => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found with id " + Profile._user
                        });
                    }

                    res.send({
                        Profile: Profile,
                        User: user
                    });

                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "boisson not found with id " + req.params.id
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating boisson with id " + req.params.id
                    });
                });
        });
};

exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: " Profile found with id " + req.params.id
            });            
        }
        else{
            //_id = req.params.id; 
            res.send(User);
        }


    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profile not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Profile with id " + req.params.id
        });
    });
};

