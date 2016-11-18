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
  .put('/favorite', bodyParser, (req, res, next) => {
    let favUser;
    User.find({username: req.body.username})
      .then(user => {
        favUser = user[0]._id;
      })
      .then(() => {
        return User.findByIdAndUpdate(req.user.id,
        {$push: {favoriteUsers: favUser}}, 
        {new:true, upsert:true});
      })
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });

module.exports = router;