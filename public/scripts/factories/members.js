/*
*	MEMBERS SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Members', Members);

//  DEPENDENCY INJECTION
Members.$inject = ['$log', '$firebaseObject'];

//  DECLARE THE SERVICE
/* @ngInject */
function Members($log, $firebaseObject) {
    
    //  DEFINE METHODS
    var membersMod = {
        get: {
            profile: GetMemberProfile
        }
    };

    /*
    *
    */
    function GetMemberProfile(uid) {
        //  NOTIFY PROGRESS
        console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Members/" + uid;
        var _db = firebase.database();
        var ref = _db.ref(readPath);
        return $firebaseObject(ref);

        //  EXECUTE
        /*return new Promise(function(resolve, reject) {
            ref.on('value', function(snapshot) {
                resolve(snapshot.val());
            });
        });*/
    }


    //   RETURN
    return membersMod;
};