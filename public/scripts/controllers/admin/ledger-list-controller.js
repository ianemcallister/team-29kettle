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
    vm.activeSelection = { type: "", acct: "", sact: "", chnl: "" }

	//	VIEW MODEL FUNCTIONS
    vm.addLedger = function(data) {
        //  NOTIFY PROGRESS
        console.log("adding a new ledger", data);

        //  DEFINE LOCAL VARIABLES
        const newKey = firebase.database().ref().child('Ledgers').push().key;
        vm.ledgersList[newKey] = {
            acctId:         data.acct,
            acctName:       vm.acctsList[data.acct].name,
            channelId:      data.chnl,
            channelName:    vm.channelsList[data.chnl].name,
            ledgerId:       newKey,
            subAcctId:      data.sact,
            subAcctName:    vm.subAcctsList[data.sact].name,
            type:           data.type
        };
        vm.ledgersList.$save().then(function SaveLedgersList() {
            console.log('list saved sucessfully');
            vm.activeSelection = { type: "", acct: "", sact: "", chnl: "" }
        })
    }

	//	EXECUTE

	console.log('in the ledger list controller ');	    //  TODO: TAKE THIS OUT LATER

}
