
ckc.directive('dailyFundsCollected', dailyFundsCollected);

/* @ngInject */
function dailyFundsCollected() {
    //define the directive
    var directive = {
        restrict: "AECM",
        templateUrl: 'assets/views/directives/daily-funds-collected.htm',
        replace: true,
        scope: {
            date: "="
        },
        link: linkFunc,
        controller: dailyFundsCollectedController,
        controllerAs: 'vm',
        bindToController: true
    };

    /* @ngInject */
    function linkFunc(scope, el, attr, ctrl) {
        scope.$watch('date', function(newVal, oldVal) {
            scope.vm.loadPayments(scope.vm.date);

        })
    }
    
    dailyFundsCollectedController.$inject = ['$scope', '$log', 'Database', '$firebaseObject'];

    /* @ngInject */
    function dailyFundsCollectedController($scope, $log, Database, $firebaseObject) {
        //  NOTIFY PROGRESS
        console.log('in the daily funds collected directive');
        
        //  DEFINE LOCAL VARIABLES
        var vm = this;

        //  DEFINE LOCAL FUNCTIONS
        function loadTeamProfiles() {
            //  DEFINE LOCAL VARIABLS
            var readPath = "Members";
            var _db     = firebase.database();
            var ref     = _db.ref(readPath);
            return $firebaseObject(ref);
        };

        function _groupCollections(allPaymentCollections) {
            //  DEFINE LOCAL VARIABLES
            var returnObject = {};

            //  ITERATE OVER PAYMENTS
            Object.keys(allPaymentCollections).forEach(function(key) {
                
                //  DEFINE LOCAL VARIABLES
                var employeeId = allPaymentCollections[key].employeeId

                //  IS THERE AN EMPLOYEE ID?
                if(employeeId == undefined) {
                    
                    //  HAS THIS EMPLOYEE RECORD ALREADY BEEN CREATED
                    if(returnObject['UNKNOWN'] == undefined) {
                        //  IF NO...CREATE IT
                        returnObject['UNKNOWN'] = {
                            totalCollections: 0,
                            totalFundsCollected: 0,
                            totalSalesCollected: 0,
                            firstCollection: "",
                            lastCollection: "",
                            txs: {}
                        }
                    } 

                    returnObject['UNKNOWN'].txs[key] = allPaymentCollections[key];
                    returnObject['UNKNOWN'].totalCollections++;
                    returnObject['UNKNOWN'].totalFundsCollected += allPaymentCollections[key].totalMoney.amount;
                    returnObject['UNKNOWN'].totalSalesCollected += allPaymentCollections[key].amountMoney.amount;

                    if(allPaymentCollections[key].tipMoney != undefined) returnObject['UNKNOWN'].totalTipsCollected  += allPaymentCollections[key].tipMoney.amount;
                } else {
                    
                    //  HAS THIS EMPLOYEE RECORD ALREADY BEEN CREATED
                    if(returnObject[employeeId] == undefined) {
                        //  IF NO...CREATE IT
                        returnObject[employeeId] = {
                            totalCollections: 0,
                            totalFundsCollected: 0,
                            totalSalesCollected: 0,
                            totalTipsCollected: 0,
                            firstCollection: "",
                            lastCollection: "",
                            txs: {}
                        }
                    } 

                    returnObject[employeeId].txs[key] = allPaymentCollections[key];
                    returnObject[employeeId].totalCollections++;
                    returnObject[employeeId].totalFundsCollected += allPaymentCollections[key].totalMoney.amount;
                    returnObject[employeeId].totalSalesCollected += allPaymentCollections[key].amountMoney.amount;

                    if(allPaymentCollections[key].tipMoney != undefined) returnObject[employeeId].totalTipsCollected  += allPaymentCollections[key].tipMoney.amount;
                }

            });


            return returnObject;

        };

        //  DEFINE VIEW MODEL VARIABLES
        vm.paymentsCollected = '';
        vm.teamMemberProfiles = loadTeamProfiles();

        //  DEFINE VIEWMODEL FUNCTIONS
        $scope.vm.concatenateName = function(key) {
            //  NOTIFY PROGRESS
            //console.log('$scope.vm.concatenateName:', key);

            //  DEFINE LOCAL VARIABLES
            var returnString = "UNKNOWN";

            if(vm.teamMemberProfiles[key] != undefined) returnString = vm.teamMemberProfiles[key].firstName + " " + vm.teamMemberProfiles[key].lastName;
            
            return returnString;
        };

        $scope.vm.loadPayments = function(date) {
            Database.get.dailyCollections(date).then(function (result) {

                console.log(result);

                $scope.vm.paymentsCollected = result;
                $scope.vm.collectionsByTeamMember = _groupCollections(result);

            }).catch(function (error) {
                console.log('error: ', error);
            });
        };

        //  EXECUTE
        
    };

    return directive;		
};