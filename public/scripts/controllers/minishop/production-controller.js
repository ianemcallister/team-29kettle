ckc
    .controller('minishopProductionController', minishopProductionController);

	minishopProductionController.$inject = ['$routeParams', '$interval', '$scope', 'msData', 'moment'];

/* @ngInject */
function minishopProductionController($routeParams, $interval, $scope, msData, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	let vm = this;
	const cadence = 1000 * 10;  //  1000 miliseconds = 1 second x 10 = 10 seconds

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
	]
	//	VIEW MODEL FUNCTIONS

	/*
	*	PRIVATE: 
	*/
	function updateProductionKPIs() {

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
