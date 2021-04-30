/*
*	AUTH SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Auth', Auth);

//  DEPENDENCY INJECTION
Auth.$inject = ['$log', '$firebaseAuth'];

//  DECLARE THE SERVICE
/* @ngInject */
function Auth($log, $firebaseAuth) {
    //var ref = firebase('https://kettle-team-default-rtdb.firebaseio.com');
    //var auth = $firebaseAuth(ref);
    //return auth;
    return true;
};