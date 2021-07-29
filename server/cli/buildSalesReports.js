/*
*   CLI: BUILD SALES REPORTS
*
*   Frequency: EVERY TEN MINUTES
*   Function: Recording sales numbers
*
*   Algorithm:
*   1. Pull all the transaction assigments for the current day (TxsAssignments)
*   2. Pull all the transactions for the current day (from square)
*   3. Build an object of report records to update by grabbing the sales_report_id from the transactions assigments [i.e. {-Mfk4itl5qZIt69v98lj: {}, -Mfk4itnKsVMu5I0ebEo: {} }]
*   4. Iterate over each transaction
*       - issolate all transactions assigment records with the same empoyeeId as the transaction itself
*       - iterate over the issolated transactions assigment records, confirm the createAt date/time falles between the beginning and end identified on the transactions assigments record
*       - if the time doesmn't match the first record, check subsequent records until a match is found
*       - if no match is found add to an undefined report for the given day
*   5. Once the transaction is associated with a reportId record, transfer the sales and manufacturing data to the report
*
*
*
*/

//  DEFINE DEPENDENCIES
const ckcSales = require('../ckc/reporting/sales');

ckcSales.buildSalesReport();