ckc
    .controller('minishopPowerSourceController', minishopPowerSourceController);

	minishopPowerSourceController.$inject = ['$interval', '$routeParams', '$scope', 'msData', 'moment'];

/* @ngInject */
function minishopPowerSourceController($interval, $routeParams, $scope, msData, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	let vm = this;
	const cadence = 1000 * 10;  //  1000 miliseconds = 1 second x 10 = 10 seconds 

	/*
	*	VIEW MODEL VARIABLES
	*
	*	Math	[$scope]		making Math functions available to the view model
	*	params	[vm]			making the URL params available to the view model
	*/	
	$scope.Math = window.Math;
	vm.params = $routeParams
	vm.opSeconds = { house: { total: 0, continous: 0 }, generator: { total: 0, continous: 0 }};
	vm.timeblocks = []

	/*
	*	BIND VIEW MODEL VARIABLES
	*
	*	powerIsOn	boolean		represents TRUE/FALSE
	*	powerSource	string		'house' or 'generator'
	*	txs			object		{
	*								[key]: {
	*									source: 	[string] 	"house" or "generator",
	*									timestamp: 	[string]	"2021-11-04T00:00:00-07:00",
	*									turning: 	[string]	"off" or "on",
	*									note:		[string]	"something can go here"
	*								}
	*							},...
	*/	
	msData.data.power.isOn.$bindTo($scope, 'vm.powerIsOn');
	msData.data.power.source.$bindTo($scope, 'vm.powerSource');
	msData.data.power.txs.$bindTo($scope, 'vm.txs');

	/*
    *   PRIVATE: UPDATE POWER KPIs
    */
    function updatePowerKPIs(txs, opSeconds) {
        //  DEFINE LOCAL VARIABLES
        const powerKPIs = getPowerKPIs(txs, opSeconds)

		//console.log('updatePowerKPIs', powerKPIs.timeblocks)

        //  ASSIGN VALUES
        vm.timeblocks  = powerKPIs.timeblocks;
        vm.opSeconds   = powerKPIs.opSeconds;

		//console.log('vm.timeblocks', vm.timeblocks);

    };

	/*
    *   PRIVATE: IS ON
    *
    *   Description: This function checks the status of a timeblock, to see if the blck is on or off
    * 
    *   Algorithm:  1) Define local variables
    *               2) Iterate over array of transactions
    * 
    *   @param  int     index:
    *   @param  array   txsArray: 
    *   @return boolean returnValue: TRUE/FALSE depending on the findings
    *   @see    (n/a)
    */
    function _isOn(powerTx) {
        let returnValue = false;
        if(powerTx.turningOn != undefined) {
            if(powerTx.turningOn) returnValue = true
        }
		return returnValue;
	};

    /*
    *   PRIVATE: CLEAN FIREBASE OBJECT
    *   
    *   This function removes all non-object values from a firebase object
    * 
    *   @param  {object}    txs:
    *   @return {object}    returnObject:
    */
    function _cleanFirebaseObject(txs) {
        const returnObject = {};

		//console.log('got these txs', txs);

        Object.keys(txs).forEach(function(key) {

            if(key != '$$conf' && key != '$id' && key != '$priority' && key != '$resolved') returnObject[key] = txs[key];

        })

        return returnObject;
    }

	/*
    *   PUBLIC: GET POWER KPIs
    *
    *   This function builds the power sector KPIs
    * 
    *   Algorithm   1) Append a current transaction with current time stamp to the end of the cleanTXS list
    *
    *   @param  (none)
    *   @return object      powerKPIs      
    *   @see
    */
    function getPowerKPIs(txs, opSeconds) {
		//	NOTIFY PROGRESS
		//console.log('getPowerKPIs', txs, opSeconds);

		//	DEFINE LOCAL VARIABLES
		const powerKPIs = { timeblocks: [], opSeconds: opSeconds }
		const cleanTxs = _cleanFirebaseObject(txs);
		const keysList = [];

		//  ZERO OUT VALUES
		powerKPIs.opSeconds['generator'].total 		= 0;
		powerKPIs.opSeconds['generator'].continous 	= 0;
		powerKPIs.opSeconds['house'].total 			= 0;
		powerKPIs.opSeconds['house'].continous 		= 0;

		//  1) Append a current transaction with current time stamp to the end of the cleanTXS list
		const newTimestamp = moment().format();
		cleanTxs[newTimestamp] = { timestamp: newTimestamp };

		//  2) Generate a keys list
		Object.keys(cleanTxs).forEach(function(key) { keysList.push(key); })
	

		//  3) Build Time Blocks, by iterating over this array of timestamps
		for (let index = 0; index < keysList.length - 1; index++) {
			//  Define local variabels
			const firstKey      = keysList[index];
			const secndKey      = keysList[index + 1];
			const blockStart    = moment(cleanTxs[firstKey].timestamp);
			const endBlock      = moment(cleanTxs[secndKey].timestamp);
			const durationSeconds = moment.duration(endBlock.diff(blockStart));
			const durationPercentage = (durationSeconds.as('seconds') / (59 + (59 * 60) + (23 * 60 * 60))).toFixed(2);
			const progressObject = {
				prcntg: durationPercentage * 100,
				seconds: durationSeconds.as('seconds'),
				isOn: _isOn(cleanTxs[firstKey]),
				classes: ['progress-bar']
			};

			//  notify progress
			//console.log('progressObject', progressObject);
			
			
			
			//	MAKE SURE "ON" BLOCKS ARE YELLOW
			if(progressObject.isOn) progressObject.classes.push('bg-warning')

			console.log(cleanTxs[firstKey], _isOn(cleanTxs[firstKey]));
			if(_isOn(cleanTxs[firstKey])) {
				
				if(powerKPIs.opSeconds != undefined) {
					
					powerKPIs.opSeconds['house'].total      += durationSeconds.as('seconds');
					powerKPIs.opSeconds['house'].continous  = durationSeconds.as('seconds');
				}
				
			}
			
			//	UPDATE THE ARRAY
			powerKPIs.timeblocks.push(progressObject);
		}
	
		return powerKPIs;
	};

	//	VIEW MODEL FUNCTIONS
	vm.toggleOnOff = function() {
		msData.power.togglePower();
	};



	//	EXECUTE
	console.log('in the power source controller ');	    //  TODO: TAKE THIS OUT LATER

	/*
    *   EXECUTE: UPDATES
    */
	$scope.$on('powerTxsLoaded', function(event, args) {
		//console.log('powerTxsLoaded', args)
		updatePowerKPIs(args, vm.opSeconds);
	});
	
    

	/*
    *   EXECUTE: MiniShopIntevals
    *
    *   Here we run our intveral functions that need to per processed on a regular cadence.
    *   All functions being run should be syncronous, or rather, not require 
    * 
    *   @param  int     cadence: is an integer to define how requenly these functions shoulld
    *                           be run
    */ 
	$interval(function powerSourceIntervals() { updatePowerKPIs(vm.txs, vm.opSeconds); }, cadence)

}
