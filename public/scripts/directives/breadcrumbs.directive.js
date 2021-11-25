
ckc.directive('breadcrumbs', breadcrumbs);

/* @ngInject */
function breadcrumbs() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/breadcrumbs.htm',
        replace: true,
        scope: {
            previous: "=",
            current: "@"
        },
        link: linkFunc,
        controller: breadcrumbsController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        
    }
    
    breadcrumbsController.$inject = ['$scope'];

    /* @ngInject */
    function breadcrumbsController($scope) {
        //  DEFINE LOCAL VARIABLES
        var vm = this;

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        

        console.log('in the breadcrumbs directive', $scope);
    };

    return directive;		
};