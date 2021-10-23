/*
*	Engagments Service
*
*/

//  DEFINE MODULE
ckc.factory('Engagments', Engagments);

//  DEPENDENCY INJECTION
Engagments.$inject = ['$firebaseObject'];

//  DECLARE THE SERVICE
/* @ngInject */
function Engagments($firebaseObject) {

    //  DEFINE LOCAL VARIABLES
    var self = this;
    self.data = ['one', 'two'];

    //  NOTIFY PROGRESS
    console.log('Engagments Service');

    //  DEFINE METHODS
    var engagments = {
    };

    //   RETURN
    return engagments;
};