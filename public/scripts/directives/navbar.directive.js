
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
    function ckcNavbarController($scope, $log, Auth) {

        //  define view model variables
        var vm = this;

        console.log('in the navbar directive');

        Auth.$onAuthStateChanged(user => {
            console.log('user: ', user);
        })

        vm.logout = function() {
            console.log('logging out');
            Auth.$signOut();
        }
        
    };

    return directive;		
};