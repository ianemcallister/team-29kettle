
ckc.directive('activity', activity);

/* @ngInject */
function activity() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/activity.htm',
        replace: true,
        scope: {
        },
        link: linkFunc,
        controller: activityController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        
    }
    
    activityController.$inject = ['State', "$location"];

    /* @ngInject */
    function activityController(State, $location) {
        //  DEFINE LOCAL VARIABLES
        var vm = this;

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        vm.buttons = function(id) {
            //  NOTIFY PROGRESS
            console.log('Clicked ', id);

            switch(id) {
                case "selectActivity":
                    $location.path('/member/' + State.uid + "/activities")
                    break;
                default:
                    break;
            }
        };

        console.log('in the activity directive');
    };

    return directive;		
};