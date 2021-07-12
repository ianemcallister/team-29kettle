/*
*	ADMIN SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Updates', Updates);

//  DEPENDENCY INJECTION
Updates.$inject = ['$log', '$firebaseObject', '$firebaseArray'];

//  DECLARE THE SERVICE
/* @ngInject */
function Updates($log, $firebaseObject, $firebaseArray) {
    
    //  DEFINE METHODS
    var updatesMod = {
        get: {
            byChannelId: GetUpdatesByChannelId
        }
    };

    /*
    *
    */
    function GetUpdatesByChannelId(id) {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Updates";
        var _db     = firebase.firestore();
        //var ref     = _db.ref(readPath);
        //var query   = ref.orderBy('channelId').equalTo(id);
        return new Promise(function(resolve, reject) {
            _db.collection(readPath).doc("LIqT8yctri3EZILJajKh").get()
            .then(function(value) { 
                console.log('dot data');
                resolve(value.data()); 
            })
        });
        
        return true;
        //return $firebaseArray(query);
    };


    //   RETURN
    return updatesMod;
};