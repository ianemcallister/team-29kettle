ckc
    .controller('activitiesController', activitiesController);

	activitiesController.$inject = ['$scope'];

/* @ngInject */
function activitiesController($scope) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

    //  WATCHERS



	//	VIEW MODEL VARIABLES
    vm.newDateObject = (new Date());
    vm.date = '';
    console.log(vm.newDateObject);

	//	VIEW MODEL FUNCTIONS

    vm.dateUpdate = function() {
        //  DEFINE LOCAL VARIABLES
        var parsedDate = Date.parse(vm.newDateObject);
        var cleanDate = new Date(parsedDate).toISOString();
        var datevalue = new Date(vm.newDateObject);
        console.log('Parsed Date:', parsedDate);
        console.log('clean date: ', cleanDate);
    }

    // Data Picker Initialization



	//	EXECUTE
	console.log('in the activities controller ');	    //  TODO: TAKE THIS OUT LATER


}
