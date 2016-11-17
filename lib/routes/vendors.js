'use strict';

const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router(); //eslint-disable-line
const Experience = require('../models/experience');

router
  .get('/', (req, res, next) => {
    Experience.aggregate([
      { $match: { name: 'mod pizza' } },
      { $group: { _id: '$time',speed: { $avg: '$howFast' }, cost: { $avg: '$cost' }, worthIt: { $avg: '$worthIt' } } }
    ])
    // {explain: true})
  .exec()
  .then(response => {
    console.log(response);
    res.send(response);
  })
  .catch(next);
  });

module.exports = router;