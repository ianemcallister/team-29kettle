/*
*   DOWNLOAD ALL SQUARE PAYMENTS
*
*   This module is designed to pull all the back log of square taransactions into our database so that they can be assigned.
*
*/

//  DECALRE DEPENDENCIES
const Moment        = require('moment-timezone');
const Square        = require('../square/square');
const Firebase      = require('../firebase/firebase.js');

var startDate   = Moment('2021-10-04T00:00:00-07:00');
var endDate     = Moment('2021-10-10T23:59:59-07:00');
var startCursor = startDate;
var endCursor   = Moment(startDate).add(7, 'd').subtract(1,'s');

function _assignTeamMember(employeeId) {
    var returnValue = '';

    if(employeeId != undefined) { returnValue = employeeId }

    return returnValue;
}

function _deserializePaymentValues(paymentRecord) {

    function replacer(key, value) {
    // Filtering out properties
    if (typeof value === 'bigint') {
        return parseInt(value);
    }
    return value;
    }
    
    //console.log('paymentRecord: ', typeof paymentRecord, paymentRecord);
    var jsonString = JSON.stringify(paymentRecord, replacer);
    return JSON.parse(jsonString);
};


async function xfrTxs(startCursor, endCursor) {
    //  DEFINE LOCAL VARIABLES
    var updatePath = 'FundsCollected'
    var updateObject = {};

    try {
        //  1. DOWNLOAD A WEEK'S WORTH OF TRANSACTIONS
        var allPayments = await Square.payments.list(undefined, startCursor.format(), endCursor.format())

        //  2. PROCESS THE DATA TO FIT OUR SCHEMA
        if(allPayments != undefined) {

            //iterate over list
            allPayments.forEach(function(payment) {

                var deSerializedPayment = _deserializePaymentValues(payment);

                //console.log(deSerializedPayment);
                
                // copy over the square base data, using the id as the object key
                updateObject[payment.id] = deSerializedPayment
                
                //console.log(payment.id);

                //  then layer on our information
                updateObject[payment.id]['collectedBy'] = {
                    "teamMemberId": _assignTeamMember(payment.employeeId),
                    "teamMemberName": "",
                    "deviceId": "",
                    "deviceName": ""
                };
                updateObject[payment.id]['collectedAt'] = {
                    "engagmentId": "",
                    "channelId": ""
                };
                updateObject[payment.id]['refDate'] = Moment.tz(payment.createdAt, "America/Los_Angeles").format("YYYY-MM-DD");
                updateObject[payment.id]['salesReportId'] = "";

            });

            //console.log(updateObject);

            //  3. WRITE THE DATE TO OUR DATABASE
            Firebase.update(updatePath, updateObject);
            
        }

    } catch (error) {
        console.log('error: ', error);
    }
}

async function updateDatabase() {

    //  4. REPEAT UNTIL REACHING THE END
    while (endCursor.isSameOrBefore(endDate)) {

        //  NOTIFY PROGRESS
        console.log(startCursor.format('YY-MM-DD'), endCursor.format('YY-MM-DD'))
        
        xfrTxs(startCursor, endCursor);
    
        //  INCRIMENT
        startCursor = Moment(endCursor).add(1, 's');
        endCursor.add(7,'d');
    
    }

}

updateDatabase();

