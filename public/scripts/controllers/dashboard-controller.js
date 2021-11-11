ckc
    .controller('dashboardController', dashboardController);

	dashboardController.$inject = ['$routeParams', '$firebaseObject', 'moment'];

/* @ngInject */
function dashboardController($routeParams, $firebaseObject, moment) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)
	
	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.user = firebase.auth().currentUser;
	vm.routeParams = $routeParams;

	//	VIEW MODEL FUNCTIONS
	vm.today = function() {
		return moment().format();
	}
	//	EXECUTE
	console.log('in the dash controller');	    //  TODO: TAKE THIS OUT LATER


}
