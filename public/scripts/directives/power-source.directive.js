
ckc.directive('powerSource', powerSource);

/* @ngInject */
function powerSource() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/minishop/directives/powerSource.htm',
        replace: true,
        scope: {
        },
        link: linkFunc,
        controller: powerSourceController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        
    }
    
    powerSourceController.$inject = [];

    /* @ngInject */
    function powerSourceController() {
        //  NOTIFY PROGRES
        console.log('in the Power Source Directive');

        //  DEFINE LOCAL VARIABLES
        var vm = this;
        

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        
        
    };

    return directive;		
};