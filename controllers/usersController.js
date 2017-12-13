'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const hashPW = (pwd) => crypto.createHash('sha256').update(pwd).digest('base64').toString();

const signup = (req, res) => {
  const user = new User({ username: req.body.username });
  user.set('hashed_password', hashPW(req.body.password));
  user.set('phone', req.body.phone);
  user.save()
    .then(() => {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = `Authenticated as ${user.username}`;
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.session.error = err;
      res.redirect('/signup');
    });
};

const login = (req, res) => {
  User.findOne({ username: req.body.username }).exec()
    .then((user) => {
      if (!user) {
        throw new Error('User Not Found.');
      } else if (user.hashed_password === hashPW(req.body.password.toString())) {
        req.session.regenerate(() => {
          req.session.user = user.id;
          req.session.username = user.username;
          req.session.msg = `Authenticated as ${user.username}`;
          req.session.color = user.color;
          res.redirect('/');
        });
      } else {
        throw new Error('Authentication Failed.');
      }
    })
    .catch((err) => {
      req.session.regenerate(() => {
        req.session.msg = err.message;
        res.redirect('/login');
      });
    });
};

const getUserProfile = (req, res) => {
  User.findOne({ _id: req.session.user }).exec()
    .then((user) => (user) ? res.json(user) : Promise.reject(new Error('User Not Found.')))
    .catch((err) => res.json(404, { err }));
};

const updateUser = (req, res) => {
  User.findOne({ _id: req.session.user }).exec()
    .then((user) => {
      user.set('phone', req.body.phone);
      user.set('color', req.body.color);
      return user.save();
    })
    .then(() => req.session.msg = 'User Updated.')
    .then(() => req.session.color = req.body.color)
    .catch((err) => res.sessor.error = err)
    .then(() => res.redirect('/user'))
    .catch(console.error);
};

const deleteUser = (req, res) => {
  User.findOne({ _id: req.session.user }).exec()
    .then((user) => user ? user.remove() : Promise.reject(new Error('User Not Found!')))
    .catch((err) => req.session.msg = err.message)
    .then(() => req.session.destroy(() => res.redirect('/login')))
    .catch(console.error);
};

module.exports = { signup, login, getUserProfile, updateUser, deleteUser };
