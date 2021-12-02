'use strict';

const { CloudWatchEvents } = require('aws-sdk');

module.exports.run = async (event, context) => {
  const { LOGOUT_EVT_NAME } = process.env;
  const time = new Date();
  const payload = event;
  const cloudWatchEvents = new CloudWatchEvents();


  // getHours() 0-23
  let logoutHourOfDay = time.getHours() + Math.floor(Number(payload.hours));
  const logoutNextDay = logoutHourOfDay > 23;
  if (logoutNextDay) {
    logoutHourOfDay = logoutHourOfDay % 23;
  }


  // random + 1 - 30 mins.
  const logoutMinsOfDay = Math.min(
    59,
    time.getMinutes() + Math.floor(Math.random() * (30 - 1) + 1)
  );

  const logoutScheduleExpr =
    `cron(0 ${logoutMinsOfDay} ${logoutHourOfDay} ${time.getDate()} ${time.getMonth() + 1} ? ${time.getFullYear()})`;

  if (!payload.hours) {
    throw new Error('hours payload not found.');
  }

  console.info('put', process.env);
  const updatedRule = await cloudWatchEvents.putRule(
    {
      Name: LOGOUT_EVT_NAME,
      ScheduleExpression: logoutScheduleExpr,
    }
  ).promise();

  console.info('put', updatedRule);


  console.log(`Your cron function "${context.functionName}" ran at ${time}. Hours before auto logout: ${payload.hours}`);
};
