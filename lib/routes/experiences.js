'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Experience = require('../models/experience');
const User = require('../models/user');

router
  .get('/:username', (req, res, next) => {
    
    const usrName = req.params.username;
    User
      .find({username: usrName})
      // .populate('userId', 'usrName')
      // .lean()
      .sort([['_id', -1]])
      .then(user => {
        Experience.find({userId: user[0]._id})
        .populate('userId', 'username')
        .then(experiences => {
          experiences
            .sort([['_id', -1]])
            .forEach(item => {
              item.postedOn = item._id.getTimestamp();
            });
          res.send(experiences);
        });
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

  })  
  .put('/:id', bodyParser, (req, res, next) => {
    Experience.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(saved => res.send(saved))
      .catch(next);
      
  });

module.exports = router;
