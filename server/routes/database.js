/*
*   DATABASE ROUTES MODULE
*/

module.exports = (function() {
    'use strict';
    //  DEFINE DEPENDENCIES
    var db              = require('express').Router();
    const Firebase      = require('../firebase/firebase.js');

    //  DEFINE LOCAL FUNCTIONS
    async function queryChannelEngagments(channelId) {
        console.log('running channel query');
        //  DEFINE LOCAL VARIABLES
        var path = 'Engagments';
        var query = {
            orderBy: "channelId",
            value: channelId
        };

        //  DEFINE LOCAL METHODS
        try {
            var result = await Firebase.query(path, query);
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            //console.log('got this back:', result);
            return result
            
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async function queryWeeklyEngagments(wk) {
        console.log('running weekly query');
        //  DEFINE LOCAL VARIABLES
        var path = 'Engagments';
        var query = {
            orderBy: "wk",
            value: wk
        };

        //  DEFINE LOCAL METHODS
        try {
            var result = await Firebase.query(path, query);
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            //console.log('got this back:', result);
            return result
            
        } catch (error) {
            console.log("error: ", error);
        }
    }

    //	GET: /engagments
    db.get('/engagments', async function(req, res) {
        //  NOTIFY PROGRESS
        console.log(req.query);

        //  EXECUTE REQUEST
        try {
            var result = "";
            if(req.query.channelId != undefined) {
                result = await queryChannelEngagments(req.query.channelId);
            } else if (req.query.wk != undefined) {
                result = await queryWeeklyEngagments(req.query.wk);
            } else {

            }
            
            res.status(200);
            res.send(result);
        } catch (error) {
            console.log("error: ", error);
        }
        
    });

    return db;
})();