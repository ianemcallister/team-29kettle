ckc
    .controller('minishopPowerSourceController', minishopPowerSourceController);

	minishopPowerSourceController.$inject = [];

/* @ngInject */
function minishopPowerSourceController() {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.powerIsOn = true;
    vm.powerSource = "house";

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE
	console.log('in the power source controller ');	    //  TODO: TAKE THIS OUT LATER


}
