'use strict';

const express = require('express');
const app = express();
const auth = require('./routes/auth');
// const ensureAuth = require('./auth/ensure-auth')();
// const ensureRole = require('/auth/ensure-role');
const errorHandler = require('./error-handler');
// const communities = require('./routes/communities')
// const users = require('./routes/users')
// const experiences = require('./routes/experiences')
// const vendors = require('./routes/vendors')

app.use('/lunch/auth', auth);
app.use(errorHandler);

module.exports = app;
