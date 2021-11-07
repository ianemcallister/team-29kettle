ckc
    .controller('adminSelectChannelController', adminSelectChannelController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject', '$location', 'engagemnts'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject, $location, engagemnts) {

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
    vm.engagementsData = engagemnts;


	//	VIEW MODEL FUNCTIONS
    vm.rowClick = function(id) {
        console.log(id);
        $location.path('/admin/engagments/' + id)
    }

    vm.sumEngagments = function(allEngagments) {
        var i = 0;
        Object.keys(allEngagments).forEach(function(keys) {
            i = keys.length;
        })
        return i;
    }


	//	EXECUTE
	console.log('in the admin select channel controller ');	    //  TODO: TAKE THIS OUT LATER

    

}
