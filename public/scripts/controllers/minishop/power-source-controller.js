ckc
    .controller('minishopPowerSourceController', minishopPowerSourceController);

	minishopPowerSourceController.$inject = ['$routeParams', '$interval', '$scope', 'MiniShop', 'moment'];

/* @ngInject */
function minishopPowerSourceController($routeParams, $interval, $scope, MiniShop, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	$scope.Math = window.Math;
	vm.params = $routeParams;
    vm.powerIsOn = false
    vm.powerSource = "generator"
	vm.txs = [];
	vm.opSeconds = {
		generator: {
			continous: 0,
			total: 0
		},
		house: {
			continous: 0,
			total: 0
		}
	};
	vm.timeBlocks = buildProgressBar();

	//	local functions
	function _isOn(index, txsArray) {
		let returnValue = false;
		const newArray = [""];
		txsArray.forEach(function(tx){ newArray.push(tx)});
		newArray.push("");
		if(typeof newArray[index] == 'object') {
			if(newArray[index].turning == "on") returnValue = true
		}
		return returnValue;
	};

	function buildProgressBar() {
		//	NOTIFY PROGRESS
		//console.log('buildProgressBar', moment(new Date()).format());

		//	DEFINE LOCAL VARIABLES
		var startTime = moment(new Date()).hour(0).minute(0).second(0).format();
		var currentTime = moment(new Date()).format();
		var timesArray = [];
		var blocksArray = [];
		vm.opSeconds['generator'].total = 0;
		vm.opSeconds['generator'].continous = 0;
		vm.opSeconds['house'].total = 0;
		vm.opSeconds['house'].continous = 0;
	
		

		timesArray.push(startTime);

		//	iterate over all txs
		vm.txs.forEach(function(tx) {
			timesArray.push(moment(tx.timestamp))
		});

		timesArray.push(currentTime);

		for (let index = 0; index < timesArray.length - 1; index++) {
			const element = new moment(timesArray[index]);
			const next = new moment(timesArray[index + 1]);
			const durationSeconds = moment.duration(next.diff(element));
			const durationPercentage = (durationSeconds.as('seconds') / (59 + (59 * 60) + (23 * 60 * 60))).toFixed(2);
			const progressObject = {
				prcntg: durationPercentage * 100,
				seconds: durationSeconds.as('seconds'),
				isOn: _isOn(index, vm.txs),
				classes: ['progress-bar']
			};
			
			//	MAKE SURE "ON" BLOCKS ARE YELLOW
			if(progressObject.isOn) progressObject.classes.push('bg-warning')

			if(_isOn(index, vm.txs)) {

				vm.opSeconds['house'].total += durationSeconds.as('seconds');
				vm.opSeconds['house'].continous = durationSeconds.as('seconds');
			}
			
			//	UPDATE THE ARRAY
			blocksArray.push(progressObject);
		}

		//console.log(blocksArray);

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
	$interval(function(){
		vm.timeBlocks = buildProgressBar();
		
	},1000*10)

}
