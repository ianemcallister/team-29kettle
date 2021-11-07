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
		id: "",
		name: "",
		UoM: "",
		description: "",
		notes: ""
	}

	function _validateField(data) {
		const returnValue = ""
		if(data != undefined) returnValue = data
		return returnValue;
	}

	//	VIEW MODEL FUNCTIONS
	vm.editRecord = function(key) {
		vm.currentRecord = {
			id: 			key,
			name: 			_validateField(vm.opRolesList[key].name),
			UoM: 			_validateField(vm.opRolesList[key].UoM),
			description: 	_validateField(vm.opRolesList[key].description),
			notes: 			_validateField(vm.opRolesList[key].notes)
		}
	}
	vm.addSelection = function() {
		if(vm.currentRecord.id == "") {
			const newKey = firebase.database().ref().child("OpRoles").push().key;
			vm.opRolesList[newKey] = vm.currentRecord;
		} else {
			vm.opRolesList[vm.currentRecord.id] = vm.currentRecord;
		}
		
		vm.opRolesList.$save().then(function saveNewRole() {
			console.log('saved successfully');
			vm.currentRecord = {
				id:	"",
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
