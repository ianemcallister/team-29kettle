
ckc.directive('listOfChannels', listOfChannels);

/* @ngInject */
function listOfChannels() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/list-of-channels.htm',
        replace: true,
        scope: {
            channels: "="
        },
        link: linkFunc,
        controller: listOfChannelsController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        scope.$watch('vm.channels', function loadChannelsData(newVal, oldVal) {
            
            
        });
        
    }
    
    listOfChannelsController.$inject = ['$scope', '$location'];

    /* @ngInject */
    function listOfChannelsController($scope, $location) {
        //  DEFINE LOCAL VARIABLES
        var vm = this;

        //  DEFINE VIEW MODEL VARIABLES
        vm.sortBy = 'name';
        vm.sortedChannels = []

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        vm.rowClicked = function(id) {
            //console.log(id);
            $location.path('/admin/channels/' + id);
        };

        console.log('in the list of channels directive', $scope);
    };

    return directive;		
};