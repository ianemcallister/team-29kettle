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
	const rolesList = db.ref('OpRoles');

	//	VIEW MODEL VARIABLES
    vm.bomsList     = $firebaseObject(bomRef);
	vm.newRecord	= "";

	//	VIEW MODEL FUNCTIONS
	vm.createNewRecord = function(name) {
		const newKey	= firebase.database().ref().child('BOMs').push().key;
		vm.bomsList[newKey] = {
			description: 	"",
			failure: 		"",
			id:				newKey,
			name:			name,
			prodSeconds:	0,
			resources:		"",
			success:		""
		};
		vm.bomsList.$save().then(function newRecordSaved() {
			console.log('new record saved successfully');
		});
	}

	//	EXECUTE

	console.log('in the bill of materials controller ');	    //  TODO: TAKE THIS OUT LATER


}
