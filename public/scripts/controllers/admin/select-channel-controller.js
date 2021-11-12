ckc
    .controller('adminSelectChannelController', adminSelectChannelController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject', '$location', 'engagemnts', 'moment'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject, $location, engagemnts, moment) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	const vm        = this;

    //	VIEW MODEL VARIABLES
    vm.channelData      = $firebaseObject(firebase.database().ref("Channels/" + $routeParams.channelId));
    vm.allChannels      = $firebaseObject(firebase.database().ref("Channels"));
    vm.chnlEngagments   = $firebaseObject(firebase.database().ref("Engagments").orderByChild('channelId').equalTo($routeParams.channelId));
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
    vm.newEngagmentsOptions = {
        type: "",
        instances: []
    }
    //  LOCAL FUNCTION S
    

	//	VIEW MODEL FUNCTIONS
    vm.saveData = function() {
        vm.channelData.$save().then(function success() {
            console.log('data saved successfully');
        }).catch(function failure(error) {
            console.log('Error Saving Data', error);
        })
    };

    vm.rowClick = function(id) {
        console.log(id);
        $location.path('/admin/engagments/' + id)
    };

    vm.sumEngagments = function(allEngagments) {
        var i = 0;
        Object.keys(allEngagments).forEach(function(keys) {
            i = keys.length;
        })
        return i;
    };

    vm.buildNewEngagments = function() {
        vm.newEngagmentsOptions.instances.push({
            d: 0, m: 0, y: 0, startsAtHr: 0, startsAtMn: 0, endsAtHr: 0, endsAtMn: 0
        })
    };

    vm.addNewEngagments = function() {
        //  iterate over list
        vm.newEngagmentsOptions.instances.forEach(function(date) {
            const newKey = firebase.database().ref('Engagments').push().key;
            const newDate = moment().local().year(date.y).month(date.m - 1).date(date.d).hour(0).minute(0).second(0);
            vm.chnlEngagments[newKey] = {
                channel:    vm.channelData.name,
                channelId:  $routeParams.channelId,
                closesAt:   newDate.hour(date.endsAtHr).minute(date.endsAtMn).second(0).format("HH:mm:ss") + newDate.hour(date.endsAtHr).minute(date.endsAtMn).format("Z"),
                d:          newDate.format('e'),
                date:       newDate.format('MM-DD-YYYY'),
                opensAt:    newDate.hour(date.startsAtHr).minute(date.startsAtMn).second(0).format("HH:mm:ss") + newDate.hour(date.endsAtHr).minute(date.endsAtMn).format("Z"),
                wk:         newDate.format('w'),
                yr:         newDate.format('YY')
            };
        });
        
        //  save the work
        vm.chnlEngagments.$save().then(function success() {
            console.log('new record saved successfully');
        }).catch(function failure(error) {
            console.log('error saving', error);
        });
    }


	//	EXECUTE
	console.log('in the admin select channel controller ');	    //  TODO: TAKE THIS OUT LATER

    

}
