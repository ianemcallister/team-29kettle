ckc
    .controller('engagmentProjetionsController', engagmentProjetionsController);

	engagmentProjetionsController.$inject = ['$routeParams'];

/* @ngInject */
function engagmentProjetionsController($routeParams) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

	//	VIEW MODEL VARIABLES
	vm.routeParams = $routeParams;
	vm.user = firebase.auth().currentUser;

	//	VIEW MODEL FUNCTIONS
	
	//	EXECUTE
	console.log('in the engagment projections  controller ');	    //  TODO: TAKE THIS OUT LATER


}
