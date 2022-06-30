/*
*       BUILD DAILY EXHIBTIONS LIST
*
*   This can be run in several different formats.  
*   COMMAND LINE VALUES
*   -s: TRUE/FALSE will save the values to the database
*   -b: TRUE/FALSE will broadcast the results
*   -t: TRUE/FALSE will download values for current day
*   -y: TRUE/FALSE will download values for previous day (yesterday)
*/

//  DEFINE DEPENDENICES
const Moment        = require('moment-timezone');
const Reporting     = require('../ckc/reporting/sales');
const Square        = require('../square/square');
const Fs            = require('fs');
const argv          = require('minimist')(process.argv.slice(2));

//  COMMUNICATE ARGUMENTS
console.log('CL Arguments:' , argv);

/*
*   DAILY EXHIBTIONS REPORT
*/
async function dailyExhbtnsReport() {
    //  DEFINE LOCAL VARIABLES
    var refDate       = Moment(new Date());
    if(argv['y']) { refDate = refDate.subtract(1, 'days'); }
    
    //  1) DOWNLOAD LIST OF TRANSACTIONS
    const paymentsAssets    = await Reporting.dailyPayments(refDate);
    const exhibitsList      = paymentsAssets.exhibitsList;

    const ordersAssets      = await Reporting.dailyOrders(paymentsAssets);
    const bom               = ordersAssets.bom
    const financialsList    = ordersAssets.financialsList;

    //  2) ASSIGN PAYMENTS/ORDER PAIRS TO EXHIBITION LIST BY EMPLOYEE ID AND PRODDAY
    console.log(ordersAssets, 'ordersAssets');

    //  3) SAVE NEW EXHIBITIONS TO DB
}


//  EXECUTE
dailyExhbtnsReport();

