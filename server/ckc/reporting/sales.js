/*
*
*/

//  DEFINE DEPENDENCIES
const Square      = require('../../square/square.js');
const Firebase    = require('../../firebase/firebase.js');
const Moment      = require('moment-timezone');
const Fs          = require('fs');
const Path        = require('path');

//  settings
Moment().tz("America/Los_Angeles").format();

//  DEFINE MODULE
var salesMod = {
    square: {
        pullDailyTx:            PullDailySquareTxs
    },
    firebase: {
        pullDailyAssignments:   PullDailyAssignemnts
    },
    assignTxs: AssignTxs
};

//  DEFINE PRIVATE FUNCTIONS
function _identifyNewAssignments(dailyAssignments, paymentsList) {
    //  NOTIFY PROGRESS
    console.log('_identifyNewAssignments', dailyAssignments);

    //  DEFINE LOCAL VARIABLES
    var employeesHash           = {};
    var newAssignments          = {};
    var readpath                = Path.resolve(__dirname, '../../models/txsAssignment.json');
    var newAssignmentsTemplate  = JSON.parse(Fs.readFileSync(readpath, 'utf8'));

    //  build employee id hash
    if(dailyAssignments != null) {
        Object.keys(dailyAssignments).forEach(function(key) {
            var employeeId = dailyAssignments[key].employeeId;

            if(employeeId != null) {
                employeesHash[employeeId] = true;
            };

        });
    };

    //  check for valid payments list
    if(paymentsList != undefined && paymentsList != null) {

        //  Iterate over payments list
        paymentsList.forEach(function(tx) {
            var employeeId = tx.employeeId;

            //  is this employee accounted for yet?
            console.log(employeeId, employeesHash[employeeId]);

            if(employeeId != undefined) {

                if(employeesHash[employeeId] == undefined) {
                    var pushId                          = Firebase.pushId('TxsAssignments');
                    newAssignments[pushId]              = newAssignmentsTemplate;
                    newAssignments[pushId].date         = Moment(new Date(tx.createdAt)).format("YYYY-MM-DD");
                    newAssignments[pushId].employeeId   = employeeId;
                    newAssignments[pushId].end          = Moment(new Date(tx.createdAt)).hour(23).minute(59).second(59).format();
                    newAssignments[pushId].start        = Moment(new Date(tx.createdAt)).hour(0).minute(0).second(0).format();
                    //  ADD THIS EMPLOYEE TO THE HASH
                    employeesHash[employeeId]           = true
                }

            };
        });
    }


    return newAssignments;
};

function _addTxAssignments(newAssignments) {
    //  NOTIFY PROGRESS
    console.log('_addTxAssignments', newAssignments);
    return 1;
};

//  DEFINE PUBLIC FUNCTIONS

async function PullDailyAssignemnts(date) {
    //  NOTIFY PROGRESS
    console.log('PullDailyAssignemnts', date);

    //  error check
    if(date == undefined) date = Moment(new Date());

    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {
        var assignmentsList = await Firebase.query('TxsAssignments', {orderBy: "date", value: date.format("YYYY-MM-DD")});
        return assignmentsList;
    } catch (error) {
        console.log('PullDailyAssignemnts Error: ', error);
    }
};

async function PullDailySquareTxs(date) {
    //  NOTIFY PROGES
    console.log('PullDailySquareTxs', date);
    //  error check
    if(date == undefined) date = new Date();

    //  DEFINE LOCAL VARIABLES
    var beginTime   = Moment(new Date(date));
    var endTime     = Moment(new Date(date));
    beginTime       = beginTime.hour(0).minute(0).second(0);
    endTime         = endTime.hour(23).minute(59).second(59);

    //  EXECUTE
    try {
        var paymentsList = await Square.payments.list(undefined, beginTime.format(), endTime.format());
        //console.log(paymentsList.length);
        return paymentsList;
    } catch (error) {
        console.log('PullDailySquareTxs Error: ', error);
    }
};

/*
*   Assign Transactions
*/
async function AssignTxs() {
    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {

        //  1. Pull day's assignments from firebase
        var dailyAssignments    = await PullDailyAssignemnts();

        //  2. Pull day's txs from square
        var paymentsList        = await PullDailySquareTxs();

        //  3. Make sure all team members' are accounted for
        var newAssignments      = _identifyNewAssignments(dailyAssignments, paymentsList);

        //  4. Update assignments records in firebase
        _addTxAssignments(newAssignments);  

        process.exit();

    } catch (error) {
        console.log('AssignTxs Error: ', error);
    }
};

//  EXPORT MODULE
module.exports = salesMod;