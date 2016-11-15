'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema ({ //eslint-disable-line
  name: {type: String, required: true},
  // location: {type: String, required: true},
  experienceId: {type: Schema.Types.ObjectId, ref: 'experience'}
});

module.exports = mongoose.model('community', communitySchema);