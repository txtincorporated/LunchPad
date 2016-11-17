'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
// const bodyParser = require('body-parser').json();
// const Experience = require('../models/experience');
// const Community = require('../models/community');
const token = require('../auth/token'); //eslint-disable-line
const User = require('../models/user');

router
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .select('communityId')
      .lean()
      .then(commId => res.send(commId))
      .catch(next);

  });