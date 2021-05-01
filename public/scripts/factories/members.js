/*
*	MEMBERS SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Members', Members);

//  DEPENDENCY INJECTION
Members.$inject = ['$log', '$firebaseObject', '$firebaseArray'];

//  DECLARE THE SERVICE
/* @ngInject */
function Members($log, $firebaseObject, $firebaseArray) {
    
    //  DEFINE METHODS
    var membersMod = {
        get: {
            profile: GetMemberProfile,
            tasks: GetMemberTasks,
            checklists: GetMemberChecklists
        }
    };

    /*
    *
    */
    function GetMemberProfile(uid) {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Members/" + uid;
        var _db = firebase.database();
        var ref = _db.ref(readPath);
        return $firebaseObject(ref);
    };

    /*
    *
    */
    function GetMemberTasks(uid) {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Tasks/" + uid;
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        var query   = ref.orderByChild('uid').equalTo(uid); 
        return $firebaseArray(query);
    };

    /*
    *
    */
    function GetMemberChecklists(uid) {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Checklists/" + uid;
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        var query   = ref.orderByChild('uid').equalTo(uid); 
        return $firebaseArray(query);
    };


    //   RETURN
    return membersMod;
};