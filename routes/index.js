'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    res.render('index', { username: req.session.username, msg: req.session.msg, color: req.session.color });
  } else {
    req.session.msg = 'Access denied!';
    res.redirect('/login');
  }
});

router.get('/user', (req, res) => {
  if (req.session.user) {
    res.render('user', { msg: req.session.msg });
  } else {
    req.session.msg = 'Access denied!';
    res.redirect('/login');
  }
});

router.get('/signup', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }

  res.render('signup', { msg: req.session.msg });
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }

  res.render('login', { msg: req.session.msg });
});

router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));

module.exports = router;
