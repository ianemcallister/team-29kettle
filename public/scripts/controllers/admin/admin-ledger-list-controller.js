ckc
    .controller('adminLedgerslistController', adminLedgerslistController);

	adminLedgerslistController.$inject = ['$firebaseObject', '$scope'];

/* @ngInject */
function adminLedgerslistController($firebaseObject, $scope) {

	//	NOTIFY PROGRES
  
	//	LOCAL VARIABLES
	const vm        = this;
    const db        = firebase.database();
    const llref     = db.ref('Ledgers');
    const acctsref  = db.ref('Accts');
    const subactref = db.ref('SubAccts');
    const chnlref   = db.ref('Channels');

	//	VIEW MODEL VARIABLES
    vm.ledgersList  = $firebaseObject(llref);
    vm.acctsList    = $firebaseObject(acctsref);
    vm.subAcctsList = $firebaseObject(subactref);
    vm.channelsList = $firebaseObject(chnlref);
    vm.activeSelection = {
        type: "",
        acct: "",
        sact: "",
        chnl: ""
    }

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE

	console.log('in the ledger list controller ');	    //  TODO: TAKE THIS OUT LATER

}
