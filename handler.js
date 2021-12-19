'use strict';
const { CloudWatchEvents } = require('aws-sdk');

module.exports.run = async (event, context) => {
  const { LOGOUT_EVT_NAME } = process.env;
  const time = new Date();
  const payload = event;
  const cloudWatchEvents = new CloudWatchEvents();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (!payload.hours) {
    throw new Error('hours payload not found.');
  }
  const hoursInputNum = Number(payload.hours);

  /*
  if (hoursInputNum > 10.5) {
    throw new Error('hours cannot exceed 10.5.');
  } */


  // getHours() 0-23
  console.info('payload', payload);
  let logoutHourOfDay = time.getHours() + Math.floor(hoursInputNum);
  const logoutNextDay = logoutHourOfDay > 23;
  let logoutDateTime = time;
  if (logoutNextDay) {
    logoutHourOfDay = logoutHourOfDay % 23;
    logoutDateTime = tomorrow;
  }

  // random + 1 - 30 mins., cannot exceed 59 mins.
  const logoutMinsOfDay = Math.min(
    59,
    time.getMinutes() + Math.floor(Math.random() * (30 - 1) + 1)
  );

  const logoutScheduleExpr =
    `cron(${logoutMinsOfDay} ${logoutHourOfDay} ${logoutDateTime.getDate()} ${logoutDateTime.getMonth() + 1} ? ${logoutDateTime.getFullYear()})`;

  console.info('process.env', process.env);
  console.info('logoutScheduleExpr', logoutScheduleExpr);

  const updatedRule = await cloudWatchEvents.putRule(
    {
      Name: LOGOUT_EVT_NAME,
      ScheduleExpression: logoutScheduleExpr,
    }
  ).promise();

  console.info('put', updatedRule);


  console.log(`Your cron function "${context.functionName}" ran at ${time}. Hours before auto logout: ${payload.hours}`);
};
