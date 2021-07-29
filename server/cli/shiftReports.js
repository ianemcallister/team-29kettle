/*
*   CLI: SHIFT REPORTS
*
*   Frequency: DAILY
*   Function: Runs every early morning, processing the previos day's sales for a feedback.
*/

//  DEFINE DEPENDENCIES
const ckcSales = require('../ckc/reporting/sales');

//  DEFINE LOCAL VARIABLES
ckcSales.reportDailySales();