'use strict';

const express = require('express');
const db = require('../db');
const router = express.Router();

const handleError = (error, res) => {
  console.error(error);
  res.sendStatus(500);
};

router.post('/message', (req, res) => {
  db.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => handleError(error, res));
});

router.get('/message', (req, res) => {
  db.read(req.query)
    .then((messages) => res.json(messages))
    .catch((error) => handleError(error, res));
});

router.delete('/message', (req, res) => {
  db.del(req.query)
    .then(() => res.sendStatus(200))
    .catch((error) => handleError(error, res));
});

module.exports = router;