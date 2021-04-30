ckc
    .controller('dashboardController', dashboardController);

	dashboardController.$inject = ['$scope','$log', '$routeParams', '$firebaseAuth', 'Members'];

/* @ngInject */
function dashboardController($scope, $log, $routeParams, $firebaseAuth, Members) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)
	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.userProfile = Members.get.profile($routeParams.uid);
	vm.today = moment().format('dddd, M/D/YY')
	//	EXECUTE
	console.log($firebaseAuth);
	$log.info('in the dash controller');	    //  TODO: TAKE THIS OUT LATER


}
