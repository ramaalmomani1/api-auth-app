'use strict';

/// require('dotenv').config();
const express = require('express')
const cors =require('cors')
const app = express();
app.use(cors())

const pageNotFound = require('./errorhandler/404');
const serverError = require('./errorhandler/500');
const logger = require('./middleware/logger')
//  const PORT = process.env.PORT


// app.use(logger);

app.use('*', pageNotFound);
app.use(serverError);



function start(port){
 app.listen(port , ()=> console.log(`up and running on port: ${port}`))
} 

module.exports = {
  app,
  start
}