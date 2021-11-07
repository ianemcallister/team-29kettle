ckc
    .controller('adminFundsAllocationsDailyController', adminFundsAllocationsDailyController);

	adminFundsAllocationsDailyController.$inject = ['$routeParams', '$location', 'moment', 'Payments'];

/* @ngInject */
function adminFundsAllocationsDailyController($routeParams, $location, moment, Payments) {

	//	NOTIFY PROGRES
    console.log('Payments:', Payments);

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.currentDate  = '';
    vm.engagments   = '';
    vm.txsList = Payments.data;

	//	VIEW MODEL FUNCTIONS
    vm.processUpdates = function() {

    };
    
    vm.formatTime = function(aTime) {
        var dateString = vm.currentDate + "T" + aTime;
        var momentTime = moment(dateString)
        return momentTime.format("h:mm a")
    }

    /*
    *   QUALITY CONTROL
    *
    */  

    if($routeParams.date != undefined) { vm.currentDate = $routeParams.date; Payments.init($routeParams.date); }
    //if(engagements != undefined) { vm.engagments = engagements; }
    
    //  Add Year and week if not present
    if(Object.keys($routeParams) < 1) {
        var date = moment().format("YYYY-MM-DD");
        var path = "admin/fundsAllocations/daily\?date=" + date;
        console.log(path);
        $location.url(path);
    }


	//	EXECUTE
	//console.log('in the adminFundsAllocationsDailyController ');	    //  TODO: TAKE THIS OUT LATER


}
