'use strict';

const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router(); //eslint-disable-line
const Experience = require('../models/experience');

router
  .get('/', (req, res, next) => {
    Experience.find({})
    .select('name')
    .lean()
    .then(rawVendors => {
      return rawVendors.map(item => {
        return item.name;
      });
    })
    .then(vendors => {
      return vendors.filter((item, i) => {
        return vendors.indexOf(item) === i;
      });
    })
    .then(data => {
      console.log('vendors:', data);
      return Promise.all(
        data.map(vendor => {
          console.log('vendor:', vendor);
          return Experience.aggregate([
            { $match: { name: vendor } },
            { $group: { _id: '$name', howFast: { $avg: '$howFast' }, cost: { $avg: '$cost' }, worthIt: { $avg: '$worthIt' } } }
          ])
          .exec();
        })
      );
    })
      .then(d => {
        console.log('promise return:', d);
        res.send(d);
      })
    .catch(next);
  });

module.exports = router;