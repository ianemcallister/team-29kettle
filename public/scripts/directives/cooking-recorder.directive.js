
ckc.directive('cookingRecorder', cookingRecorder);

/* @ngInject */
function cookingRecorder() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/minishop/directives/cookingRecorder.htm',
        replace: true,
        scope: {
        },
        link: linkFunc,
        controller: cookingRecorderController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        
    }
    
    cookingRecorderController.$inject = [];

    /* @ngInject */
    function cookingRecorderController() {
        //  NOTIFY PROGRES
        console.log('in the Cooking Recorder Directive');

        //  DEFINE LOCAL VARIABLES
        var vm = this;
        vm.options = {
            "1s09ugasoigas": { "title": "", "recipe": "Sweet & Salty", "nut": "Pecans" },
            "paosjg;oiahwe": { "title": "", "recipe": "Sweet & Salty", "nut": "Almonds" },
            "pejsg09u2nssd": { "title": "", "recipe": "Sweet & Salty", "nut": "Cashews" },
            "029ugojsdohbs": { "title": "", "recipe": "Sweet & Salty", "nut": "Hazelnuts" },
            "Moshdwebosi13": { "title": "", "recipe": "Bourbon", "nut": "Pecans" },
            "923NGashigbsd": { "title": "", "recipe": "Bourbon", "nut": "Almonds" },
            "jweoi2#9ssdgw": { "title": "", "recipe": "Bourbon", "nut": "Cashews" },
            "2ANSgih3sh2#-": { "title": "", "recipe": "Bourbon", "nut": "Hazelnuts" }
        }

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        
    };

    return directive;		
};