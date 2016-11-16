'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Experience = require('../models/experience');
const Community = require('../models/community');
const token = require('../auth/token'); //eslint-disable-line
const User = require('../models/user');

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
  .post('/join', bodyParser, (req, res, next) => {
    const {name} = req.body;
    console.log('request user', req.user);
    let communityId;
    Community.find({name})
    .then(commArr => {
      if(commArr.length === 0) throw {
        code: 400,
        error: `Community ${name} does not yet exist!`
      };
      console.log('community', commArr[0]._id);
      communityId = commArr[0]._id;
      console.log('community id', communityId);
      return User.findByIdAndUpdate(req.user.id, {communityId}, {new:true}); 
    })
    .then(user => {
      console.log('user', user);
      res.send({communityId});
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
  })

  .post
    ('/create', bodyParser, (req, res, next) => {
      const {name} = req.body;
      Community.find({name})
        .then(commArr => {
          if(commArr.length > 0) throw {
            code: 400,
            error: `Community ${name} already exists!`
          };
          const comm = new Community(req.body);
          let communityId;
          comm.save()
            .then(newComm => {
              console.log(newComm);
              communityId = newComm._id;
              return User.findByIdAndUpdate(req.user.id, {communityId}, {new:true});
            })
            .then(user => {
              console.log('user in community create', user);
              res.send({communityId});
            });
        })
        .catch(next);
    });

module.exports = router;