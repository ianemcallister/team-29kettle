/*
*	AUTH SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('Auth', Auth);

//  DEPENDENCY INJECTION
Auth.$inject = ['$firebaseAuth'];

//  DECLARE THE SERVICE
/* @ngInject */
function Auth($firebaseAuth) {
    return $firebaseAuth();
};