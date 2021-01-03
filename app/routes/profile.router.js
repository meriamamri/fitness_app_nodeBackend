const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/Profile.controller');
const auth = require("../config/auth");

router.post('/profile/:id', profileCtrl.create);
router.get('/oneProfile/:id', profileCtrl.findOne);
module.exports = router;