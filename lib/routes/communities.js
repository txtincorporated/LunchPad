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

    Experience
      .find({communityId: req.params.id})
      .limit(25)
      .sort([['_id', -1]])
      .then((experiences) => {
        res.send(experiences);
      })
      .catch(next);
    
  })

  .post('/join', bodyParser, (req, res, next) => {
    const {name} = req.body;
    let communityId;
    Community.find({name})
    .then(commArr => {
      if(commArr.length === 0) throw {
        code: 400,
        error: `Community ${name} does not yet exist!`
      };
      communityId = commArr[0]._id;
      return User.findByIdAndUpdate(req.user.id, {communityId}, {new:true}); 
    })
    .then(user => { //eslint-disable-line
      // console.log('user', user);
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
              communityId = newComm._id;
              return User.findByIdAndUpdate(req.user.id, {communityId}, {new:true});
            })
            .then(user => { //eslint-disable-line
              res.send({communityId});
            });
        })
        .catch(next);
    });

module.exports = router;