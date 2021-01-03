const express = require('express');
const router = express.Router();
const signCtrl = require('../controllers/memberAccount');


router.post('/newMember', signCtrl.registerMember);
router.post('/signin', signCtrl.sign_in);
router.post('/updatepassword/:id', signCtrl.updatePassword);
router.post('/forgotPassword', signCtrl.sendPasswordResetEmail)
module.exports = router;
