/*
*	Data SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('data', data);

//  DEPENDENCY INJECTION
data.$inject = ['$firebaseObject'];

//  DECLARE THE SERVICE
/* @ngInject */
function data($firebaseObject) {
    
    //  DEFINE METHODS
    var dataMod = {
        loadFBObject: LoadFirebaseObject
    };

    /*
    *   LOAD FIEBASE OJBECT
    */
    function LoadFirebaseObject(path, child, value) {
        //  NOTIFY PROGERSS
        console.log('loading firebase object', path, child, value);

        //  DEFINE LOCAL VARIABLES
        let ref = firebase.database().ref(path);
        let returnObject = "";

        //  RETURN ASYNC WORK
        return new Promise(function loadFBOPromise(resolve, reject) {
            
            if(child != undefined && value != undefined) {
                let query = ref.orderByChild(child).equalTo(value);
                returnObject = $firebaseObject(query);
            } else returnObject = $firebaseObject(ref);

            returnObject.$loaded()
                .then(function (s) {
                    console.log('success', s);
                    resolve(returnObject);
                })
                .catch(function (e) {
                    console.log('Error', e);
                })
        });
    };


    //   RETURN
    return dataMod;
};