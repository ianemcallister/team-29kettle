
ckc.directive('dailyAllocationsByEvent', dailyAllocationsByEvent);

/* @ngInject */
function dailyAllocationsByEvent() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/daily-allocations-by-event.htm',
        replace: true,
        scope: {
            date: "=",
            updates: "&"
        },
        link: linkFunc,
        controller: dailyAllocationsByEventController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {

        //Load events upon receipt of date
        scope.$watch('date', function(newVal, oldVal) { scope.vm.loadEngagments(scope.vm.date); });
    }
    
    dailyAllocationsByEventController.$inject = ['$scope', '$log'];

    /* @ngInject */
    function dailyAllocationsByEventController($scope, $log) {

        //  NOTIFY PROGRESS
        console.log('in the daily allocations by event directive');

        //  DEFINE LOCAL VARIABLES
        //  DEFINE LOCAL FUNCTIONS
        //  DEFINE VIEW MODEL VARIABLES
        
        //  DEFINE VIEW MODEL FUNCTIONS
        $scope.vm.loadEngagments = function() {
            //  NOTIFY PROGRESS
            console.log('loading engagments');
        };
    };

    return directive;		
};