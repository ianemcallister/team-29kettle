ckc
    .controller('adminSelectChannelController', adminSelectChannelController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject', '$location', 'engagemnts'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject, $location, engagemnts) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	const vm        = this;

    //	VIEW MODEL VARIABLES
    vm.channelData      = $firebaseObject(firebase.database().ref("Channels/" + $routeParams.channelId));
    vm.allChannels      = $firebaseObject(firebase.database().ref("Channels"));
    vm.engagementsData  = engagemnts;
    vm.newRLSelections  = { roleid: '', ledgerId: '' }
    vm.frequency = {
        0: "Daily",
        1: "Weekly",
        2: "Bi-Weekly",
        3: "Monthly",
        4: "Yearly",
        5: "Other"
    };
    //  LOCAL FUNCTION S
    

	//	VIEW MODEL FUNCTIONS
    vm.saveData = function() {
        vm.channelData.$save().then(function success() {
            console.log('data saved successfully');
        }).catch(function failure(error) {
            console.log('Error Saving Data', error);
        })
    }

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
