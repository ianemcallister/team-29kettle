/*
*	Engagments Service
*
*/

//  DEFINE MODULE
ckc.factory('Firebase', Firebase);

//  DEPENDENCY INJECTION
Firebase.$inject = [];

//  DECLARE THE SERVICE
/* @ngInject */
function Firebase() {

    //  DEFINE LOCAL VARIABLES
    var self = this;
    self.data = ['one', 'two'];

    //  NOTIFY PROGRESS
    console.log('Firebase Service');

    //  DEFINE METHODS
    var firebaseMod = {
        add: Add,
        read: Read,
        update: Update,
        query: {
            child: QueryChild
        }
    };

    function Add(path, value) {
        return new Promise(function (resolve, reject) {
            firebase.database().ref(path).set(value, function (error) {
                if(error) {
                    console.log('Write Error', error);
                    reject();
                } else {
                    console.log('Write Successful');
                    resolve();
                }
            });
        })

    }

    function Read(path) {
        console.log('reading', path);
        const ref = firebase.database().ref(path);
        return new Promise(function(resolve, reject){ 
            ref.on('value', function FirebaseRead(snapshot) {
                const data = snapshot.val();
                resolve(data);
            });
        });
    }

    function Update(updates) {
        return new Promise(function(resolve, reject) {
            firebase.database().ref().update(updates, function updateCallBack(error) {
                if(error) {
                    console.log('Firebase Update Error', error);
                    reject();
                } else {
                    resolve();
                }
            });

        });
    }

    function QueryChild(path, key, value) {
        //  define local variables
        const ref = firebase.database().ref(path);
        const query = ref.orderByChild(key).equalTo(value)
        return new Promise(function(resolve, reject) {
            query.on('value', function FirebaseQuery(snapshot) {
                const data = snapshot.val();
                resolve(data);
            });
        });
    }

    //   RETURN
    return firebaseMod;
};