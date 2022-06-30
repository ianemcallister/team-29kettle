/*
*
*/

//  DEFINE DEPENDENCIES
const Square      = require('../../square/square.js');
const Firebase    = require('../../firebase/firebase.js');
const Moment      = require('moment-timezone');
const Handlebars  = require("handlebars");
const Mail        = require('../../mailCenter/mailCenter.js');
const Fs          = require('fs');
const Path        = require('path');

//  DEFINE MODULE
var salesMod = {
    square: {
        pullDailyTx:            PullDailySquareTxs
    },
    firebase: {
        pullDailyAssignments:   PullDailyAssignemnts
    },
    assignTxs: AssignTxs,
    buildSalesReport: BuildSalesReport,
    reportDailySales: ReportDailySales,
    dailyPayments: dailyPayments,
    dailyOrders: dailyOrders
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

    if(newAssignments == 0) {
        console.log('_addTxAssignments: no transactions to assign at this time.');
    } else {
        console.log('_addTxAssignments writing new transaction assignments');
        Firebase.update('ShiftTxs', newAssignments);
    }
    

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

function _newShiftReport(date, empoyeeId, start, end) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    var readpath                = Path.resolve(__dirname, '../../models/shiftReportTemplate.json');
    var newShiftReport          = JSON.parse(Fs.readFileSync(readpath, 'utf8'));
    newShiftReport.date         = date;
    newShiftReport.employeeId   = empoyeeId;
    newShiftReport.start        = start;
    newShiftReport.end          = end;

    //  EXECUTE
    //  RETURN
    return newShiftReport;
};

function _buildDailySalesReports(assigments, txs) {
    //  NOTIFY PROGRESS
    console.log('_buildDailySalesReports');
    //  DEFINE LOCAL VARIABLES
    var allReports = [];
    var i = 0;

    //  EXECUTE
    //  1.  ITERATE OVER ASSIGMENTS
    Object.keys(assigments).forEach(function(key) {

        //  ADD REPORT STRUCTURES
        allReports.push(_newShiftReport(assigments[key].date, assigments[key].employeeId, assigments[key].start, assigments[key].end));

        //  DEFINE LOCAL VARIABLES
        var shiftStart  = Moment(assigments[key].start);
        var shiftEnd  = Moment(assigments[key].end);


        //  ITERATE OVER SALES
        txs.forEach(function (tx) {
            
            //  is this the right employee
            if(tx.employeeId == allReports[i].employeeId) {

                //  is this transaction between the shift start and end?
                if(Moment(tx.createdAt).isBetween(shiftStart, shiftEnd)) {

                    //  IF SO ADD THE VALUES
                    allReports[i].total_sales   ++;
                    allReports[i].gross_sales   += parseInt(tx.amountMoney.amount);
                    allReports[i].average_sale  = allReports[i].gross_sales / allReports[i].total_sales;

                    if(tx.tipMoney != undefined) {
                        allReports[i].tips      += parseInt(tx.tipMoney.amount);
                    }
                    

                } else {

                }

            } else {
                
            }
            //  is this the right times
        });

        //  INCRIMENT COUNTER
        i++;
    });

    //  RETURN
    return allReports;
};

async function _distributeSalesReports(allReports) {
    //  NOTIFY PROGRESS
    console.log('_distributeSalesReports', allReports);
    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {

        //  1. ITERATE OVER REPORTS
        for (const report of allReports) {

            //  COLLECT THE RECIPIANTS
            var recipiants   = await _collectEmployeeRecipients(report.employeeId)

            //  SEND THE EMAIL
            var info = await _buildShiftReportEmails(report, recipiants);

        }
       

    } catch (error) {
        console.log('_distributeSalesReports Error', error);
    }
    
};

async function _collectEmployeeRecipients(employeeId) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VERIABLES
    var allEmails = ['ian@29kettle.com', 'lexie@29kettle.com'];
     
    //  EXECUTE
    try {
        
        var employeeRecord = await Square.team.team.retrieve(employeeId);
        
        console.log('_collectEmployeeRecipients', employeeRecord.teamMember.emailAddress);
        
        //  ADD EMAIL
        allEmails.push(employeeRecord.teamMember.emailAddress);
        
        return allEmails;
    } catch (error) {
        console.log('_collectEmployeeRecipients Error:', error);
    }
    //  RETURN 
};

async function _buildShiftReportEmails(report, emails) {
    //  NOTIFY PROGRESS
    console.log('_buildShiftReportEmails', report, emails);

    //  DEFINE LOCAL VARIABLES
    var emailSubject        = "29 Kettle Daily Shift Recap: " + Moment(report.date).format('LL')
    var readpath            = Path.resolve(__dirname, '../../templates/shiftReportEmail.htm');
    var shiftEmailTemplate  = Fs.readFileSync(readpath, 'utf8');
    const emailTemplate     = Handlebars.compile(shiftEmailTemplate); 

    Handlebars.registerHelper('readableDate', function(aDate) {
        var dateString = Moment(aDate).format('LL');
        return new Handlebars.SafeString(dateString)
    });

    Handlebars.registerHelper('readableDollars', function(value) {
        var dollarValueString = "$" + (value / 100).toFixed(2);
        return new Handlebars.SafeString(dollarValueString)
    });

    Handlebars.registerHelper('averageSale', function(value, sales) {
        var averageValue = value / sales;
        var averageString = "$" + (averageValue / 100).toFixed(2);
        return new Handlebars.SafeString(averageString)
    });


    const sendOptions = {
        from:       'info@ah-nuts.com',
        to:         emails,
        subject:    emailSubject,
        html:       emailTemplate(report)
    };

    //  EXECUTE
    try {
        await Mail.send(sendOptions);
    } catch (error) {
        console.log('_buildShiftReportEmails Error', error );
    }

};

//  DEFINE PUBLIC FUNCTIONS

async function PullDailyAssignemnts(date) {
    //  NOTIFY PROGRESS
    console.log('PullDailyAssignemnts', date);

    //  error check
    if(date == undefined) {
        console.log('PullDailyAssignemnts using today\'s date');
        date = Moment(new Date()).tz("America/Los_Angeles");
    } else {
        
        date = Moment(date).tz("America/Los_Angeles");
        if(process.env.NODE_ENV == 'production') date.add(1, 'days');
        console.log('PullDailyAssignemnts using ' + date.tz("America/Los_Angeles").format("YYYY-MM-DD"));
    }

    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {
        var assignmentsList = await Firebase.query('ShiftTxs', {orderBy: "date", value: date.tz("America/Los_Angeles").format("YYYY-MM-DD")});
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
    var beginTime   = Moment(date).tz("America/Los_Angeles").hour(0).minute(0).second(0);
    var endTime     = Moment(date).tz("America/Los_Angeles").hour(23).minute(59).second(59);
    if(process.env.NODE_ENV == 'production') {
        //beginTime.add(1, 'days');
        //endTime.add(1, 'days');
    }

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

async function ReportDailySales() {
    //  NOTIFY PROGRESS
    console.log('ReportDailySales');
    //  DEFINE LOCAL VARIABLES
    var today = Moment(new Date()).tz("America/Los_Angeles");
    var yesterday = Moment(today.subtract(1, "days")).tz("America/Los_Angeles");

    try {
        //  EXECUTE
        //  1.  Collect all of the previous day's assigments
        var yesterdaysAssigments    = await PullDailyAssignemnts(yesterday.format('YYYY-MM-DD'));

        //  2.  Pull previous day's transactions
        var yesterdaysTxs           = await PullDailySquareTxs(yesterday.format('YYYY-MM-DD')); 

        //  2.  Process those assigments into reports
        var allReports              = _buildDailySalesReports(yesterdaysAssigments, yesterdaysTxs);

        //  3.  Distribute those reports
        await _distributeSalesReports(allReports);

        //  END
        setTimeout(process.exit(), (20*1000));

        
    } catch (error) {
        console.log('ReportDailySales Error: ', error);
    }
};

function _paymentsToExhibitsList(rawPayments) {
    //  DEFINE LOCAL VARIABLES
    var exhibitsList = {};
    const exhibitData = {
        id: "",
        data: "",
        employeeId: ""
    };
    
    //  ITERATE OVER RAW PAYMENTS
    rawPayments.forEach(function PaymentsParser(aPayment) {

        const employeeId = aPayment.employeeId;
        const paymentId = aPayment.id;

        //  If the list hasn't been created yet, create it
        if(exhibitsList[employeeId] == undefined) {
            exhibitsList[employeeId] = Object.create(exhibitData);
        };

        //  UPDATE PERTINENT INFO
        exhibitsList[employeeId].employeeId = employeeId;
        exhibitsList[employeeId].date = Moment(aPayment.createdAt).tz("America/Los_Angeles").format('YYYY-MM-DD');
        
        if(exhibitsList[employeeId]['txs'] == undefined) {
            exhibitsList[employeeId]['txs'] = {};
        }
        exhibitsList[employeeId].txs[paymentId] = aPayment.orderId
       
    });

    return exhibitsList;
};

function _paymentsToFinancialsList(rawPayments) {
    //  DEFINE LOCAL VARIABLS
    var financialsList = {};
    const financialData = {
        employee:   "",
        gross:      0,
        discounts:  0,
        net:        0,
        tips:       0,
        cash:       0,
        credit:     0,
        other:      0,
        fees:       0,
        sales:      0
    };

    //  ITERATE OVER THE LIST
    rawPayments.forEach(function PaymentsParser(aPayment) {

        //console.log(aPayment);

        const employeeId = aPayment.employeeId;

        if(financialsList[employeeId] == undefined) {
            financialsList[employeeId] = Object.create(financialData);
        };

        financialsList[employeeId].employee = employeeId;

        //  INCRIMENT COUNTER
        financialsList[employeeId].sales++;

        //  RECORD NET & FEES
        financialsList[employeeId].net  += Number(aPayment.amountMoney.amount);

        if(aPayment.processingFee != undefined) {
           
            financialsList[employeeId].fees += Number(aPayment.processingFee[0].amountMoney.amount);
        }

        //  tips
        if(aPayment.tipMoney != undefined) {
            financialsList[employeeId].tips  += Number(aPayment.tipMoney.amount);
        }

        //  payment type
        switch(aPayment.sourceType) {
            case 'CARD':
                financialsList[employeeId].credit   += Number(aPayment.amountMoney.amount);
                break;
            case 'CASH':
                financialsList[employeeId].cash     += Number(aPayment.amountMoney.amount);
                break;
            default:
                financialsList[employeeId].other    += Number(aPayment.amountMoney.amount);
                break;
        }
        
    });


    return financialsList;
}

async function dailyPayments(date) {
    //  DEFINE LOCAL VARIABLES
    var paymentsAssets = {
        exhibitsList: {},
        financialsList: {}
    };
    var startMmt    = date.set('hour', 0).set('minute', 0).set('second', 0);
    var start       = startMmt.tz("America/Los_Angeles").format();
    var endMmt      = date.set('hour', 23).set('minute', 59).set('second', 59)
    var end         = endMmt.tz("America/Los_Angeles").format();

    //  COMMUNICATE
    console.log('daily:', date, start, end);

    try{
        //  1) Download Payments
        const rawPayments = await Square.payments.list(undefined, start, end);
        
        //  2) Parse exhibits list
        paymentsAssets.exhibitsList = _paymentsToExhibitsList(rawPayments);

        //  3) Parse finacials List
        paymentsAssets.financialsList = _paymentsToFinancialsList(rawPayments);

        //  4) Return object
        return paymentsAssets;

    } catch (error) {
        console.log('Daily Error:', error);
    }
 };

 /*
 *  PRIVATE: PARSE ORDERS LIST BATCH
 */
 function _parseOrdersListBatch(paymentOrderPairList) {
    //  DEFINE LOCAL VARIABLS
    const ordersList = [];

    Object.keys(paymentOrderPairList).forEach(function (paymentId) {
        ordersList.push(paymentOrderPairList[paymentId]);
    });

    return ordersList;
 };


 /*
 *  DAILY ODERS 
 */
 async function dailyOrders(paymentsAssets) {
    //  DEFINE LOCAL VARIABLES
    const returnObject = {
        bom: {},
        financialsList: paymentsAssets.financialsList
    };
    const aBom = {
        units:      0,
        pints:      0,
        hpints:     0,
        platters:   0
    };
    const bomsPromiseList = [];

    //  ITERATE OVER EXHIBIT LISTS TO PULL OUT LISTS OF ORDERS
    Object.keys(paymentsAssets.exhibitsList).forEach(function ExhibitParser(employeeId) {

        bomsPromiseList.push(Square.orders.batch('RKNMKQF48TA6W', _parseOrdersListBatch(paymentsAssets.exhibitsList[employeeId].txs)));

    });


    //  EXECUTE ASYNC WORK
    try {   
        //  DEFINE LOCAL COUNTER
        var counter = 0;

        //  COLLECT RESPECTIVE ORDERS FOR EACH EXHIBIT
        const rawOrdersCollections = await Promise.all(bomsPromiseList);

        //  ITERATE OVER EXHIBITS LIST AGAIN
        Object.keys(paymentsAssets.exhibitsList).forEach(function ExhibitParser(employeeId) {

            //  CREATE THE BOM OBJECT
            returnObject.bom[employeeId] = Object.create(aBom);

            //  ITERATE OVER ORDERS WITHIN AN EMPLOYEE COLLECTIONS
            rawOrdersCollections[counter].orders.forEach(function (anOrder) {

                //  ITERATE OVER ITEMS IN AN ORDER
                anOrder.lineItems.forEach(function (anItem) {

                    //console.log(anItem);

                    //  increase the units count
                    returnObject.bom[employeeId].units += Number(anItem.quantity);

                    switch(anItem.catalogObjectId) {
                        case "OWAWZJAYYFIS47JSRBMRZNML": // 8oz Mixed Gourmet Glazed Nuts Pint
                            returnObject.bom[employeeId].pints += Number(anItem.quantity);
                            break;
                        case "2YUXFSYE73C4AEKA5AXYWSNN": // 4oz Mixed Gourmet Glazed Nuts Half Pint
                            returnObject.bom[employeeId].hpints += Number(anItem.quantity);
                            break;
                        case "":
                            break;
                        default:
                            break; 
                    };

                    returnObject.financialsList[employeeId].gross       += Number(anItem.grossSalesMoney.amount);

                    if(typeof anItem.totalDiscountMoney.amount == 'bigint') {
                        
                        returnObject.financialsList[employeeId].discounts   += Number(anItem.totalDiscountMoney.amount);
                    }
                    
                    
                });

            });

            counter++; 
        });

        return returnObject;

    } catch(error) {
        console.log('Daily Orders:', error);
    };

 };

//  EXPORT MODULE
module.exports = salesMod;