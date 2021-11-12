ckc
    .controller('txsAssigmentsController', txsAssigmentsController);

	txsAssigmentsController.$inject = ['$firebaseObject', '$location', 'moment'];

/* @ngInject */
function txsAssigmentsController($firebaseObject, $location, moment) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.user 				= firebase.auth().currentUser;
	vm.currentDate 			= new Date();
	vm.allTeamMembers 		= $firebaseObject(firebase.database().ref("Members"))
	vm.dailyFundsCollected 	= $firebaseObject(firebase.database().ref('FundsCollected').orderByChild('refDate').equalTo(moment(vm.currentDate).format("YYYY-MM-DD")));
	vm.dailyEngagments 		= $firebaseObject(firebase.database().ref('Engagments').orderByChild('date').equalTo(moment(vm.currentDate).format("YYYY-MM-DD")));

	//	VIEW MODEL FUNCTIONS
	vm.searchDate = function(date) {
		let newDate = moment();

		if(date != undefined) {
			newDate = moment(new Date(date));
			console.log(date, 'searching date', newDate.format());

			vm.dailyFundsCollected 	= $firebaseObject(firebase.database().ref('FundsCollected').orderByChild('refDate').equalTo(newDate.format("YYYY-MM-DD")));
			vm.dailyEngagments 		= $firebaseObject(firebase.database().ref('Engagments').orderByChild('date').equalTo(newDate.format("YYYY-MM-DD")));

		}
		
		
	}

	vm.openEngament = function(key) {
		const url = '/admin/engagments/' + key;
		$location.path(url);
	}

	//	EXECUTE
	console.log('in the txsAssigmentsController  controller ');	    //  TODO: TAKE THIS OUT LATER


}
