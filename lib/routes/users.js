'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
// const Experience = require('../models/experience');
// const Community = require('../models/community');
const token = require('../auth/token'); //eslint-disable-line
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .select('communityId')
      .lean()
      .then(commId => res.send(commId))
      .catch(next);
  })

  .get('/id/:name', (req, res, next) => {
    User
      .find({ username: req.params.name })
      .select('communityId')
      .lean()
      .then(commId => {
        res.send(commId[0].communityId);
      })
      .catch(next);
  })

  .put('/favorite', bodyParser, (req, res, next) => {
    let favUser; //eslint-disable-line
    User.find({username: req.body.username})
      .then(user => {
        favUser = user[0]._id;
      })
      .then(() => {
        return User.findById(req.user.id);
      })
      .then(user => {
        user.favoriteUsers.push(favUser);
        res.send(user);
      })
      .catch(next);
  });

module.exports = router;