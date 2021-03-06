'use strict';
const { CloudWatchEvents } = require('aws-sdk');
const sproutLib = require('./lib/sprout');

module.exports.run = async (event, context) => {
  const { LOGOUT_EVT_NAME } = process.env;
  const time = new Date();
  const payload = event;
  const cloudWatchEvents = new CloudWatchEvents();
  const tomorrow = new Date();
  let loginResult = '';

  tomorrow.setDate(tomorrow.getDate() + 1);

  if (!payload.hours) {
    throw new Error('hours payload not found.');
  }
  const hoursInputNum = Number(payload.hours);
  const logoutTest = !!payload.logoutTest;

  
  if (hoursInputNum > 10.5) {
    throw new Error('hours cannot exceed 10.5.');
  }


  // getHours() 0-23
  console.info('payload', payload);
  let logoutHourOfDay = time.getHours() + Math.floor(hoursInputNum);
  const logoutNextDay = logoutHourOfDay > 23;
  let logoutDateTime = time;
  if (logoutNextDay) {
    logoutHourOfDay = logoutHourOfDay % 23;
    logoutDateTime = tomorrow;
  }

  // support logoutTest mode, immediately trigget logout after 1 min.
  
  const logoutMinsOfDay = logoutTest ?
    time.getMinutes() + 2 :
    // random + 1 - 30 mins., cannot exceed 59 mins.
    Math.min(59, time.getMinutes() + Math.floor(Math.random() * (30 - 1) + 1));

  const logoutScheduleExpr =
    `cron(${logoutMinsOfDay} ${logoutHourOfDay} ${logoutDateTime.getDate()} ${logoutDateTime.getMonth() + 1} ? ${logoutDateTime.getFullYear()})`;

  console.info('logoutScheduleExpr', logoutScheduleExpr);

  const updatedRule = await cloudWatchEvents.putRule(
    {
      Name: LOGOUT_EVT_NAME,
      ScheduleExpression: logoutScheduleExpr,
    }
  ).promise();

  console.log('put', updatedRule);


  console.info(`Your cron function "${context.functionName}" ran at ${time}. Hours before auto logout: ${payload.hours}`);


  loginResult = await sproutLib.login();
  console.info('sprout login result:', loginResult.status, loginResult.data);
  if (loginResult.data && loginResult.data.isSuccess !== true) {
    throw new Error('Sprout login failure');
  }


};
