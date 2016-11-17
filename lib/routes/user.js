'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
  .put('/favorite', bodyParser, (req, res, next) => {
    let favUser; //eslint-disable-line
    console.log('make sure theres a user id', req.user.id);
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
