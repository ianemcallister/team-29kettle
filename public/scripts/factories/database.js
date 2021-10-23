/*
*	ADMIN SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Database', Database);

//  DEPENDENCY INJECTION
Database.$inject = ['$q', '$http'];

//  DECLARE THE SERVICE
/* @ngInject */
function Database($q, $http) {
    
    //  DEFINE METHODS
    var dbMod = {
        get: {
            channelEngagments: GetChannelEngagments,
            weeklyEngagments: GetWeeklyEngagments,
            dailyEngagments: GetDailyEngagments,
            dailyCollections: GetDailyCollections
        }
    };

    /*
    *
    */
    function GetChannelEngagments(channelId) {
        //  NOTIFY PROGRESS
        console.log('GetChannelEngagments: ', channelId);
        //  LOCAL VARIABLES
        var def = $q.defer();

        $http({
            method: 'GET',
            url: '/db/engagments?channelId=' + channelId
        }).then(function successCallback(response) {
            //console.log('got this response');
            //console.log(response.data);
            def.resolve(response.data);
        }, function errorCallback(error) {
            console.log('Error: ', error);
        });

        return def.promise;
    };

    function GetWeeklyEngagments(wk) {
        //  NOTIFY PROGRESS
        console.log('GetWeeklyEngagments: ', wk);
        //  LOCAL VARIABLES
        var def = $q.defer();

        $http({
            method: 'GET',
            url: '/db/engagments?wk=' + wk
        }).then(function successCallback(response) {
            //console.log('got this response');
            //console.log(response.data);
            def.resolve(response.data);
        }, function errorCallback(error) {
            console.log('Error: ', error);
        });

        return def.promise;
    };

    function GetDailyEngagments(date) {
        //  NOTIFY PROGRESS
        console.log('GetDailyEngagments: ', date);
        //  LOCAL VARIABLES
        var def = $q.defer();

        $http({
            method: 'GET',
            url: '/db/engagments?date=' + date
        }).then(function successCallback(response) {
            //console.log('got this response');
            //console.log(response.data);
            def.resolve(response.data);
        }, function errorCallback(error) {
            console.log('Error: ', error);
        });

        return def.promise;
    }

    function GetDailyCollections(date) {
        //  NOTIFY PROGRESS
        console.log('GetDailyCollections: ', date);
        //  LOCAL VARIABLES
        var def = $q.defer();

        $http({
            method: 'GET',
            url: '/db/collections?date=' + date
        }).then(function successCallback(response) {
            //console.log('got this response');
            //console.log(response.data);
            def.resolve(response.data);
        }, function errorCallback(error) {
            console.log('Error: ', error);
        });

        return def.promise;
       
    }


    //   RETURN
    return dbMod;
};