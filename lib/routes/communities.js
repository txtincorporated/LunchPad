'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Community = require('../models/community');
// const token = require('../auth/token');
// const User = require('../models/user');

router
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