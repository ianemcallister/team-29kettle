/*
*	CHANNELS SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Documents', Documents);

//  DEPENDENCY INJECTION
Channels.$inject = ['$log', '$firebaseObject', '$firebaseArray'];

//  DECLARE THE SERVICE
/* @ngInject */
function Documents($log, $firebaseObject, $firebaseArray) {
    
    //  DEFINE METHODS
    var DocumentsMod = {
        get: {
            one:    GetADocument,
            list:   GetDocumentsList
        }
    };

    /*
    *
    */
    function GetADocument(id) {
        //  NOTIFY PROGRESS
        var readPath = "Resources/" + id;
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };

    /*
    *
    */
    function GetDocumentsList() {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Resources/";
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };


    //   RETURN
    return DocumentsMod;
};