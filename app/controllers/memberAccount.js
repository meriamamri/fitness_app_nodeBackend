const bcrypt = require('bcryptjs');
const User = require("../models/Compte");
const jwt = require('jsonwebtoken');
const smtpTransport = require('../config/configEmail');
//import crypto from ('crypto');

exports.registerMember = async (req, res, next) => {
  if (await User.findOne({ email: req.body.email })) {
    return res.status(400).send('Email "' + req.body.email + '"is already taken');
  }

  if (await User.findOne({ userName: req.body.userName })) {
    return res.status(400).send('UserName "' + req.body.userName + '"is already taken');
  }
  if (req.body.password != req.body.confirmPassword) {
    return res.status(400).send('is not conform to your password');
  }
  var newCompte = new User(req.body);
  newCompte.password = bcrypt.hashSync(req.body.password, 10);
  newCompte.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.password = undefined;
      return res.json(user);
    }
  });

}

exports.sign_in = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    const token = jwt.sign(
      { userId: user._id },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' });
    res.status(200).json({
      userId: user._id,
      token: token
    });
  });
};

exports.updatePassword = async (req, res, next) => {
  // Validate Request
  if (!req.body._id) {
    return res.status(400).send({
      message: "Account can not be empty"
    });
  }

  if (req.body.password != req.body.confirmPassword) {
    return res.status(400).send('The confirm pasword is not conform to your password');
  }

  // Find note and update it with the request body
  await User.findByIdAndUpdate(req.body._id, {
    password: bcrypt.hashSync(req.body.password, 10), confirmPassword: req.body.confirmPassword
  }, { new: true })
    .then(account => {
      if (!account) {
        return res.status(404).send({
          message: "account not found with id " + req.body._id
        });
      }
      res.send(account);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "account not found with id " + req.body._id
        });
      }
      return res.status(500).send({
        message: "Error updating account with id " + req.body._id
      });
    });
};

/*******   fUNCTION OF SENDING MAIL FOR ACCOUNT'S FORGOT PASSWORD  *********/
var rand, mailOptions, host, link;

function sendMailVerification(req, userParam) {

  // send mail 

  //const token = crypto.randomBytes(20).toString('hex');
  //console.log(token);
  //user
  rand = Math.floor((Math.random() * 100) + 54);
  host = req.get('host');
  link = "http://" + req.get('host') + "/updatePassword/:id" + rand;
  mailOptions = {
    to: userParam.email,
    subject: "Forgot Password",
    html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here </a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      response.send("error");
    } else {
      console.log("Message sent: " + response.message);
      response.send("sent");
    }
  });
}

exports.sendPasswordResetEmail = async (req, res) => {

  const { email } = req.params

  let user

  try {

    user = await User.findOne({ email }).exec()

  } catch (err) {

    res.status(404).json("No user with that email")

  }
  sendMailVerification(req, req.body);
}
