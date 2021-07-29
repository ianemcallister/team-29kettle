/*
*   Channels Module
*
*   
*/

//  DEFINE DEPENDENCIES
const Firebase    = require('../firebase/firebase.js');
const Moment      = require('moment-timezone');
const Fs          = require('fs');
const Path        = require('path');

//  DEFINE MODULE
var channelsMod = {
    add: Add
};

async function Add(type, name, title, options) {
    //  NOTIFY PROGRESS
    //  DEFINE LOCAL VARIABLES
    const readpath      = Path.resolve(__dirname, '../models/channelTemplate.json');
    const newRecord     = JSON.parse(Fs.readFileSync(readpath, 'utf8'));
    newRecord.type      = type;
    newRecord.name      = name;
    newRecord.title     = title;
    
    //  EXECUTE
    try {
        const recordId = await Firebase.push('Channels', newRecord);

        //  RETURN
        return recordId;

    } catch (error) {
        console.log('Add Error', error);
    }
    
};

//  EXPORT MODULE
module.exports = channelsMod;