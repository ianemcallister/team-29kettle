
ckc.directive('ckcFooter', ckcFooter);

/* @ngInject */
function ckcFooter() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/footer.htm',
        replace: true,
        scope: {
        },
        link: linkFunc,
        controller: ckcFooterController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        
    }
    
    ckcFooterController.$inject = ['$scope', '$log'];

    /* @ngInject */
    function ckcFooterController($scope, $log) {

        console.log('in the footer directive');
    };

    return directive;		
};