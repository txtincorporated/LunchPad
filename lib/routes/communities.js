'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
// const Community = require('../models/community');
// const User = require('../models/user');
const Experience = require('../models/experience');
// const token = require('../auth/token');
// const User = require('../models/user');

router
  .get('/:id', (req, res, next) => {
    console.log('req.params.id', req.params.id);
    // const communityId = req.params.id;
 
    Experience
      .find({communityId: req.params.id})
      .select('vendorId')
      .populate() //ADD DESIRED FIELDS TO EXPERIENCE MODEL AND POPULATE TO THOSE FROM VENDOR
      .then((experiences) => {
        console.log('experiences: ', experiences);
        // console.log('experiences: ', experiences);
        
        // community.experiences = experiences;
        res.send(experiences);
      })
      .catch(next);
    
  })
  .post('/', bodyParser, (req, res, next) => {
    // console.log('inside community route: ', name, location);
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