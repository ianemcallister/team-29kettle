ckc
    .controller('adminSelectChannelController', adminChannelsController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
    vm.channelData = downloadData();

	//	VIEW MODEL FUNCTIONS
    function downloadData() {
        //  NOTIFY PROGRESS
        //console.log('got this UID: ', uid);
        //  LOCAL VARIABLES
        var readPath = "Channels/";
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };


	//	EXECUTE
	console.log('in the admin select channel controller ');	    //  TODO: TAKE THIS OUT LATER


}
