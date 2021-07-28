/*
*   CLI: ASSIGN SALES
*
*   Frequency: Hourly
*   Function: Ensure that all sales transactions are being identified for assignment
*/

//  DEFINE DEPENDENCIES
const ckcSales = require('../ckc/reporting/sales');

//  DEFINE LOCAL VARIABLES
ckcSales.assignTxs();