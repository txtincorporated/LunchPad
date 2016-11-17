'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Experience = require('../models/experience');
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    Experience
      .find({})
      .populate({
        path: 'communityId',//NPK: this needs to be abstracted so that userId can be passed instead when fetching for user view
        select: 'name'
      })
      .lean()
      .then(experiences => {
        res.send(experiences);
      })
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    req.body.userId = req.user.id;
    User.findById(req.user.id)
      .then(user => {
        req.body.communityId = user.communityId;

      })
      .then(() => {
        new Experience(req.body).save()
          .then(saved => res.send(saved));
      })
      .catch(next);

  });

module.exports = router;
