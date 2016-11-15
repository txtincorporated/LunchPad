'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Community = require('../models/community');
// const token = require('../auth/token');
// const User = require('../models/user');

router
  .get('/:communityId', (req, res, next) => {
    const comm = req.params.communityId;
    
    console.log('getting user community: ', comm);
    //logic to grab user's default community info on signup or signin and pass to page view
    Promise
      .all([

        Community
          .findById(comm)
          .lean(),
        
        Experience
          .find({vendorId})
          .populate({
            path: experienceIds
          })
      ])
      .then(([community, vendors]) => {
        community.vendors = vendors;
        res.send(community);
      })
      .catch(next);
    
  })
  .post('/', bodyParser, (req, res, next) => {
    console.log('inside community route: ', name, location);
    const comm = new Community(req.body);
    comm.save()
    .then(comm => {
      res.send(comm);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
  });

module.exports = router;