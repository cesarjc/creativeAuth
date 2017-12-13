'use strict';

const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');

router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);

module.exports = router;
