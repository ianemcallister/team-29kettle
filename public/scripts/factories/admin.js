/*
*	ADMIN SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Admin', Admin);

//  DEPENDENCY INJECTION
Admin.$inject = ['$log', '$firebaseObject', '$firebaseArray'];

//  DECLARE THE SERVICE
/* @ngInject */
function Admin($log, $firebaseObject, $firebaseArray) {
    
    //  DEFINE METHODS
    var AdminMod = {
        get: {
            docs: GetDocsList
        }
    };

    /*
    *
    */
    function GetDocsList() {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Admin/sidebar/doc";
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseArray(ref);
    };


    //   RETURN
    return AdminMod;
};