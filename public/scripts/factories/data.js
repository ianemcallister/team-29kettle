/*
*	Data SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('data', data);

//  DEPENDENCY INJECTION
data.$inject = ['$firebaseObject', 'Firebase'];

//  DECLARE THE SERVICE
/* @ngInject */
function data($firebaseObject, Firebase) {
    
    //  DEFINE METHODS
    var dataMod = {
        _createNewRecord: _createNewRecord,
        loadDirectObject: loadDirectObject,
        loadChildObject: LoadChildObject,
        loadFBObject: LoadFirebaseObject
    };

    /*
    *   PRIVATE: CREATE NEW RECORD
    *
    */
    function _createNewRecord(collection, id) {
        //  RETURN ASYNC WORK
        return new Promise(function (resolve, reject) {
            Firebase.add(collection + "/" + id, { id: id })
            .then(function(success) {
                console.log('Reocrd created');
                resolve();
            })
            .catch(function (error) {
                console.log('error', error);
            })
        });
    };

    function _validateDirectRecord(path) {
        return new Promise(function (resolve, reject) {
            Firebase.read(path)
                .then(function successRead(success) {
                    //console.log('got this record back', success);
                    resolve(success);
                })
                .catch(function errorRead(e) {
                    console.log('Error', e);
                })
        });
    };

    function _validateChildObject(collection, child, value) {
        return new Promise(function (resolve, reject) {
            Firebase.query.child(collection, child, value)
                .then(function successQuery(success) {
                    //  NOTIFY PROGRESS
                    //console.log('got this Query record back', success);

                    //  confirm the VALIDITY OF THE DATA 
                    if(success == null) {

                        //  if the data is not great, create the new record
                        _createNewRecord(collection, value)
                        .then(function (success) {
                            resolve();
                        })
                        .catch(function (error) {
                            console.log('Error', error);
                        });

                    } else {
                        resolve();
                    }

                })
                .catch(function errorQuery(e) {
                    console.log('Error', e);
                })
        });
    };

    /*
    *   LOAD DIRECT OBJECT
    *
    */
    function loadDirectObject(collection, address) {
        //  define local variables
        var readPath = collection + "/" + address;
        var returnObject  = firebase.database().ref(readPath);

        //  RETURN ASYNC WORK
        return new Promise(function (resolve, reject) {
            
            _validateDirectRecord(readPath)
            .then(function sucessLoad() {
                resolve($firebaseObject(returnObject));
            })
            .catch(function errorLoad() {
                console.log('error', e);
            });

        });
    };

    /*
    *   LOAD CHILD OBJECT
    *
    */
    function LoadChildObject(collection, child, value) {
        //  NOTIFY PROGRES
        //  DEFINE LOCAL VARIABLS
        let ref = firebase.database().ref(collection + "/" + value);

        //  RETURN ASYNC WORK
        return new Promise(function loadChildPromise(resolve, reject) {
            _validateChildObject(collection, child, value)
            .then(function sucessChildLoad() {
                resolve($firebaseObject(ref));
            })
            .catch(function errorChildLoad() {
                console.log('error', e);
            });
        });
    };

    /*
    *   LOAD FIEBASE OJBECT
    */
    function LoadFirebaseObject(path, record, child, value) {
        //  NOTIFY PROGERSS
        console.log('loading firebase object', path, record, child, value);

        //  DEFINE LOCAL VARIABLES
        let readPath = path;
        if(record != undefined) readPath += "/" + record
        let ref = firebase.database().ref(readPath);
        let returnObject = "";

        //  RETURN ASYNC WORK
        return new Promise(function loadFBOPromise(resolve, reject) {
            
            //  CHECK FOR QUERY PATH
            if(child != undefined && value != undefined) {
                let query = ref.orderByChild(child).equalTo(value);
                returnObject = $firebaseObject(query);
            } else returnObject = $firebaseObject(ref);

            //  UPON OBJECT LOAD 
            returnObject.$loaded()
                .then(function successfulFBObjectLoad(s) {
                    //  NOTIFY PROGRESS
                    console.log('success', Object.keys(s).length, value, s);

                    if(Object.keys(s).length < 6 && s.$value == null) { 
                        console.log('no record found here', returnObject);
                        returnObject.$value = null;
                        returnObject.id = value;

                    }

                    //  SEND BACK FIREBASE OBJECT
                    resolve(returnObject);
                })
                .catch(function FBObjectLoadError(e) {
                    console.log('Error', e);
                })
        });
    };


    //   RETURN
    return dataMod;
};