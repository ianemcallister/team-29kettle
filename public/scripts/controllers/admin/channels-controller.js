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

	//	VIEW MODEL VARIABLES
    vm.channelsData     = $firebaseObject(firebase.database().ref('Channels'));
    vm.routeParams      = $routeParams;
    vm.newRecord        = { name: "", type: "" };

	//	VIEW MODEL FUNCTIONS
    vm.rowClicked = function(id) {
        //console.log(id);
        $location.path('/admin/channels/' + id);
    };
    
    vm.addChannel = function() {
        const newKey = firebase.database().ref('Channels').push().key;
        vm.channelsData[newKey] = vm.newRecord;
        vm.channelsData.$save().then(function success() {
            console.log('new record saved successfully');
        }).catch(function failure(error) {
            console.log('error saving', error);
        });
    }


	//	EXECUTE
	console.log('in the admin channels controller ');	    //  TODO: TAKE THIS OUT LATER


}
