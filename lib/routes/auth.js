'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const User = require('../models/user');
const Community = require('../models/community');

router
  .post('/signup', bodyParser, (req, res, next) => {
    const { username, password, community } = req.body; //eslint-disable-line
    delete req.body.password;

    if(!username || !password || !community) {
      return next({
        code: 400,
        error: 'username, password, and community required'
      });
    }

    Community.find({ name: community })
      .then(comm => {
        console.log('Inside the signup route: community', comm);
        if (comm.length === 0) {
          const newComm = new Community({name: community});
          return newComm.save();
        } else {
          return comm[0];
        }
      })
      .then(community => {
        User.find({ username })
          .count()
          .then(count => {
            if(count > 0) throw {
              code: 400,
              error: `username ${username} already exists`
            };
            console.log(req.body);
            req.body.communityId = community._id;
            const user = new User(req.body);
            user.generateHash(password);
            return user.save();
          })
          .then(user => token.sign(user))
          .then(token => res.send({ token }))
          .catch(next);
      })
      .catch(next);
  })


  .post('/signin', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;

    User.findOne({ username })
      .then(user => {
        if (!user || !user.compareHash(password)) {
          throw({
            code: 400,
            error: 'Invalid username or password.'
          });
        }
        return token.sign(user);
      })
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router;