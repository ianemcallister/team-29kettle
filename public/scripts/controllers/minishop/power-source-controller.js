ckc
    .controller('minishopPowerSourceController', minishopPowerSourceController);

	minishopPowerSourceController.$inject = ['$routeParams', 'MiniShop', 'moment'];

/* @ngInject */
function minishopPowerSourceController($routeParams, MiniShop, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.params = $routeParams;
    vm.powerIsOn = false
    vm.powerSource = "generator"
	vm.txs = []

	//	VIEW MODEL FUNCTIONS
	vm.toggleOnOff = function() {
		//	record change
		vm.txs.push({
			timestamp: moment(new Date()).format()
		})

		//	FLIP ON/OFF
		vm.powerIsOn=!vm.powerIsOn
	};

	//	EXECUTE
	console.log('in the power source controller ');	    //  TODO: TAKE THIS OUT LATER


}
