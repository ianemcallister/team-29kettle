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
	vm.aNewResource	= { id: "", qty: "" };
	vm.aNewSuccess	= { id: "", qty: "" };
	vm.aNewFailure	= { id: "", qty: "" };

	//	VIEW MODEL FUNCTIONS
	vm.addBtn = function(section, data) {
		console.log("adding a new", section, data);
		if(vm.record[section] == '') vm.record[section] = {}
		vm.record[section][data.id] = parseInt(data.qty);
		vm.record.$save().then(function sucessfulUpdate() {
			console.log('new values saved successfully');
			switch(section) {
				case 'resource':
					vm.aNewResource = { id: "", qty: "" };
					break;
				case 'success':
					vm.aNewSuccess	= { id: "", qty: "" };
					break;
				case 'failure':
					vm.aNewFailure	= { id: "", qty: "" };
					break;
				default:
					break;
			}

		})

	}

	vm.removeButton = function(section, id) {
		console.log('removing', section, id);
		vm.record[section][id] = null;
		vm.record.$save().then(function sucessfulUpdate() {
			console.log('removal saved successfully');
		});
	}

	//	EXECUTE

	console.log('in a bill of materials controller ');	    //  TODO: TAKE THIS OUT LATER


}
