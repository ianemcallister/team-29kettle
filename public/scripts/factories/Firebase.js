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
        read: Read,
        query: {
            child: QueryChild
        }
    };

    function Read(path) {
        const ref = firebase.database().ref(path);
        return new Promise(function(resolve, reject){ 
            ref.on('value', function FirebaseRead(snapshot) {
                const data = snapshot.val();
                resolve(data);
            });
        });
        
    }

    function QueryChild(path, key, value) {
        const ref = firebase.database().ref(path);
        const query = ref.orderByChild(key).equalTo(value)
    }

    //   RETURN
    return firebaseMod;
};