/*
*   CLI: ADD ENGEGMENTS
*
*   Frequency: 
*   Function: 
*/

//  DEFINE DEPENDENCIES
const ckcChannels = require('../ckc/channels');

//  DEFINE LOCAL VARIABLES
const type      = 'farmers_market';
const name      = 'Salem Saturday';
const title     = 'Salem Saturday Farmers Market';
const options   = {
    contacts: {},
    address: {}
};

//  EXECUTE
ckcChannels.add(type, name, title, options);

//process.exit();