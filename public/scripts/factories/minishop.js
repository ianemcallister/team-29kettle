/*
*	CHANNELS SERVICE
*
*/

//  DEFINE MODULE
ckc.factory('MiniShop', MiniShop);

//  DEPENDENCY INJECTION
MiniShop.$inject = [];

//  DECLARE THE SERVICE
/* @ngInject */
function MiniShop() {

    //  NOTIFY PROGRESS
    console.log('Loading Mini Shop Service');

    //  DEFINE LOCAL VARIABLES
    var self = this;

    //  DEFINE PRIVATE VARIABLES
    self.engagment = {};
    
    //  DEFINE METHODS
    var miniShopMod = {
        _engagment: self.engagment,
        get: '',
        set: '',
        update: '',
        delete: ''
    };


    //   RETURN
    return miniShopMod;
};