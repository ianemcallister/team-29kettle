ckc
    .controller('adminSelectChannelController', adminSelectChannelController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject', '$location', 'Database'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject, $location, Database) {

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

    Database.get.channelEngagments($routeParams.channelId).then(function(result) {
        vm.engagementsData = result;
    });


	//	VIEW MODEL VARIABLES
    vm.channelData = downloadChannelData($routeParams.channelId);
    

	//	VIEW MODEL FUNCTIONS
    vm.rowClick = function(id) {
        console.log(id);
        //$location.path('')
    }


	//	EXECUTE
	console.log('in the admin select channel controller ');	    //  TODO: TAKE THIS OUT LATER


}
