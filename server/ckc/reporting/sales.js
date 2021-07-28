/*
*
*/

//  DEFINE DEPENDENCIES
const Square      = require('../../square/square.js');
const Moment      = require('moment-timezone');

//  settings
Moment().tz("America/Los_Angeles").format();

//  DEFINE MODULE
var salesMod = {
    square: {
        pullDailyTx: PullDailySquareTxs
    },
    firebase: {

    }
};

//  DEFINE FUNCTIONS
//
async function PullDailySquareTxs(date) {
    //  NOTIFY PROGES

    //  error check
    if(date == undefined) date = new Date();

    //  DEFINE LOCAL VARIABLES
    var beginTime = Moment(new Date(date));
    var endTime = Moment(new Date(date));
    beginTime = beginTime.hour(0).minute(0).second(0);
    endTime = endTime.hour(23).minute(59).second(59);

    //  EXECUTE
    try {
        var paymentsList = await Square.payments.list(undefined, beginTime.format(), endTime.format());
        console.log(paymentsList.length);
        return paymentsList;
    } catch (error) {
        console.log('PullDailySquareTxs Error: ', error);
    }
};

//  EXPORT MODULE
module.exports = salesMod;