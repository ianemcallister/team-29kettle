
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
            "1s09ugasoigas": { "title": "", "recipe": "Sweet & Salty", "nut": "Pecans", "style": { 'background-color': '#0000ff'} },
            "paosjg;oiahwe": { "title": "", "recipe": "Sweet & Salty", "nut": "Almonds", "style": { 'background-color': '#0000ff'}},
            "pejsg09u2nssd": { "title": "", "recipe": "Sweet & Salty", "nut": "Cashews", "style": { 'background-color': '#0000ff'} },
            "029ugojsdohbs": { "title": "", "recipe": "Sweet & Salty", "nut": "Hazelnuts", "style": { 'background-color': '#0000ff'} },
            "Moshdwebosi13": { "title": "", "recipe": "Bourbon", "nut": "Pecans", "style": { 'background-color': '#0000ff'} },
            "923NGashigbsd": { "title": "", "recipe": "Bourbon", "nut": "Almonds", "style": { 'background-color': '#0000ff'} },
            "jweoi2#9ssdgw": { "title": "", "recipe": "Bourbon", "nut": "Cashews", "style": { 'background-color': '#0000ff'} },
            "2ANSgih3sh2#-": { "title": "", "recipe": "Bourbon", "nut": "Hazelnuts", "style": { 'background-color': '#0000ff'} }
        }

        //  DEFINE LOCAL METHODS
        //  DEFINE VIEW MODEL METHODS
        vm.swiped= function(index) {
            console.log(index, "swiped");
        }
        
    };

    return directive;		
};