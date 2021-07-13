/*
*	State Service
*
*/

//  DEFINE MODULE
ckc.factory('stateService', stateService);

//  DEPENDENCY INJECTION
stateService.$inject = ['$log', 'Auth'];

//  DECLARE THE SERVICE
/* @ngInject */
function stateService($log, Auth) {

    //  DEFINE LOCAL VARIABLES
    var self = this;

    //  NOTIFY PROGRESS
    $log.info('Instanciating stateService Factory');

    //  DEFINE METHODS
    var state = {
        uid: null
    };

    //  LISTEN FOR STATE CHANGES FOR LOGGED IN USER
    Auth.$onAuthStateChanged(user => {
        console.log('user: ', user);
        self.uid = user;
    });

    //   RETURN
    return state;
};