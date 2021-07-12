
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
    
    ckcNavbarController.$inject = ['$scope', '$log', '$location', 'Auth'];

    /* @ngInject */
    function ckcNavbarController($scope, $log, $location, Auth) {

        //  define view model variables
        var vm = this;
        vm.user = null;

        console.log('in the navbar directive');

        Auth.$onAuthStateChanged(user => {
            console.log('user: ', user);
            vm.user = user;
        })

        vm.logOut = function() {
            console.log('logging out');
            Auth.$signOut();
            $location.path('/login');
        }

        vm.logIn = function() {
            console.log('logging in');
            $location.path('/login');
        }
        
    };

    return directive;		
};