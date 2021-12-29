'use strict';
const { CloudWatchEvents } = require('aws-sdk');
const { logout, getSproutToken } = require('./lib/sprout');

module.exports.run = async (event, context) => {
  const { LOGOUT_EVT_NAME } = process.env;
  console.log('*****logout proc*****');
};
