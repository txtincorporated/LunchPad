'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Experience = require('../models/experience');

router
  .post('/', bodyParser, (req, res, next) => {
    console.log(req.headers);
    new Experience(req.body).save()
      .then(saved => res.send(saved))
      .catch(err => {
        console.log(err);
        console.log(req.headers);
        next();
      });
  });

module.exports = router;
