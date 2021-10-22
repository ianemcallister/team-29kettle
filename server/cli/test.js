

const Moment      = require('moment-timezone');

let createdAt   = '2021-07-28T23:59:59-07:00';
let a           = Moment.tz(createdAt, "America/Los_Angeles");

console.log('got this', a.utc().format());