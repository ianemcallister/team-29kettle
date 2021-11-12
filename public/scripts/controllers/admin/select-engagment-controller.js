ckc
    .controller('adminSelectEngagmentController', adminSelectEngagmentController);

	adminSelectEngagmentController.$inject = ['$routeParams', '$firebaseObject', '$location', 'moment'];

/* @ngInject */
function adminSelectEngagmentController($routeParams, $firebaseObject, $location, moment) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

    //  LOCAL FUNCTIONS



	//	VIEW MODEL VARIABLES
    vm.engagmentData = $firebaseObject(firebase.database().ref('Engagments/' + $routeParams.engagmentId));
    vm.routeParams = $routeParams;
    
	//	VIEW MODEL FUNCTIONS
    vm.channelClicked = function(id) {
        console.log(id);
        $location.path('/admin/channels/' + id);
    };

    vm.dateConcatenate = function(date, time) {
        const returnValue = moment();

        if(date != undefined && time != undefined) { 
            const dateSplit = date.split('-');
            const timeTZSplit = time.split("-");
            const timeSplit = timeTZSplit[0].split(":")
            returnValue.year(dateSplit[2]).month(dateSplit[0]-1).date(dateSplit[1]).hour(timeSplit[0]).minute(timeSplit[1]).second(timeSplit[2]);    
        }
      
        return returnValue.format();
    };

    vm.yrWkDConcatenate = function(yr, wk, d) {
        if(yr != undefined && wk != undefined && d != undefined)
        return yr.toString() + wk.toString() + d.toString();
    };


	//	EXECUTE
	console.log('in the admin engagment channel controller ');	    //  TODO: TAKE THIS OUT LATER


}
