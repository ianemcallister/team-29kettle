ckc
    .controller('minishopProductionController', minishopProductionController);

	minishopProductionController.$inject = ['$routeParams', '$interval', '$scope', '$window', 'msData', 'moment'];

/* @ngInject */
function minishopProductionController($routeParams, $interval, $scope, $window, msData, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	let vm = this;
	const cadence = 1000 * 1;  //  1000 miliseconds = 1 second x 1 = 1 second

	//	VIEW MODEL VARIABLES
	vm.recipes = _loadRecipes(msData.models.operations);
	vm.prodReport = msData.data.production.report;
	vm.batches = {
		ondeck: {},
		cooking: {},
		cooling: {}
	};
	vm.cookingMetrics = {
		startngTime: 	"",		// i.e. 2021-11-05T10:00:00-07:00
		expiresAt:		"",		// i.e. 2021-11-05T10:20:00-07:00
		timeElapsed: 	0,		// in seconds
		status: 		"Off",	//	Warming / Cooking / Cleaning / Off
		prcntPrgs: 		0,

	};

	//	VIEW MODEL FUNCTIONS
	vm.selectRecipe = function(key) {
		const spotIsOpen = (vm.batches.ondeck.recipe == undefined);
		const flavorAlreadySelected = ((vm.batches.ondeck.recipe == vm.recipes[key].recipe) && (vm.batches.ondeck.nut == vm.recipes[key].nut))
		
		if (spotIsOpen && !flavorAlreadySelected) {
			// assign this flavor to the spot
			vm.batches.ondeck = vm.recipes[key];
		} else if (!spotIsOpen && !flavorAlreadySelected) {
			//	change the flavor to this new one selected
			vm.batches.ondeck = vm.recipes[key];
		} else if (!spotIsOpen && flavorAlreadySelected) {
			// remove this flavor from the spot
			vm.batches.ondeck = {};

		};
		
	};

	vm.startNewBatch = function() {
		const batchOnDeck = (vm.batches.ondeck.recipe != undefined);

		if(batchOnDeck) {
			console.log('starting a new batch');
			//	lastBatch gets set to Cooking value
			vm.batches.cooling = vm.batches.cooking;

			//	cooking gets set to ondeck value
			vm.batches.cooking = vm.batches.ondeck;
			vm.cookingMetrics.status 		= "Cooking";
			vm.cookingMetrics.startngTime 	= moment().format();
			vm.cookingMetrics.timeElapsed	= 0;

			//	ondeck gets set to {}
			vm.batches.ondeck = {};

		} else {
			console.log('ned to select a batch first');
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
		
		const startTime = moment(vm.cookingMetrics.startngTime);
		const crrntTime = moment();
		const scndsDurn	= moment.duration(crrntTime.diff(startTime)).as('seconds');
		const percentageProgress = (scndsDurn / 1200).toFixed(2) * 100
		vm.cookingMetrics.prcntPrgs = percentageProgress;
	};

	/*
	*	PRIVATE: INCRIMENT COOKING TIMER
	*/
	function incrimentCookingTimer() { 
		if(vm.cookingMetrics.status == 'Cooking') {
			vm.cookingMetrics.timeElapsed++;
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
