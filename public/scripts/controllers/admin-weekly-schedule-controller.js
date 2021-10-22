ckc
    .controller('adminWeeklyScheduleController', adminWeeklyScheduleController);

	adminWeeklyScheduleController.$inject = ['$location', '$routeParams', 'moment'];

/* @ngInject */
function adminWeeklyScheduleController($location, $routeParams, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.currentWeek = $routeParams.Wk;
    vm.currentYear = 20 + $routeParams.Yr.toString();
    vm.days = {
        0: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).format(),
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: ""
    }
	//	VIEW MODEL FUNCTIONS
    vm.leftArrow = function() {
        var Yr = $routeParams.Yr;
        var Wk = $routeParams.Wk - 1;
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        $location.url(path);
    };

    vm.rightArrow = function() {
        var Yr = $routeParams.Yr;
        var Wk = parseInt($routeParams.Wk) + 1;
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        $location.url(path);
    };

	//	EXECUTE
	console.log('in the adminWeeklyScheduleController  controller ', $routeParams);	    //  TODO: TAKE THIS OUT LATER

    //  MAKE SURE THAT WE'RE USING A SPECIFIC WEEK
    if(Object.keys($routeParams) < 1) {
        var Yr = moment().format("YY");
        var Wk = moment().week();
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        console.log(path);
        $location.url(path);
    }

}
