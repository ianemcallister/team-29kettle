ckc
    .controller('adminABoMController', adminABoMController);

	adminABoMController.$inject = ['$firebaseObject', '$routeParams', '$scope'];

/* @ngInject */
function adminABoMController($firebaseObject, $routeParams, $scope) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	const vm        = this;
    const db        = firebase.database();
    const bomRef    = db.ref('BOMs/' + $routeParams.bomId);
    const rolRef    = db.ref('OpRoles');

	//	VIEW MODEL VARIABLES
    vm.record       = $firebaseObject(bomRef);
    vm.roleOptions  = $firebaseObject(rolRef);
	vm.aNewResource	= {
		id:			"",
		name:		"",
		UoM:		"",
		qty:		""
	}

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE

	console.log('in a bill of materials controller ');	    //  TODO: TAKE THIS OUT LATER


}
