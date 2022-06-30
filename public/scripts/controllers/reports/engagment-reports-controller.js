/*
*   ENGAGMENT REPORTS CONTROLLER
*
*   This controller is 
*
*   
*   
*   
*/


ckc
    .controller('engagmentReportsController', engagmentReportsController);

	engagmentReportsController.$inject = ['$routeParams', '$firebaseObject', '$scope', 'data'];

/* @ngInject */
function engagmentReportsController($routeParams, $firebaseObject, $scope, data) {

	//	NOTIFY PROGRES
    console.log('in the engagment REPORTS  controller ', $routeParams);

	//	LOCAL VARIABLES
	let vm          = this;

    //  LOAD DATA
    data.loadDirectObject('Engagments', $routeParams.engagmentId)
        .then(function engagmentsSuccess(fbObject) {
            //console.log('loaded engagments successfully', fbObject);
            fbObject.$bindTo($scope, 'vm.engagment');
        }).catch(function engagmentsError(e) {
            console.log('engagments error', e);
        });

    data.loadChildObject('Reports', 'id', $routeParams.engagmentId)
        .then(function projectionsSuccess(fbObject) {
            //console.log('loaded engagments successfully', fbObject);
            fbObject.$bindTo($scope, 'vm.reports');

        }).catch(function projectionsError(e) {
            console.log('reports error', e);
        });

	//	VIEW MODEL VARIABLES
    vm.user         = firebase.auth().currentUser;
    vm.routeParams  = $routeParams;
    vm.teamMembers  = $firebaseObject(firebase.database().ref('Members'));

	//	VIEW MODEL FUNCTIONS
    vm.weekNum = function(wk, yr, d) {
        //console.log('calculating weeknum', wk, yr, d);

        let returnvalue = "";
        if(wk != undefined && yr != undefined && d != undefined) returnvalue = yr.toString() + wk.toString().padStart(2, "0") + d.toString();
        return returnvalue;
    }
	
	//	EXECUTE
    //console.log('VM:', vm);

}
