ckc
    .controller('adminOpRolesListContoller', adminOpRolesListContoller);

	adminOpRolesListContoller.$inject = ['$firebaseObject', '$scope'];

/* @ngInject */
function adminOpRolesListContoller($firebaseObject, $scope) {

	//	NOTIFY PROGRES
  
	//	LOCAL VARIABLES
	const vm        = this;
    const db        = firebase.database();
    const opRolList = db.ref('OpRoles');

	//	VIEW MODEL VARIABLES
    vm.opRolesList  = $firebaseObject(opRolList);

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE

	console.log('in the op roles list controller ', vm.opRolesList);	    //  TODO: TAKE THIS OUT LATER

}
