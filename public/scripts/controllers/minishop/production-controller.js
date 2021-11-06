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
	vm.recipes = [
		{recipe: "Sweet & Salty", nut: "Pecans"},
		{recipe: "Sweet & Salty", nut: "Almonds"},
		{recipe: "Sweet & Salty", nut: "Cashews"},
		{recipe: "Sweet & Salty", nut: "Hazelnuts"},
		{recipe: "Bourbon", nut: "Pecans"},
		{recipe: "Bourbon", nut: "Almonds"},
		{recipe: "Bourbon", nut: "Cashews"},
		{recipe: "Bourbon", nut: "Hazelnuts"}
	];
	vm.batches = {
		ondeck: {},
		cooking: {},
		cooling: {}
	};
	vm.cookingMetrics = {
		startngTime: "",		// i.e. 2021-11-05T10:00:00-07:00
		timeElapsed: 0,			// in seconds
		status: "Off"			//	Warming / Cooking / Cleaning / Off
	};

	//	VIEW MODEL FUNCTIONS
	vm.selectRecipe = function(index) {
		const spotIsOpen = (vm.batches.ondeck.recipe == undefined);
		const flavorAlreadySelected = ((vm.batches.ondeck.recipe == vm.recipes[index].recipe) && (vm.batches.ondeck.nut == vm.recipes[index].nut))
		
		if (spotIsOpen && !flavorAlreadySelected) {
			// assign this flavor to the spot
			vm.batches.ondeck = vm.recipes[index];
		} else if (!spotIsOpen && !flavorAlreadySelected) {
			//	change the flavor to this new one selected
			vm.batches.ondeck = vm.recipes[index];
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
	*	PRIVATE: INCRIMENT COOKING TIMER
	*/
	function incrimentCookingTimer() { 
		if(vm.cookingMetrics.status == 'Cooking') vm.cookingMetrics.timeElapsed++; 
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
