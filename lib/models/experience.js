'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Vendor'
  },
  userId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'User'
  },

  name: {
    type: String,
    required: true
  },

  time: {
    type: Date,
    required: true,
    // default: Date.now
  },

  howfast: {
    type: Number,
    required: true
  },

  calledAhead: {
    type: Boolean,
    required: true
  },

  cost: {
    type: Number
  },

  worthIt: {
    type: Number
  },

  advice: {
    type: String
  }
});

module.exports = mongoose.model('Experience', schema);
