/*
*   IMPORT SQUARE TEAM DATA
*
*   This module is designed to keep the team profile information from square accurate in our firebase database.
*/

//  DEFINE DEPENDNENCIES
const Moment      = require('moment-timezone');
const Square      = require('../square/square');
const Firebase    = require('../firebase/firebase.js');

//  NOTIFY PROGRESS

//  DEFINE LOCAL VARIABLES

//  DEFINE LOCAL FUNCTIONS
function _sanitizeSquareProfiles(squareProfiles) {
    //  NOTIFY PROGRESS
    //console.log(squareProfiles);
    console.log('sanitizing ' + Object.keys(squareProfiles).length + " profiles");
    

    //  DEFINE LOCAL VARIABLES
    var returnObject = {};

    //  ITERATE OVER PROFILES
    squareProfiles.forEach(function(profile) {
        var profileId = profile.id;
        returnObject[profileId] = profile;
    });

    return returnObject;
};

async function updateFirebaseTeamProfiles(squareProfiles) {
    //  DEFINE LOCAL VARIABLES
    var updatePath = "Members";

    //  EXECUTE
    try {
        var firebaseProfiles = _sanitizeSquareProfiles(squareProfiles.employees);
        var status = await Firebase.update(updatePath, firebaseProfiles);
        return status;

    } catch (error) {
        console.log('updateFirebaseTeamProfiles error:', error);
    }
}

async function collectSquareTeamProfiles() {
    //  DEFINE LOCAL VARIABLES

    //  EXECUTE
    try {
        var squareTeamList = await Square.team.employees.list();
        var status = await updateFirebaseTeamProfiles(squareTeamList);
        return status;
    } catch (error) {
        console.log('error:', error);
    }
    
};

async function runImport() {
    try {
        var status = await collectSquareTeamProfiles();
        //process.exit();
    } catch (error) {
        console.log("runImport error:", error);
    }
}

//  EXECUTE
runImport();

//  1. Download team member profiles from square
//  2. Update our records with this information
