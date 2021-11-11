ckc
    .controller('acctSettingsController', acctSettingsController);

	acctSettingsController.$inject = ['$routeParams'];

/* @ngInject */
function acctSettingsController($routeParams) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.routeParams = $routeParams;
	vm.user = firebase.auth().currentUser;

	//	VIEW MODEL FUNCTIONS
	vm.saveChanges = function() {
		const user = firebase.auth().currentUser;

		user.updateProfile({
			displayName: vm.user.displayName
		  }).then(() => {
			  console.log('updated successfully');
			// Update successful
			// ...
		  }).catch((error) => {
			  console.log('update error', error);
			// An error occurred
			// ...
		  });  
	};

	//	EXECUTE
	console.log('in the account settings  controller ');	    //  TODO: TAKE THIS OUT LATER


}
