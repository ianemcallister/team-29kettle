ckc
    .controller('minishopPowerSourceController', minishopPowerSourceController);

	minishopPowerSourceController.$inject = ['$routeParams', '$scope', 'msData', 'moment'];

/* @ngInject */
function minishopPowerSourceController($routeParams, $scope, msData, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	/*
	*	VIEW MODEL VARIABLES
	*
	*	Math	[$scope]		making Math functions available to the view model
	*	params	[vm]			making the URL params available to the view model
	*/	
	$scope.Math = window.Math;
	vm.params = $routeParams

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

	vm.opSeconds = msData.data.power.opSeconds;
	vm.timeBlocks = msData.data.power.timeBlocks;



	//	VIEW MODEL FUNCTIONS
	vm.toggleOnOff = function() {
		msData.power.togglePower();
	};

	//	EXECUTE
	console.log('in the power source controller ');	    //  TODO: TAKE THIS OUT LATER

}
