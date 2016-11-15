'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Community = require('../models/community');
const token = require('../auth/token'); //eslint-disable-line
const User = require('../models/user');

router
  .post('/', bodyParser, (req, res, next) => {
    const {name} = req.body; //eslint-disable-line
    console.log('request user', req.user);
    let communityId;
    Community.find({name})
    .then(commArr => {
      console.log('community', commArr[0]._id);
      communityId = commArr[0]._id;
      console.log('community id', communityId);
      return User.findByIdAndUpdate(req.user.id, {communityId}, {new:true});

      
    })
    .then(user => {
      console.log('user', user);
      res.send({communityId});
    })
    // const comm = new Community(req.body);
    // comm.save()
    // .then(comm => {
    //   res.send(comm);
    // })
    .catch(err => {
      console.log(err);
      next(err);
    });
  });

module.exports = router;