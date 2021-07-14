
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

        //  Listen for state changes
        Auth.$onAuthStateChanged(user => {
            console.log('user: ', user);
            vm.user = user;
        });

        vm.menuClick = function(selection) {
            //  DEFINE LOCAL VARIABLES
            switch(selection) {
                case "Menu":
                    console.log('Menu clicked');
                    $location.path('/member/' + vm.user.uid)
                    break;
                case "Reports":
                    console.log('Reports Clicked');
                    break;
                case "Settings":
                    console.log('settings clicked');
                    $location.path('/member/' + vm.user.uid + '/settings')
                    break;
                case "Login":
                    console.log('logging in');
                    $location.path('/login');
                    break;
                case "LogOut":
                    console.log('logging out');
                    Auth.$signOut();
                    $location.path('/login');
                    break;
                default:
                    break;
            }
        };
        
    };

    return directive;		
};