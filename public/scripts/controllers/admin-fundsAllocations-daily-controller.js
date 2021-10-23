ckc
    .controller('adminFundsAllocationsDailyController', adminFundsAllocationsDailyController);

	adminFundsAllocationsDailyController.$inject = ['$routeParams', '$location', 'engagements', 'moment'];

/* @ngInject */
function adminFundsAllocationsDailyController($routeParams, $location, engagements, moment) {

	//	NOTIFY PROGRES
    
	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.currentDate  = '';
    vm.engagments   = '';

	//	VIEW MODEL FUNCTIONS
    vm.formatTime = function(aTime) {
        var dateString = vm.currentDate + "T" + aTime;
        var momentTime = moment(dateString)
        return momentTime.format("h:mm a")
    }

    /*
    *   QUALITY CONTROL
    *
    */  

    if($routeParams.date != undefined) { vm.currentDate = $routeParams.date; }
    if(engagements != undefined) { vm.engagments = engagements; }
    
    //  Add Year and week if not present
    if(Object.keys($routeParams) < 1) {
        var date = moment().format("YYYY-MM-DD");
        var path = "admin/fundsAllocations/daily\?date=" + date;
        console.log(path);
        $location.url(path);
    }


	//	EXECUTE
	console.log('in the adminFundsAllocationsDailyController ');	    //  TODO: TAKE THIS OUT LATER


}
