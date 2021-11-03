/*
*	CHANNELS SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('MiniShop', MiniShop);

//  DEPENDENCY INJECTION
MiniShop.$inject = ['$firebaseObject'];

//  DECLARE THE SERVICE
/* @ngInject */
function MiniShop($firebaseObject) {

    //  NOTIFY PROGRESS
    console.log('Loading Mini Shop Service');

    //  DEFINE LOCAL VARIABLES
    var self = this;

    //  DEFINE PRIVATE VARIABLES
    self.engagment = {};
    self.power = {}
    
    //  DEFINE METHODS
    var miniShopMod = {
        _engagment: self.engagment,
        data: {
            power: self.power
        },
        get: '',
        set: '',
        update: '',
        delete: ''
    };

    //  DEFINE PRIVATE METHODS
    function _loadPowerObject(engagmentId) {
        var readPath = "Engagments/" + engagmentId + "/power";
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    }


    //   RETURN
    return miniShopMod;
};