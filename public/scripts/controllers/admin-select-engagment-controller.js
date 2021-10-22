ckc
    .controller('adminSelectEngagmentController', adminSelectEngagmentController);

	adminSelectEngagmentController.$inject = ['$routeParams', '$firebaseObject', '$location'];

/* @ngInject */
function adminSelectEngagmentController($routeParams, $firebaseObject, $location) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

    //  LOCAL FUNCTION S
    function downloadEngagmentData(id) {
        //  NOTIFY PROGRESS
        //console.log('got this key: ', id);

        //  LOCAL VARIABLES
        var readPath = "Engagments/" + id;
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };



	//	VIEW MODEL VARIABLES
    vm.engagmentData = downloadEngagmentData($routeParams.engagmentId);
    
	//	VIEW MODEL FUNCTIONS
    vm.rowClock = function(id) {
        console.log(id);
        //$location.path('')
    }


	//	EXECUTE
	console.log('in the admin engagment channel controller ');	    //  TODO: TAKE THIS OUT LATER


}
