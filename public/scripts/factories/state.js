/*
*	State Service
*
*/

//  DEFINE MODULE
ckc.factory('State', State);

//  DEPENDENCY INJECTION
State.$inject = ['$log', 'Auth'];

//  DECLARE THE SERVICE
/* @ngInject */
function State($log, Auth) {

    //  DEFINE LOCAL VARIABLES
    var self = this;

    //  NOTIFY PROGRESS
    $log.info('Instanciating State Factory');

    //  DEFINE METHODS
    var state = {
        user: authorizedUser,
        uid: null
    };

    //  LISTEN FOR STATE CHANGES FOR LOGGED IN USER
    function authorizedUser() {
        return Auth.$onAuthStateChanged(user => {
            console.log('user: ', user);
            return user;
        });
    }

    state.user();


    //   RETURN
    return state;
};