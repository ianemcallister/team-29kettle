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
        redirectTo: '/member'
    })
    .when('/login', {
        templateUrl: 'assets/views/login-page.htm',     //  Login Page View
        controller: 'loginController',                  //  Login Page Controller
        controllerAs: 'vm'
    }) 
    .when('/member', {
        templateUrl: 'assets/views/dashboard-page.htm',     //  dashboard Page View
        controller: 'dashboardController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            //  CHECK FOR LOGGED IN STATE
            user: function(State, $q, $location) {
                var def = $q.defer();
                State.user().then(function(user) {

                    if(user) {
                        $location.path('/member/' + user.uid);
                        def.resolve();
                    } else {
                        $location.path('/login');
                        def.resolve();
                    }

                });
                return def.promise;
            }
        }
    })
    .when('/member/:uid', {
        title: "Dashboard",
        templateUrl: 'assets/views/dashboard-page.htm',     //  dashboard Page View
        controller: 'dashboardController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            //  CHECK FOR LOGGED IN STATE
            user: function(State, $q, $location) {
                var def = $q.defer();
                State.user().then(function(user) {

                    if(user) {
                        $location.path('/member/' + user.uid);
                        def.resolve();
                    } else {
                        $location.path('/login');
                        def.resolve();
                    }

                });
                return def.promise;
            }
        }
    })
    .when('/member/:uid/settings', {
        templateUrl: 'assets/views/acct-settings-page.htm',     //  dashboard Page View
        controller: 'acctSettingsController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            //  CHECK FOR LOGGED IN STATE
            user: function(State, $q, $location) {
                var def = $q.defer();
                State.user().then(function(user) {

                    if(user) {
                        $location.path('/member/' + user.uid +'/settings');
                        def.resolve();
                    } else {
                        $location.path('/login');
                        def.resolve();
                    }

                });
                return def.promise;
            }
        }
    })
    .when('/member/:uid/txs_assignments', {
        templateUrl: 'assets/views/txs-assigments-page.htm',     //  dashboard Page View
        controller: 'txsAssigmentsController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            //  CHECK FOR LOGGED IN STATE
            user: function(State, $q, $location) {
                var def = $q.defer();
                State.user().then(function(user) {

                    if(user) {
                        $location.path('/member/' + user.uid +'/txs_assignments');
                        def.resolve();
                    } else {
                        $location.path('/login');
                        def.resolve();
                    }

                });
                return def.promise;
            }
        }
    })
    .when('/member/:uid/activities', {
        templateUrl: 'assets/views/activities-page.htm',     //  dashboard Page View
        controller: 'activitiesController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            //  CHECK FOR LOGGED IN STATE
            user: function(State, $q, $location) {
                var def = $q.defer();
                State.user().then(function(user) {

                    if(user) {
                        $location.path('/member/' + user.uid +'/activities');
                        def.resolve();
                    } else {
                        $location.path('/login');
                        def.resolve();
                    }

                });
                return def.promise;
            }
        }
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
    .when('/minishop/:engmntId/:channelId/', {
        templateUrl: 'assets/views/minishop/mdashboard-page.htm',
        controller: 'minishopDashController',
        controllerAs: 'vm'
    })
    .when('/minishop/:engmntId/:channelId/settings', {
        templateUrl: 'assets/views/minishop/settings-page.htm',
        controller: 'minishopStngsController',
        controllerAs: 'vm'
    })
    .when('/minishop/:engmntId/:channelId/production', {
        title: "Minishop: Production",
        templateUrl: 'assets/views/minishop/production-page.htm',
        controller: 'minishopProductionController',
        controllerAs: 'vm'
    })
    .when('/minishop/:engmntId/:channelId/salesTxs', {
        templateUrl: 'assets/views/minishop/sales-txs-page.htm',
        controller: 'minishopSalesTxsController',
        controllerAs: 'vm'
    })
    .when('/minishop/:engmntId/:channelId/balanceSheet', {
        templateUrl: 'assets/views/minishop/balancesheet-page.htm',
        controller: 'minishopBalancesheetController',
        controllerAs: 'vm'
    })
    .when('/minishop/:engmntId/:channelId/power', {
        templateUrl: 'assets/views/minishop/power-source-page.htm',
        controller: 'minishopPowerSourceController',
        controllerAs: 'vm'
    })
    .when('/admin/channels', {
        title: "Admin: Channels",
        templateUrl: 'assets/views/admin/channels-page.htm',     //  dashboard Page View
        controller: 'adminChannelsController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    })
    .when('/admin/channels/:channelId', {
        title: "Admin: Channels",
        templateUrl: 'assets/views/admin/select-channel-page.htm',     //  dashboard Page View
        controller: 'adminSelectChannelController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            engagemnts: function(Database, $q, $route) {
                var def = $q.defer();
                Database.get.channelEngagments($route.current.params.channelId).then(function(result) {
                    console.log('got this', result);
                    def.resolve(result);
                });
                return def.promise;
            }
        }
    })
    .when('/admin/engagments/:engagmentId', {
        title: "Engagment",
        templateUrl: 'assets/views/admin/select-engagment-page.htm',     //  dashboard Page View
        controller: 'adminSelectEngagmentController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    })
    .when('/admin/schedule/weekly', {
        templateUrl: 'assets/views/admin-weekly-schedule-page.htm',     //  dashboard Page View
        controller: 'adminWeeklyScheduleController',                  //  dashboard Page Controller
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            engagemnts: function(Database, $q, $route) {
                console.log('routing: ',$route.current.params.Wk)
                var def = $q.defer();
                Database.get.weeklyEngagments($route.current.params.Wk).then(function(result) {
                    console.log('got this', result);
                    def.resolve(result);
                });
                return def.promise;
            }
        }
    }) 
    .when('/admin/fundsAllocations/daily', {
        templateUrl: 'assets/views/admin-funds-allocations-daily-page.htm',     //  dashboard Page View
        controller: 'adminFundsAllocationsDailyController',                  //  dashboard Page Controller
        controllerAs: 'vm'/*,
        resolve: { /* @ngInject */
            /*engagements: function(Database, $q, $route) {
                //console.log('routing: ',$route.current.params.date)
                var def = $q.defer();
                Database.get.dailyEngagments($route.current.params.date).then(function(result) {
                    console.log('got these engagments:', result);
                    def.resolve(result);
                });
                return def.promise;
            }
        }*/
    })
    .when('/admin/accts', {
        title: "Admin: Accounts",
        templateUrl: 'assets/views/admin/accts-manage-page.htm',     //  dashboard Page View
        controller: 'adminAcctsManageController',                  //  dashboard Page Controller
        controllerAs: 'vm'
    })
    .when('/admin/BoM', {
        title: "Admin: Bill Of Materials",
        templateUrl: 'assets/views/admin/bom-list-page.htm',
        controller: 'adminBoMListController',
        controllerAs: "vm"
    })
    .when('/admin/BoM/:bomId', {
        title: "Admin: Bill Of Materials",
        templateUrl: 'assets/views/admin/a-bom-page.htm',
        controller: 'adminABoMController',
        controllerAs: "vm"
    })
    .when('/admin/operationRoles', {
        title: "Admin: Roles",
        templateUrl: 'assets/views/admin/opRoles-list-page.htm',
        controller: 'adminOpRolesListContoller',
        controllerAs: "vm"
    })
    .when('/admin/ledgers', {
        title: "Admin: Ledgers",
        templateUrl: "assets/views/admin/ledgers-list-page.htm", 
        controller: 'adminLedgerslistController',
        controllerAs: "vm"
    })
	.otherwise({
        redirectTo: '/'
    });
}

/*
*   REQUIRED FUNCTIONS
*
*/

