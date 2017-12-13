'use strict';

const mongoose = require('mongoose');

const Message = mongoose.model('Message', mongoose.Schema({ from: String, message: String, to: String }));
const create = (messageInfo) => new Message(messageInfo).save();
const del = (query) => Message.remove(query).exec();

const read = (query) => new Promise((resolve, reject) => {
  const recievedMessagesQuery = { from: query.to, to: query.from };
  Message.find({ $or: [query, recievedMessagesQuery] }, (error, messages) => error ? reject(error) : resolve(messages));
});

module.exports = { create, read, del };
