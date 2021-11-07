ckc
    .controller('adminOpRolesListContoller', adminOpRolesListContoller);

	adminOpRolesListContoller.$inject = ['$firebaseObject', '$scope'];

/* @ngInject */
function adminOpRolesListContoller($firebaseObject, $scope) {

	//	NOTIFY PROGRES
  
	//	LOCAL VARIABLES
	var vm        = this;
    const db        = firebase.database();
    const opRolList = db.ref('OpRoles');

	//	VIEW MODEL VARIABLES
    vm.opRolesList  = $firebaseObject(opRolList);
	vm.currentRecord = {
		name: "",
		UofM: "",
		description: "",
		notes: ""
	}

	//	VIEW MODEL FUNCTIONS
	vm.addSelection = function() {
		const newKey = firebase.database().ref().child("OpRoles").push().key;
		vm.opRolesList[newKey] = vm.currentRecord;
		vm.opRolesList.$save().then(function saveNewRole() {
			console.log('saved successfully');
			vm.currentRecord = {
				name: "",
				UoM: "",
				description: "",
				notes: ""
			};
		});
	
	}

	//	EXECUTE

	console.log('in the op roles list controller ', vm.opRolesList);	    //  TODO: TAKE THIS OUT LATER

}
