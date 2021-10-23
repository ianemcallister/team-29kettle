/*
*   CLI: ADD ENGEGMENTS
*
*   Frequency: 
*   Function: 
*/

//  DEFINE DEPENDENCIES
const ckcEngagments = require('../ckc/engagments');

//  DEFINE LOCAL VARIABLES
const channelId = '-MXIPxc6E4UqWKSwRoE4'; 
const channel   = 'Hillsdale'                  
const startDate = '2022-01-09';                       //  first date for this season that this event occures
const endDate   = '2022-01-20';                       //  last date for this season that this event occures
const frequency = 'bi-weekly';                           //  daily, weekly, monthly, quartelry, yearly
const framework = {
    "type":         "consistent",                     //  consistent or varries
    "openTime":     "09:00:00-07:00",                 //  when does the market open to customers
    "closeTime":    "13:00:00-07:00",                 //  when does the market close to customers
}

//  EXECUTE
ckcEngagments.addBulk(channelId, channel, startDate, endDate, frequency, framework);