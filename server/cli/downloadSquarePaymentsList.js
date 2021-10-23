

const Moment      = require('moment-timezone');
const Square        = require('../square/square');

let beginTime = '2021-08-25T00:00:00-07:00'
let endTime = '2021-08-25T23:59:59-07:00'

async function collectPayments(beginTime, endTime) {
    try {
        var payments = await Square.payments.list(undefined, beginTime, endTime);
    
        console.log(payments);
    } catch (error) {
        console.log('error:', error);
    }
}

collectPayments(beginTime, endTime);