ckc
    .controller('documentationController', documentationController);

	documentationController.$inject = ['$scope','$log', '$location','$routeParams', 'data', '$sce'];

/* @ngInject */
function documentationController($scope, $log, $location, $routeParams, data, $sce) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.data = data;
    
    vm.url = $sce.getTrustedUrl(vm.data.document);

	//	VIEW MODEL FUNCTIONS
    vm.resolveURL = function(url) {
        return $sce.getTrustedUrl(url);
    }

	//	EXECUTE
	$log.info('in the documentation controller ', vm.data, vm.url);	    //  TODO: TAKE THIS OUT LATER


}
