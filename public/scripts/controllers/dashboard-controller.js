ckc
    .controller('dashboardController', dashboardController);

	dashboardController.$inject = ['$scope','$log', '$routeParams', '$firebaseAuth', 'Members', 'Channels', 'Admin'];

/* @ngInject */
function dashboardController($scope, $log, $routeParams, $firebaseAuth, Members, Channels, Admin) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)
	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.today 			= moment().format('dddd, M/D/YY')
	vm.userProfile 		= Members.get.profile($routeParams.uid);
	vm.userCheckLists 	= Members.get.tasks($routeParams.uid);
	vm.docs				= Admin.get.docs();
	vm.resources		= {
		channels: Channels.get.list()
	}

	//	EXECUTE
	console.log($firebaseAuth);
	$log.info('in the dash controller');	    //  TODO: TAKE THIS OUT LATER


}
