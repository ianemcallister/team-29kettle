/*
*	CHANNELS SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Channels', Channels);

//  DEPENDENCY INJECTION
Channels.$inject = ['$log', '$firebaseObject', '$firebaseArray'];

//  DECLARE THE SERVICE
/* @ngInject */
function Channels($log, $firebaseObject, $firebaseArray) {
    
    //  DEFINE METHODS
    var ChannelsMod = {
        get: {
            list: GetChannelsList
        }
    };

    /*
    *
    */
    function GetChannelsList() {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Channels/";
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        var query   = ref.orderByChild("name")
        return $firebaseObject(query);
    };


    //   RETURN
    return ChannelsMod;
};