'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

const handleError = (error, res) => {
  console.error(error);
  res.sendStatus(500);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.post('/message', (req, res) => {
  db.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => handleError(error, res));
});

app.get('/message', (req, res) => {
  db.read(req.query)
    .then((messages) => res.json(messages))
    .catch((error) => handleError(error, res));
});

app.delete('/message', (req, res) => {
  db.del(req.query)
    .then(() => res.sendStatus(200))
    .catch((error) => handleError(error, res));
});

