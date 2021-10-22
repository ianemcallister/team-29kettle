ckc
    .controller('adminSelectChannelController', adminSelectChannelController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject', '$location'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject, $location) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	var vm = this;

    //  LOCAL FUNCTION S
    function downloadChannelData(id) {
        //  NOTIFY PROGRESS
        //console.log('got this key: ', id);

        //  LOCAL VARIABLES
        var readPath = "Channels/" + id;
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };



	//	VIEW MODEL VARIABLES
    vm.channelData = downloadChannelData($routeParams.channelId);
    vm.engagementsData = {
        "aiohgoihwes": {
            "Yr": 21,
            "Wk": 42,
            "D": 6,
            "date": "2021-10-17"
        },
        "osihaweo": {
            "Yr": 21,
            "Wk": 43,
            "D": 6,
            "date": "2021-10-24"
        }
    }
	//	VIEW MODEL FUNCTIONS
    vm.rowClock = function(id) {
        console.log(id);
        //$location.path('')
    }


	//	EXECUTE
	console.log('in the admin select channel controller ');	    //  TODO: TAKE THIS OUT LATER


}
