
ckc.directive('engSalesProjActlComp', engSalesProjActlComp);

/* @ngInject */
function engSalesProjActlComp() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/engagment-SPA-Comp.htm',
        replace: true,
        scope: {
            engagments: "="
        },
        link: linkFunc,
        controller: engSalesProjActlCompController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        scope.$watch('engagments', function(newVal, oldVal) { 
            Object.keys(scope.vm.engagments).forEach(function(key) {
                scope.vm.engagments[key].engagmentId = key;
                scope.vm.engagmentsList.push(scope.vm.engagments[key]);
            });
            scope.vm.engagmentsList.sort(function (a, b) {
                let momentA = moment(a.date);
                let momentB = moment(b.date);
                if(momentA > momentB) { return -1 }
                if(momentB > momentA) { return 1 }
                return 0;   //  must be equal
            });
            scope.vm.buildReportsList();
        });
    }
    
    engSalesProjActlCompController.$inject = ["$location", '$firebaseObject'];

    /* @ngInject */
    function engSalesProjActlCompController($location, $firebaseObject) {
        //  NOTIFY PROGRESS
        console.log('in the engSalesProjActlCompController directive');

        //  DEFINE LOCAL VARIABLES
        var vm = this;

        //  DEFINE VIEW MODEL VARIABLES
        vm.engagmentsList   = [];
        vm.reports          = [];

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        vm.weekNum = function(wk, yr, d) {
            //console.log('calculating weeknum', wk, yr, d);
    
            let returnvalue = "";
            if(wk != undefined && yr != undefined && d != undefined) returnvalue = yr.toString() + wk.toString().padStart(2, "0") + d.toString();
            return returnvalue;
        }

        vm.rowClick = function(id) {
            console.log(id);
            $location.path('/admin/engagments/' + id)
        };

        vm.buildReportsList = function() {
            vm.engagmentsList.forEach(function(engagment) {
                vm.reports.push($firebaseObject(firebase.database().ref('Reports/' + engagment.engagmentId)))
            });
        };
        
    };

    return directive;		
};