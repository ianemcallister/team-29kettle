
ckc.directive('dailyFundsCollected', dailyFundsCollected);

/* @ngInject */
function dailyFundsCollected() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/daily-funds-collected.htm',
        replace: true,
        scope: {
            date: "="
        },
        link: linkFunc,
        controller: dailyFundsCollectedController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        scope.$watch('date', function(newVal, oldVal) {
            scope.vm.loadPayments(scope.vm.date);

        })
    }
    
    dailyFundsCollectedController.$inject = ['$scope', '$log', 'Database'];

    /* @ngInject */
    function dailyFundsCollectedController($scope, $log, Database) {
        //  NOTIFY PROGRESS
        console.log('in the daily funds collected directive');
        
        //  DEFINE LOCAL VARIABLES
        var vm = this;

        //  DEFINE VIEW MODEL VARIABLES
        vm.paymentsCollected = '';

        //  DEFINE VIEWMODEL FUNCTIONS
        $scope.vm.loadPayments = function(date) {
            Database.get.dailyCollections(date).then(function (result) {
                $scope.vm.paymentsCollected = result;
            }).catch(function (error) {
                console.log('error: ', error);
            });
        };

        //  EXECUTE
        
        
        
    };

    return directive;		
};