/*
*   DATABASE ROUTES MODULE
*/

module.exports = (function() {
    'use strict';
    //  DEFINE DEPENDENCIES
    var db              = require('express').Router();
    const Firebase      = require('../firebase/firebase.js');

    //  DEFINE LOCAL FUNCTIONS
    async function queryEngagments(channelId) {
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

    //	GET: /engagments
    db.get('/engagments', async function(req, res) {
        //  NOTIFY PROGRESS
        console.log(req.query);

        //  EXECUTE REQUEST
        try {
            var result = await queryEngagments(req.query.channelId);
            res.status(200);
            res.send(result);
        } catch (error) {
            console.log("error: ", error);
        }
        
    });

    return db;
})();