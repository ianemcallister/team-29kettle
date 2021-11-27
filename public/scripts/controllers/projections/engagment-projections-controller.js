/*
*   ENGAGMENT PROJECTIONS CONTROLLER
*
*   This controller is used to monitor and assign values for engagment projectsions of revenue, expenses, and
*   production supplies.
*
*   This controller requires the following resources:
*       - Engagment object from Engagments collection
*       - Projection object from Projetions collection
*       - 
*   
*   Flow:
*       1. Page Load: Is there a 
*/


ckc
    .controller('engagmentProjetionsController', engagmentProjetionsController);

	engagmentProjetionsController.$inject = ['$routeParams', '$firebaseObject', '$scope', 'data'];

/* @ngInject */
function engagmentProjetionsController($routeParams, $firebaseObject, $scope, data) {

	//	NOTIFY PROGRES
    console.log('in the engagment projections  controller ', $routeParams);

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

    data.loadChildObject('Projections', 'id', $routeParams.engagmentId)
        .then(function projectionsSuccess(fbObject) {
            //console.log('loaded engagments successfully', fbObject);
            fbObject.$bindTo($scope, 'vm.projections');

        }).catch(function projectionsError(e) {
            console.log('projections error', e);
        });

	//	VIEW MODEL VARIABLES
    vm.user         = firebase.auth().currentUser;
    vm.routeParams  = $routeParams;
     

	//	VIEW MODEL FUNCTIONS
    vm.updateRev = function(type) {
        console.log('changing type', type);
 
    };
    
    vm.weekNum = function(wk, yr, d) {
        //console.log('calculating weeknum', wk, yr, d);

        let returnvalue = "";
        if(wk != undefined && yr != undefined && d != undefined) returnvalue = yr.toString() + wk.toString().padStart(2, "0") + d.toString();
        return returnvalue;
    }
	
	//	EXECUTE
    //console.log('VM:', vm);

}
