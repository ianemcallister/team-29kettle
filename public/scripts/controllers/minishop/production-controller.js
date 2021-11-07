/*
*	MINI SHOP PRODUCTION CONTROLLER
*
*	Status can be: Warming / Cooking / Cleaning / Off
*/

ckc
    .controller('minishopProductionController', minishopProductionController);

	minishopProductionController.$inject = ['$firebaseObject', '$routeParams', '$interval', '$scope', '$window', 'msData', 'moment'];

/* @ngInject */
function minishopProductionController($firebaseObject, $routeParams, $interval, $scope, $window, msData, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	let vm = this;
	vm.params = $routeParams;
	const cadence = 1000 * 1;  //  1000 miliseconds = 1 second x 1 = 1 second

	//	VIEW MODEL VARIABLES
	vm.recipes = _loadRecipes(msData.models.operations);
	vm.batch = {
		prcntPrgs: 0,
		secElapsed: 0
	};
	vm.cookingList = [];

	/*
	*	BIND VIEW MODEL VARIABLES
	*
	*	powerIsOn	boolean		represents TRUE/FALSE
	*	powerSource	string		'house' or 'generator'
	*/
	msData.data.production.report.$bindTo($scope, 'vm.prodReport').then(function reportLoaded() {
		//console.log('bind finished loading');
	});

	//	VIEW MODEL FUNCTIONS
	vm.selectRecipe = function(key) {
		const spotIsOpen = (vm.prodReport.ondeck.recipe == undefined);
		const flavorAlreadySelected = ((vm.prodReport.ondeck.recipe == vm.recipes[key].recipe) && (vm.prodReport.ondeck.nut == vm.recipes[key].nut))
		
		if (spotIsOpen && !flavorAlreadySelected) {
			// assign this flavor to the spot
			vm.prodReport.ondeck = vm.recipes[key];
		} else if (!spotIsOpen && !flavorAlreadySelected) {
			//	change the flavor to this new one selected
			vm.prodReport.ondeck = vm.recipes[key];
		} else if (!spotIsOpen && flavorAlreadySelected) {
			// remove this flavor from the spot
			vm.prodReport.ondeck = { "_hold":  "" };

		};
		
	};

	/*
	*	VIEW MODEL FUNCTION: START A NEW BATCH
	*
	*	
	*/
	vm.startNewBatch = function() {
		//	DEFINE LOCAL VARIABLES
		const batchOnDeck = (vm.prodReport.ondeck.recipe != undefined);

		if(batchOnDeck) {
			
			//	1) Move The currently cooking batch to cooling
			_moveCookingToCooling();
			
			//	2) Move the on Deck batch to the cooking station
			_moveOnDeckToCooking();

			//	3) Reset on deck value for more production capacity
			_resetOnDeckStation();

		} else {
			console.log('need to select a batch first');
		}
	};

	/*
	*	VIEW MODEL FUNCTION: CALCULATE COOKING DONE
	*/
	vm.calculateCookingDone = function(dateTime) {
		if(dateTime != "") {
			const currentTime = moment(dateTime);
			const frstEndTime = currentTime.add(12, 'minutes').format('h:mm a');
			const scndEndTime = currentTime.add(16, 'minutes').format('h:mm a');
			return frstEndTime + " - " + scndEndTime;
		} else {
			return "";
		}
	};

	/*
	*	VIEW MODEL FUNCTION: CALCULATE COOKING ERROR
	*/
	vm.calculateCookingError = function(dateTime) {

	};

	vm.validatePercentProgress = function(percentage) {
		if(percentage == undefined || percentage == NaN) return 0;
		else return percentage
	};

	/*
	*	PRIVATE: MOVE COOKING TO COOLING
	*/
	function _moveCookingToCooling(){
		vm.prodReport.cooling 				= vm.prodReport.cooking;
		vm.prodReport.cooling.endAt 		= moment().format();
	}

	/*
	*	PRIVATE: MOVE ON DECK TO COOKING
	*/
	function _moveOnDeckToCooking() {
		//	cooking gets set to ondeck value
		vm.prodReport.cooking 				= vm.prodReport.ondeck;
		vm.prodReport.lastStatus 			= "Cooking";
		vm.prodReport.cooking.startAt 		= moment().format();
		vm.prodReport.cooking.expiresAt		= moment(vm.prodReport.cooking.startAt).add(20, 'minutes').format();	
		
		vm.batch.secElapsed					= 0;

		msData.production.journalBatchStart(vm.prodReport).then(function journalBatchStart(entryId) {
			
			//	DEFINE LOCAL VARIABLES
			const readPath = 'JournalEntries/' + entryId;
			console.log('readPath', readPath)
			const db = firebase.database();
			const ref = db.ref(readPath);
			const jeRecord = $firebaseObject(ref);

			//	Add the journal entry to the local list
			vm.cookingList.push(jeRecord)

			//	Record the JE as related to this report via key value pair [timestap]: [entryId]
			vm.prodReport.journalEntries[moment().format()] = entryId

		});
	}

	/*
	*	PRIVATE: CLEAR ON DECK STATION
	*/
	function _resetOnDeckStation() {
		//	ondeck gets set to {}
		vm.prodReport.ondeck = { "_hold": "" };
	}

	/*
	*	PRIVATE: LOAD RECIPES
	*/
	function _loadRecipes(recipesList) {
		const returnList = {};

		//	Only pull out objects of type recipe
		Object.keys(recipesList).forEach(function(key) {
			if(recipesList[key].type == 'recipe') returnList[key] = recipesList[key];
		});

		return returnList;
	}

	/*
	*	PRIVATE: UPDATE BATCH PROGRESS
	*/
	function updateBatchProgress() {
		
		const startTime = moment(vm.prodReport.cooking.startAt);
		const crrntTime = moment();
		const scndsDurn	= moment.duration(crrntTime.diff(startTime)).as('seconds');
		const percentageProgress = (scndsDurn / 1200).toFixed(2) * 100
		vm.batch.prcntPrgs = percentageProgress;
	};

	/*
	*	PRIVATE: INCRIMENT COOKING TIMER
	*/
	function incrimentCookingTimer() { 
		if(vm.prodReport.lastStatus == 'Cooking') {
			const startedAt 	= moment(vm.prodReport.cooking.startAt);
			const currentTime	= moment();
			vm.batch.secElapsed = moment.duration(currentTime.diff(startedAt)).as('seconds');
			updateBatchProgress(); 
		}
	}

	/*
	*	PRIVATE: 
	*/
	function updateProductionKPIs() {
		incrimentCookingTimer();
	};

	//	EXECUTE
	console.log('in the miniship production controller ');	    //  TODO: TAKE THIS OUT LATER

	/*
    *   EXECUTE: MiniShopIntevals
    *
    *   Here we run our intveral functions that need to per processed on a regular cadence.
    *   All functions being run should be syncronous, or rather, not require 
    * 
    *   @param  int     cadence: is an integer to define how requenly these functions shoulld
    *                           be run
    */ 
	$interval(function productionIntervals() { updateProductionKPIs(); }, cadence)

}
