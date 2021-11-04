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
	vm.txs = [];
	vm.timeBlocks = buildProgressBar();

	//	local functions
	function buildProgressBar() {
		//	DEFINE LOCAL VARIABLES
		var startTime = moment(new Date()).hour(0).minute(0).second(0).format();
		var currentTime = moment(new Date()).format();
		var timesArray = [];
		var blocksArray = []

		timesArray.push(startTime);

		//	iterate over all txs
		vm.txs.forEach(function(tx) {
			timesArray.push(moment(tx.timestamp))
		});

		timesArray.push(currentTime);

		for (let index = 0; index < timesArray.length; index++) {
			const element = new moment(timesArray[index]);
			const next = new moment(timesArray[index + 1]);
			const durationSeconds = moment.duration(next.diff(element));
			const durationPercentage = (durationSeconds.as('seconds') / (59 + (59 * 60) + (23 * 60 * 60))).toFixed(2);
			let progressObject = {
				prcntg: durationPercentage * 100,
				classes: ['progress-bar']
			};
			console.log(index, durationSeconds.as('seconds'), durationPercentage);
			/*if(vm.txs[index + 1].turning != undefined) {
				if(vm.txs[index + 1].turning == "off") {
					progressObject.classes.push('bg-warning');
				}
			}*/
			
			blocksArray.push(progressObject);
		}

		return blocksArray;
	}

	//	VIEW MODEL FUNCTIONS
	vm.toggleOnOff = function() {
		var turning = 'off';

		if(!vm.powerIsOn) turning = "on"

		//	record change
		vm.txs.push({
			timestamp: moment(new Date()).format(),
			source: vm.powerSource,
			turning: turning
		})

		//	rebuild time bars
		vm.timeBlocks = buildProgressBar()

		//	FLIP ON/OFF
		vm.powerIsOn=!vm.powerIsOn
	};

	//	EXECUTE
	console.log('in the power source controller ');	    //  TODO: TAKE THIS OUT LATER


}
