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
        default:
            break;
    }

    //console.log('allDates: ', allDates);
    return allDates;
};

function _buildUpdates(channelId, seasonId, datesList, framework) {
    //  NOTIFY PROGRESS
    console.log('_buildUpdates', datesList);

    //  DEFINE LOCAL VARIABLES
    var allUpdates = {};

    //  EXECUTE
    datesList.forEach(function(engagment) {

        allUpdates[Firebase.pushId('Engagments')] = {
            channelId: channelId,
            seasonId: seasonId,
            date: engagment,
            opensAt: framework.openTime,
            closesAt: framework.closeTime,
            startsAt: framework.startTime,
            endsAt: framework.endTime
        };

    });

    //  RETURN
    return allUpdates;
};

//  PUBLIC FUNCITONS
function Add(channelId) {

};

async function AddBulk(channelId, seasonId, startDate, endDate, frequency, framework) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    var datesList = _buildEngagmentsList(startDate, endDate, frequency);
    var allUpdates = _buildUpdates(channelId, seasonId, datesList, framework);

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