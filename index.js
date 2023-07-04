'use strict';

require('dotenv').config();
const {start} = require('./src/server');
const PORT = process.env.PORT || 5000

start(PORT)