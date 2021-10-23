/*
*	Engagments Service
*
*/

//  DEFINE MODULE
ckc.factory('Payments', Payments);

//  DEPENDENCY INJECTION
Payments.$inject = ['$firebaseObject'];

//  DECLARE THE SERVICE
/* @ngInject */
function Payments($firebaseObject) {

    //  DEFINE LOCAL VARIABLES
    var self = this;
    self.data = [];

    //  NOTIFY PROGRESS
    //console.log('Payments Service');

    //  DEFINE METHODS
    var paymentsMethods = {
        data: self.data,
        init: init
    };

    //  PRIVATE METHODS
    function _loadPaymentRecord(id) {
        console.log('_loadPaymentRecord', id);
        //  DEFINE LOCAL VARIABLES
        var readPath = "FundsCollected/" + id;
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };

    //  PUBLIC METHODS
    function init(date) {
        //  NOTIFY PROGRESS
        console.log('payments servce', self.data)
        //  DEFINE LOCAL VARIABLES
        
        //  1. COLLECT A LIST OF TRANSACTIONS
        var txsList = ["1IX0oFLvDrnVjwvgOw4HxsUzvaB", "1OIvavaneeb53GHPQqjgA9o5taB"];
        //  2. GENERATE AN ARRAY OF $FIREBASEOBJECTS POINTING AT THOSE TRANSACTIONS
        txsList.forEach(function(id) {
            self.data.push(_loadPaymentRecord(id))
        });

        console.log(self.data);

        return 1;
    }

    //   RETURN
    return paymentsMethods;
};