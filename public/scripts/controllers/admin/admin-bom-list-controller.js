ckc
    .controller('adminBoMListController', adminBoMListController);

	adminBoMListController.$inject = ['$firebaseObject', '$scope'];

/* @ngInject */
function adminBoMListController($firebaseObject, $scope) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	const vm        = this;
    const db        = firebase.database();
    const bomRef    = db.ref('BOMs');

	//	VIEW MODEL VARIABLES
    vm.bomsList     = $firebaseObject(bomRef);

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE

	console.log('in the bill of materials controller ');	    //  TODO: TAKE THIS OUT LATER


}
