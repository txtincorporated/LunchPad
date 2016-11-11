'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema ({ //eslint-disable-line
  name: {type: String, required: true},
  Address: {type: String},
  experienceId: {type: Schema.Types.ObjectId, ref: 'experience'},
  cuisine: {type: String}

});

module.exports = mongoose.model('vendor', vendorSchema);


