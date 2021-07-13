ckc
    .controller('channelController', channelController);

	channelController.$inject = ['$scope','$log', '$location','$routeParams', 'model', 'Updates'];

/* @ngInject */
function channelController($scope, $log, $location, $routeParams, model, Updates) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.model = model;
    vm.test = 'testing';
    Updates.get.byChannelId()
    .then(function(success) {
        vm.updates = success;
    });

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE
	$log.info('in the chanels controller ', $scope);	    //  TODO: TAKE THIS OUT LATER


}
