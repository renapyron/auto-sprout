'use strict';
const { CloudWatchEvents } = require('aws-sdk');
const sproutLib = require('./lib/sprout');

module.exports.run = async (event, context) => {
    console.info('Triggering logout handler at:', (new Date()).toUTCString());
    const logoutResult = await sproutLib.logout();
    console.info('logout result:', logoutResult.status, logoutResult.data);
};
