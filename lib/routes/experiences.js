'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Experience = require('../models/experience');

router
  .get('/', (req, res, next) => {
    Experience
      .find({})
      .populate({
        path: 'communityId',
        select: 'name'
      })
      .lean()
      .then(experiences => {
        res.send(experiences);
      })
      .catch(next);
  })
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
