'use strict';

const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router(); //eslint-disable-line
const Experience = require('../models/experience');

const aggData = [];
router
  .get('/', (req, res, next) => {
    Experience.find({})
    .then(data => {
      data.forEach(vendor => {
        Experience.aggregate([
          { $match: { name: vendor.name } },
          { $group: { _id: '$time', speed: { $avg: '$howFast' }, cost: { $avg: '$cost' }, worthIt: { $avg: '$worthIt' } } }
        ])
        .exec()
        .then(agg => {
          aggData.push(agg);
          // console.log('aggregated data:', agg);
        });
      });
      // res.send(aggData);

    })
    .then(() => {
      console.log('agged', aggData);
    })
    .catch(next);
  });

module.exports = router;