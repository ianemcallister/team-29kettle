ckc
    .controller('adminChannelsController', adminChannelsController);

	adminChannelsController.$inject = ['$routeParams', '$firebaseObject', '$location'];

/* @ngInject */
function adminChannelsController($routeParams, $firebaseObject, $location) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

    //  LOCAL FUNCTIONS
    function downloadData() {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Channels";
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };

	//	VIEW MODEL VARIABLES
    vm.channelsData = downloadData();

	//	VIEW MODEL FUNCTIONS
    vm.rowClicked = function(id) {
        //console.log(id);
        $location.path('/admin/channels/' + id);
    };
    


	//	EXECUTE
	console.log('in the admin channels controller ');	    //  TODO: TAKE THIS OUT LATER


}
