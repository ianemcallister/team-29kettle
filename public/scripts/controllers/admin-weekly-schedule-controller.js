ckc
    .controller('adminWeeklyScheduleController', adminWeeklyScheduleController);

	adminWeeklyScheduleController.$inject = ['$location', '$routeParams', 'moment'];

/* @ngInject */
function adminWeeklyScheduleController($location, $routeParams, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES

	//	VIEW MODEL FUNCTIONS


	//	EXECUTE
	console.log('in the adminWeeklyScheduleController  controller ', $routeParams);	    //  TODO: TAKE THIS OUT LATER

    if(Object.keys($routeParams) < 1) {
        var Yr = moment().format("YY");
        var Wk = moment().week();
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        console.log(path);
        $location.url(path);
    }

}
