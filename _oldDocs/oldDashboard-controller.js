ckc
    .controller('dashboardController', dashboardController);

	dashboardController.$inject = ['$scope','$log', '$location','$routeParams', '$firebaseAuth', 'Members', 'Channels', 'Admin'];

/* @ngInject */
function dashboardController($scope, $log, $location, $routeParams, $firebaseAuth, Members, Channels, Admin) {

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
		channels: { title: "Channels", data: Channels.get.list() }
	}

	//	VIEW MODEL FUNCTIONS
	vm.channelClick = function(id) {
		var path = '/member/' + $routeParams.uid + '/channels/' + id;
		console.log('clicked this chanel', id);
		$location.path(path);
	}

	vm.docsClick = function(id) {
		var path = '/docs/' + id;
		console.log('clicked this doc: ', path);
		$location.path(path);
	}

	//	EXECUTE
	console.log($firebaseAuth);
	$log.info('in the dash controller');	    //  TODO: TAKE THIS OUT LATER


}
