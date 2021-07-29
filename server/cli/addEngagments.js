/*
*   CLI: ADD ENGEGMENTS
*
*   Frequency: 
*   Function: 
*/

//  DEFINE DEPENDENCIES
const ckcEngagments = require('../ckc/engagments');

//  DEFINE LOCAL VARIABLES
const channelId = '-Mfkdfssp7siAmHBntyz';
const seasonId  = '';                   
const startDate = '2021-06-02';                       //  first date for this season that this event occures
const endDate   = '2021-08-25';                       //  last date for this season that this event occures
const frequency = 'weekly';                           //  daily, weekly, monthly, quartelry, yearly
const framework = {
    "type":         "consistent",                     //  consistent or varries
    "openTime":     "16:00:00-07:00",                 //  when does the market open to customers
    "closeTime":    "20:00:00-07:00",                 //  when does the market close to customers
    "startTime":    "15:00:00-07:00",                 //  when does the BA arrive?
    "endTime":      "21:00:00-07:00"                  //  when does the BA depart
}

//  EXECUTE
ckcEngagments.addBulk(channelId, seasonId, startDate, endDate, frequency, framework);