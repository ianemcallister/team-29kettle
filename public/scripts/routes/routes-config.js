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
        controllerAs: 'vm'
    }) 
    .when('/dash', {
        templateUrl: 'assets/views/dashboard-page.htm',     //  dashboard Page View
        controller: 'dashboardController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    }) 
	.otherwise({
        redirectTo: '/'
    });
}

/*
*   REQUIRED FUNCTIONS
*
*/

