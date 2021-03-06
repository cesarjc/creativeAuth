'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  phone: String,
  color: String,
  hashed_password: String
});

mongoose.model('User', UserSchema);
