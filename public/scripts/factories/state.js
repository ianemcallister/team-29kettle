/*
*	State Service
*
*/

//  DEFINE MODULE
ckc.factory('stateService', stateService);

//  DEPENDENCY INJECTION
stateService.$inject = ['$log'];

//  DECLARE THE SERVICE
/* @ngInject */
function stateService($log) {

    //  NOTIFY PROGRESS
    $log.info('Instanciating stateService Factory');

    //  DEFINE METHODS
    var state = {
        
    };


    //   RETURN
    return state;
};