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

    vm.evaluateExpense = function(type, value) {
        console.log('evaluting Exenses');
        switch(type) {
            case "procVal":
                vm.projections.procVal = (vm.projections.procRate / 100) * vm.projections.revValue
                break;
            case "rentType":
                vm.projections.rentValue = value;
                break;
            case "cogRate":
                vm.projections.cogValue = (value / 100 ) * vm.projections.revValue;
                break;
            case "laborType":
                vm.projections.laborVal = value;
                break;
            case "commType":
                vm.projections.commValue = (value / 100) * vm.projections.revValue;
                break;
            case "discRate":
                vm.projections.discValue = (value / 100) * vm.projections.revValue;
                break;
            default:
                break;
        }
        _sumExpenses();
        _sumProfit();
    }

    function _sumExpenses() {
        
        vm.projections.expTotal =   parseFloat(vm.projections.procVal) + 
                                    parseFloat(vm.projections.rentValue) + 
                                    parseFloat(vm.projections.cogValue) +
                                    parseFloat(vm.projections.laborVal) +
                                    parseFloat(vm.projections.commValue) +
                                    parseFloat(vm.projections.discValue);
        //console.log('summing expenses', vm.projections.procVal, vm.projections.rentValue, vm.projections.expTotal);
    };

    function _sumProfit() {
        //console.log('summing profits');
        if(vm.projections.profit == undefined) vm.projections.profit = { value: 0, percentage: 0.00 };
        vm.projections.profit.value = vm.projections.revValue - vm.projections.expTotal
        vm.projections.profit.percentage = (vm.projections.profit.value / vm.projections.revValue)
    };
	
	//	EXECUTE
    //console.log('VM:', vm);

}
