ckc
    .controller('adminSelectChannelController', adminSelectChannelController);

	adminSelectChannelController.$inject = ['$routeParams', '$firebaseObject', '$location', 'engagemnts'];

/* @ngInject */
function adminSelectChannelController($routeParams, $firebaseObject, $location, engagemnts) {

	//	NOTIFY PROGRES
	console.log('$routeParams', $routeParams)

	//	LOCAL VARIABLES
	const vm        = this;
    const db        = firebase.database();
    const chanRef   = db.ref("Channels/" + $routeParams.channelId);
    const rolesRef  = db.ref('OpRoles');
    const ledgerRef = db.ref('Ledgers');

    //	VIEW MODEL VARIABLES
    vm.channelData      = $firebaseObject(chanRef);
    vm.allRoles         = $firebaseObject(rolesRef);
    vm.allLedgers       = $firebaseObject(ledgerRef);
    vm.engagementsData  = engagemnts;
    vm.newRLSelections  = { roleid: '', ledgerId: '' }

    //  LOCAL FUNCTION S
    

	//	VIEW MODEL FUNCTIONS
    vm.addRLMap = function(data) {
        console.log('adding role Ledger map', data);
        vm.channelData.ledgersMap[data.roleid] = data.ledgerId;
        vm.channelData.$save().then(function saveRLMap() {
            console.log('RL Map saved sucessfully');
            vm.newRLSelections  = { roleid: '', ledgerId: '' };
        });
    };

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
