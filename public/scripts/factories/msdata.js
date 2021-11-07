/*
*	MINI SHOP DATA SERVICE
*
*   This service handles all the data for all of the MiniShop operations
*/

//  DEFINE MODULE
ckc.factory('msData', msData);

/*
*   DEPENDENCY INJECTION
*
*   All of these functions/modules must be injectd for use
*   
*   $interval: used to launch recurring actions
*   $firebaseObject: used to bind client side models to the databsse models
*   $routeParams: used to gather imporant state variables
*   moment: used to proces dates
*/
msData.$inject = ['$interval', '$firebaseObject', '$routeParams', '$rootScope','$q' ,'moment', 'Firebase'];

/*
*   DECLARE THE SERVICE
*
*   All of the injected modules are now provided to the service
*/  
/* @ngInject */
function msData($interval, $firebaseObject, $routeParams, $rootScope, $q, moment, Firebase) {

    /*
    *   NOTIFY PROGRESS
    *
    *   This is where we notify the progres that is being made
    */  

    /*
    *   DEFINE LOCAL VARIALES
    *
    *   All local variables are descried here
    * 
    *   self    {object}    refernces back to this module
    *   data    {object}    all the data required for the Mini Shop can be found here      
    */  
    var self = this;
    self.templates = {
        prodReport: {
            ondeck:         { "_hold": "" },
            cooking:        { "_hold": "" },
            cooling:        { "_hold": "" },
            engagmentId:    '',
            channelName:    '',
            channelId:      '',
            yrWk:           0,
            status:         '',
            journalEntries: { "_hold": "" },
            ledgersMap:     { "_hold": "" },
            lastStatus:     "Off"
        },
        cookingJE: {
            id:         '',
            startAt:    '',
            endedAt:    '',
            type:       'cooking',
            recipe:     '',
            nut:        '',
            engagmentId:'',
            channelId:  '',
            channelName:'',
            yrwk:       '',
            teamMembrId:'',
            teamMemName:'',
            temperature:0,
            wind:       '',
            powerSource:'',
            BoMId:      '',
            isComplete: false,
            txs:        {}
        },
        cookingTx: {
            journalEntryId: '',
            ledgerId:         '',
            createdAt:      '',
            updatedAt:      '',
            createdBy:      '',
            updatedBy:      '',
            debit:          0,
            credit:         0,
            description:    '',
            engagmentId:    '',
            channelName:    '',
            channelId:      ''
        }
    };
    self.data = {
        power: {
            isOn: _loadFBObject('Engagments/' + $routeParams.engmntId + '/power/isOn'),
            source: _loadFBObject('Engagments/' + $routeParams.engmntId + '/power/source'),
            txs: _loadFBObject('Engagments/' + $routeParams.engmntId + '/power/txs')
        },
        production: {
            report: _loadProdReport($routeParams.engmntId, $routeParams.channelId)
        }
    };
    self.models = {
        operations: {
            0: {type: "recipe", recipe: "Sweet & Salty",    nut: "Pecans",      startAt: "", endAt: "", expiresAt: "", bomid: "-MmdKHDHWZAwg3TZbKmL" },
            1: {type: "recipe", recipe: "Sweet & Salty",    nut: "Almonds",     startAt: "", endAt: "", expiresAt: "", bomid: "" },
            2: {type: "recipe", recipe: "Sweet & Salty",    nut: "Cashews",     startAt: "", endAt: "", expiresAt: "", bomid: "" },
            3: {type: "recipe", recipe: "Sweet & Salty",    nut: "Hazelnuts",   startAt: "", endAt: "", expiresAt: "", bomid: "" },
            4: {type: "recipe", recipe: "Bourbon",          nut: "Pecans",      startAt: "", endAt: "", expiresAt: "", bomid: "-MnvKrSaKkbyRpMRDNRe" },
            5: {type: "recipe", recipe: "Bourbon",          nut: "Almonds",     startAt: "", endAt: "", expiresAt: "", bomid: "" },
            6: {type: "recipe", recipe: "Bourbon",          nut: "Cashews",     startAt: "", endAt: "", expiresAt: "", bomid: "" },
            7: {type: "recipe", recipe: "Bourbon",          nut: "Hazelnuts",   startAt: "", endAt: "", expiresAt: "", bomid: "" },
            8: {type: "oprtns", proces: "warming",                              startAt: "", endAt: ""  },
            9: {type: "oprtns", proces: "cleaning",                             startAt: "", endAt: ""  },
            10:{type: "oprtns", proces: "off",                                  startAt: ""  },
            11:{type: "errors", proces: "burnt",                                startAt: ""  }
        }
    }
    
    /*
    *   DEFINE MODULE
    *
    *   Components of the service must be defined here in order to be available outside of the server.
    * 
    *   data: [object] is a value store, making variables available throughout the application
    *   power: [ojbect] all functions pertaining to the power needs of a mini shop can be found here
    */  
    var msDataMod = {
        _loadFBObject:          _loadFBObject,
        _loadProdReport:        _loadProdReport,
        _getPowerTxKey:         _getPowerTxKey,
        data:                   self.data,
        models:                 self.models,
        templates:              self.templates,
        power: {
            togglePower:        togglePower
        },
        production: {
            journalBatchStart:  journalBatchStart,
            journalBatchEnd:    journalBatchEnd
        }
    };

    /*
    *   PRIVATE: LOAD FIREBASE OBJECT
    *
    *   This function helps to load firebase objects
    *   @param  string      readPath: Is the firebase path to be reading out. i.e. "Engagments/-MmdUpXPxFhM7q6JiQ8-"
    *   @return object      @firebaseObject: 2-way binding with database at the given path, and accesible within the
    *                           application      
    *   @see    (n/a)
    */  
    function _loadFBObject(readPath) {
        var _db     = firebase.database();
        var ref     = _db.ref(readPath);
        return $firebaseObject(ref);
    };

    /*
    *   PRIVATE: LOAD PRODUCTION REPORT
    *
    *   Each engagment gets one production report.
    * 
    *   @param  string              i.e. "-ashoi#sy8nGbsad-wbg" is a key for a database object
    *   @return $FirebaseObject     a 2-way binding object with the database
    */
    function _loadProdReport(engagmentId, channelId) {
        
        const def                   = $q.defer();
        const db                    = firebase.database();
        const ref                   = db.ref('ProductionReports/' + engagmentId);
        const prodReportRecord      = $firebaseObject(ref);
        
        return prodReportRecord;
    };


    /*
    *   PRIVATE: GET POWER TX KEY
    *
    */
    function _getPowerTxKey() {
		return moment().format("x");
    }

    /*
    *   PUBLIC: TOGGLE POWER
    *
    *   This function toggles the power when it is switched on or off.
    */
    function togglePower() {

        //  NOTIFY PROGRESS
        console.log('toggling power');

        //  1) TOGGLE THE STATE
        self.data.power.isOn.$value = !self.data.power.isOn.$value;

        //  2) CREATE A NEW POWER TRANSACTION
        const newTimestamp = moment().format()
        self.data.power.txs[_getPowerTxKey()] = {
			timestamp: newTimestamp,
			source: self.data.power.source.$value,
			turningOn: self.data.power.isOn.$value
		};

        //  3) SAVE THE NEW TRANSACTION
        self.data.power.isOn.$save();
        self.data.power.txs.$save();

        //  3) REBUILD PROGRESS BARS
        $rootScope.$broadcast('powerTxsLoaded', self.data.power.txs)

    };

    /*
    *   PUBLIC: JOURNAL BATCH START
    *
    *   This 
    */
    function journalBatchStart(productionData) {
        
        //  DEFINE LOCAL VARIABLES
        const BoMreadPath   = '/BOMs/' + productionData.cooking.bomid;
        //const db            = firebase.database();
        //const BoMref        = db.ref(BoMreadPath);
        const allUpdates    = {};
        const newJE         = {
            id:         firebase.database().ref().child("JournalEntries").push().key,
            startAt:    productionData.cooking.startAt,
            endedAt:    '',
            type:       'cooking',
            recipe:     productionData.cooking.recipe,
            nut:        productionData.cooking.nut,
            engagmentId:productionData.engagmentId,
            channelId:  productionData.channelId,
            channelName:productionData.channelName,
            yrwk:       productionData.yrWk,
            teamMembrId:'',
            teamMemName:'',
            temperature:0,
            wind:       '',
            powerSource:'',
            BoMId:      productionData.cooking.bomid,
            isComplete: false,
            txs:        {}
        }


        //  RETURN ASYNC WORK
        return new Promise(function(resolve, reject) {

            //  COLLECT THE BILL OF MATERIALS FOR THIS JOURNAL ENTRY
            Firebase.read(BoMreadPath).then(function journalBatchStartBMOFBRead(bom) {
                
                //  ITERATE OVER EACH OF THE RESOURCES
                Object.keys(bom.resources).forEach(function(key) {
                    const cookingTxId  = firebase.database().ref().child('Transactions').push().key;
                    const newCookingTx = {
                        journalEntryId:newJE.id,
                        ledgerId:      productionData.ledgersMap[key],
                        createdAt:     moment().format(),
                        updatedAt:     '',
                        createdBy:     '',
                        updatedBy:     '',
                        debit:         bom.resources[key],
                        credit:        0,
                        description:   '',
                        engagmentId:   productionData.engagmentId,
                        channelName:   productionData.channelName,
                        channelId:     productionData.channelId
                    };

                    allUpdates['/Transactions/' + cookingTxId] = newCookingTx;

                    newJE.txs[cookingTxId] = cookingTxId;

                });

                allUpdates['/JournalEntries/' + newJE.id ] = newJE;

                console.log(allUpdates);

                Firebase.update(allUpdates).then(function() {
                    resolve(newJE.id);
                })

            });

            
        });

    };

    /*
    *   PUBLIC: JOURNAL BATCH END
    *
    *   This 
    */
    function journalBatchEnd() {

    };

    //  DEFINE PUBLIC METHODS


    //   RETURN
    return msDataMod;
};