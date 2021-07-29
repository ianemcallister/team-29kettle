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
    assignTxs: AssignTxs,
    buildSalesReport: BuildSalesReport
};

function _buildEmployeeHash(dailyAssignments) {
    //  DEFINE LOCAL VARIABLES
    var employeesHash = {};

    //  is assignments empty?
    if(dailyAssignments == null) {
        //  NOTIFY PROGRES
        console.log('no dailyAssignments yet');
    } else {
        //  NOTIFY PROGRESS
        console.log('_buildEmployeeHash found daily assignments');

        //  iterate over daily assignments
        Object.keys(dailyAssignments).forEach(function(key) {
            var employeeId = dailyAssignments[key].employeeId;

            if(employeeId != null) {
                employeesHash[employeeId] = true;
            };
        });
    }

    console.log('employee Hash: ', employeesHash);
    return employeesHash;
};

function _buildAssignmentRecord(employeeId, createdAt) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    var readpath            = Path.resolve(__dirname, '../../models/txsAssignment.json');
    var newAssigmentModel   = JSON.parse(Fs.readFileSync(readpath, 'utf8'));

    newAssigmentModel.date          = Moment(new Date(createdAt)).tz("America/Los_Angeles").format("YYYY-MM-DD");
    newAssigmentModel.employeeId    = employeeId;
    newAssigmentModel.start         = Moment(new Date(createdAt)).tz("America/Los_Angeles").hour(0).minute(0).second(0).format();
    newAssigmentModel.end           = Moment(new Date(createdAt)).tz("America/Los_Angeles").hour(23).minute(59).second(59).format();  

    //  RETURN
    return newAssigmentModel;

};

function _assignNewAssigments(employeesHash, paymentsList) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    var newAssignments = {};

    //  EXECUTE
    
    // ITERATE OVER THE PAYMENTS LIST
    paymentsList.forEach(function(tx) {

        //  MAKE SURE THERE IS A GOOD EMPLOYEE ID
        if (tx.employeeId == undefined) {
            // NOTIFY PROGRESS
            console.log('_assignNewAssigments found no employee Id');
        } else {
            //  NOTIFY PROGRESS
            console.log('_assignNewAssigments found employeeId: ', tx.employeeId);

            //  IS THIS EMPLOYEE ID IN THE HASH ALREADY?
            if(employeesHash[tx.employeeId] == undefined) {
                //  NOTIFY PROGRESS
                console.log(tx.employeeId, "is not in the employees Hash, creating the records");

                //  DEFINE LOCAL VARIABLES
                var pushId                      = Firebase.pushId('ShiftTxs');
                newAssignments[pushId]          = _buildAssignmentRecord(tx.employeeId, tx.createdAt);

               // ADD THE EMPLOYEE ID TO THE HASH
                employeesHash[tx.employeeId]    = true;

            } else {
                //  NOTIFY PROGRESS
                console.log(tx.employeeId, "is already in the employees Hash, moving on");
            };

        };

    });

    //  RETURN
    return newAssignments;

}

function _buildNewAssigments(employeesHash, paymentsList) {
    //  NOTIFY PROGRESS

    //  CHECK FOR PAYMENTS RECORDS
    if(paymentsList == undefined || paymentsList == null) {
        //  NOTIFY PROGRESS
        console.log('_buildNewAssigments found no payments');
        
        //  RETURN 
        return 0;

    } else {
        //  NOTIFY PROGRESS
        console.log('_buildNewAssigments processing payment records');

        //  DEFINE LOCAL VARIABLES
        var newAssignments = _assignNewAssigments(employeesHash, paymentsList);

        //  RETURN 
        return newAssignments;
    };

}

//  DEFINE PRIVATE FUNCTIONS
function _identifyNewAssignments(dailyAssignments, paymentsList) {
    //  NOTIFY PROGRESS
    console.log('_identifyNewAssignments', dailyAssignments);

    //  DEFINE LOCAL VARIABLES
    var employeesHash           = _buildEmployeeHash(dailyAssignments);
    var newAssignments          = _buildNewAssigments(employeesHash, paymentsList);

    return newAssignments;
};

function _addTxAssignments(newAssignments) {
    //  NOTIFY PROGRESS
    //console.log('_addTxAssignments', newAssignments);

    Firebase.update('ShiftTxs', newAssignments);

    //  RETURN
    return 0;
};

function _identifyUpdateObjects(dailyAssignments) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    var updatesObject = {};

    //  EXECUTE
    Object.keys(dailyAssignments).forEach(function(key) {

        //  MAKE SURE A VALID SALES REPORT ID IS PRESENT
        if(dailyAssignments[key].sales_report_id != "" && dailyAssignments[key].sales_report_id != undefined) {

        } else {
            //  IF IT ISN'T 
        }
    });

    //  RETURN
    return updatesObject;
};

function _assignSalesReportValues(updateObjects, paymentsList) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    //  RETURN
};

function _buildSalesReportsUpdates(dailyAssignments, paymentsList) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    //  1. Identify the records to update
    var updateObjects   = _identifyUpdateObjects(dailyAssignments);

    //  2. Assign Update Values
    var updateValues    = _assignSalesReportValues(updateObjects, paymentsList);

    //  RETURN
    return updateValues;
};

function _saveSalesReportsUpdates(recordUpdates) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    //  EXECUTE
    Firebase.update('SalesReports', recordUpdates);

    //  RETURN
    return 0;
};

//  DEFINE PUBLIC FUNCTIONS

async function PullDailyAssignemnts(date) {
    //  NOTIFY PROGRESS
    console.log('PullDailyAssignemnts', date);

    //  error check
    if(date == undefined) date = Moment(new Date()).tz("America/Los_Angeles");

    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {
        var assignmentsList = await Firebase.query('ShiftTxs', {orderBy: "date", value: date.format("YYYY-MM-DD")});
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
    var beginTime   = Moment(new Date(date)).tz("America/Los_Angeles");
    var endTime     = Moment(new Date(date)).tz("America/Los_Angeles");
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

async function BuildSalesReport() {
    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {

        //  1. Pull day's assignments from firebase
        var dailyAssignments    = await PullDailyAssignemnts();

        //  2. Pull day's txs from square
        var paymentsList        = await PullDailySquareTxs();

        //  3. Build Update Records
        var recordUpdates       = _buildSalesReportsUpdates(dailyAssignments, paymentsList);

        //  4. Save updates
        _saveSalesReportsUpdates(recordUpdates);

        //  END
        process.exit();

    } catch (error) {
        console.log('BuildSalesReport Error: ', error);
    }
};

//  EXPORT MODULE
module.exports = salesMod;