/*
*	ROUTES-CONFIG
*
*	This module sets up all the required angular routes for this web app.
*/
angular
    .module('ckc')
    .config(config);

/* @ngInject */
function config($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
    $routeProvider

	//PUBLIC ROUTES
    .when('/', {
        redirectTo: '/login'
    })
    .when('/login', {
        templateUrl: 'assets/views/login-page.htm',     //  Login Page View
        controller: 'loginController',                  //  Login Page Controller
        controllerAs: 'vm',
        resolve: {
            State: function($location) {
                console.log('resolved')
                $location.path('/member/L1kSg6D6EIZP2ctV7bI0kEkZRAm2')
            }
        }
    }) 
    .when('/member/:uid', {
        templateUrl: 'assets/views/dashboard-page.htm',     //  dashboard Page View
        controller: 'dashboardController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    })
    /*.when('/member/:uid/channels/:chanelId', {
        templateUrl: 'assets/views/channel-page.htm',     //  dashboard Page View
        controller: 'channelController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    }) 
    .when('/member/:uid/resources', {
        templateUrl: 'assets/views/resource-page.htm',     //  dashboard Page View
        controller: 'resourceController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    }) 
    .when('/member/:uid/resources/:resourceId', {
        templateUrl: 'assets/views/resource-page.htm',     //  dashboard Page View
        controller: 'resourceController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    }) */
	.otherwise({
        redirectTo: '/'
    });
}

/*
*   REQUIRED FUNCTIONS
*
*/

