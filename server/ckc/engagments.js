/*
*   Engagments Module
*
*   
*/

//  DEFINE DEPENDENCIES
const Firebase    = require('../firebase/firebase.js');
const Moment      = require('moment-timezone');
const Fs          = require('fs');
const Path        = require('path');

//  DEFINE MODULE
var engagmentsMod = {
    add: Add,
    addBulk: AddBulk
};

function _sanitizeWeekday(date) {
    var dateMoment = Moment(date);
    var returnValue = 0;
    if(dateMoment.day() == 0) { returnValue = 6 } else { returnValue = dateMoment.day() - 1 }
    return returnValue;
}

function _buildEngagmentsList(startDate, endDate, frequency) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLS
    var allDates    = [];
    var starts      = Moment(new Date(startDate + "T17:00:00-07:00"));
    var ends        = Moment(new Date(endDate + "T17:00:00-07:00"));
    var cursor      = starts;

    //  EXECUTE
    //allDates.push(starts.format('YYYY-MM-DD'));

    //  find additional dates
    switch(frequency) {
        case 'weekly': 
            
            while(cursor.isSameOrBefore(ends)) {

                //  ADD THE VALUE
                allDates.push(cursor.format('YYYY-MM-DD'));

                //  INCRIMENT THE COUNTER
                cursor = cursor.add(7, 'd');
            }
            
            break;
        case 'bi-weekly':
            while(cursor.isSameOrBefore(ends)) {

                //  ADD THE VALUE
                allDates.push(cursor.format('YYYY-MM-DD'));

                //  INCRIMENT THE COUNTER
                cursor = cursor.add(14, 'd');
            }           
            break;
        default:
            break;
    }

    //console.log('allDates: ', allDates);
    return allDates;
};

function _buildUpdates(channelId, channel, datesList, framework) {
    //  NOTIFY PROGRESS
    console.log('_buildUpdates', datesList);

    //  DEFINE LOCAL VARIABLES
    var allUpdates = {};

    //  EXECUTE
    datesList.forEach(function(engagment) {

        allUpdates[Firebase.pushId('Engagments')] = {
            channelId: channelId,
            channel: channel,
            date: engagment,
            opensAt: framework.openTime,
            closesAt: framework.closeTime,
            d: parseInt(_sanitizeWeekday(engagment)),
            wk: parseInt(Moment(engagment).isoWeek("Monday").week()),
            yr: parseInt(Moment(engagment).format("YY"))
        };

    });

    //  RETURN
    return allUpdates;
};

//  PUBLIC FUNCITONS
function Add(channelId) {

};

async function AddBulk(channelId, channel, startDate, endDate, frequency, framework) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    var datesList = _buildEngagmentsList(startDate, endDate, frequency);
    var allUpdates = _buildUpdates(channelId, channel, datesList, framework);

    //  EXECUTE
    try {
        //  2. Save
        await Firebase.update('Engagments', allUpdates);

    } catch (error) {
        console.log('AddBulk Error:', error);
    }
    

    //  RETURN
};

//  EXPORT MODULE
module.exports = engagmentsMod;