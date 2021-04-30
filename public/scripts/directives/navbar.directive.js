
ckc.directive('ckcNavbar', ckcNavbar);

/* @ngInject */
function ckcNavbar() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/navbar.htm',
        replace: true,
        scope: {
        },
        link: linkFunc,
        controller: ckcNavbarController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        
    }
    
    ckcNavbarController.$inject = ['$scope', '$log', 'Auth'];

    /* @ngInject */
    function ckcNavbarController($scope, $log) {

        console.log('in the navbar directive');
        
    };

    return directive;		
};