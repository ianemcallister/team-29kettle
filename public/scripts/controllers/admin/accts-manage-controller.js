ckc
    .controller('adminAcctsManageController', adminAcctsManageController);

	adminAcctsManageController.$inject = ['$firebaseObject'];

/* @ngInject */
function adminAcctsManageController($firebaseObject) {

	//	NOTIFY PROGRES
	console.log()

	//	LOCAL VARIABLES
	var vm = this;
	const db        = firebase.database();
    const acctRef   = db.ref('Accts');

	//	VIEW MODEL VARIABLES
	vm.allAccts		= $firebaseObject(acctRef);

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE
	console.log('in the Admin ACcounts Manager controller ');	    //  TODO: TAKE THIS OUT LATER


}
