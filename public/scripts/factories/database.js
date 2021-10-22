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
            channelEngagments: GetChannelEngagments
        }
    };

    /*
    *
    */
    function GetChannelEngagments(channelId) {
        //  NOTIFY PROGRESS
        //console.log('GetChannelEngagments: ', channelId);
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


    //   RETURN
    return dbMod;
};