ckc
    .controller('documentationController', documentationController);

	documentationController.$inject = [];

/* @ngInject */
function documentationController() {


	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.data = data;


	//	EXECUTE
	$log.info('in the documentation controller ', vm.data, vm.url);	    //  TODO: TAKE THIS OUT LATER


}
