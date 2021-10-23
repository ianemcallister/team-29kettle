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
const name      = 'Woodstock';
const title     = 'Woodstock Farmers Market';
const options   = {
    contacts: {},
    address: {}
};

//  EXECUTE
ckcChannels.add(type, name, title, options);

//process.exit();