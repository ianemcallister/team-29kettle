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
            lastStatus:     "Off"
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
            0: {type: "recipe", recipe: "Sweet & Salty",    nut: "Pecans",      startAt: "", endAt: "", expiresAt: "", bomid: "-MmdKHDHWZAwg3TZbKmL", roleId: '-MjSoxLGadkQpxtTuhCK' },
            1: {type: "recipe", recipe: "Sweet & Salty",    nut: "Almonds",     startAt: "", endAt: "", expiresAt: "", bomid: "-Mnwvwcyoz5iCJDU_3Ce", roleId: '-MnwvGpt6TTehfomFo18' },
            2: {type: "recipe", recipe: "Sweet & Salty",    nut: "Cashews",     startAt: "", endAt: "", expiresAt: "", bomid: "-Mnx5dHnnvnx2uh08fmS", roleId: '-MnwvK9M4P5v_9w_2cSa' },
            3: {type: "recipe", recipe: "Sweet & Salty",    nut: "Hazelnuts",   startAt: "", endAt: "", expiresAt: "", bomid: "-Mnx747NXrpQtFrHzR2R", roleId: '-MnwvNdZ2xqY2_8u9Ub7' },
            4: {type: "recipe", recipe: "Bourbon",          nut: "Pecans",      startAt: "", endAt: "", expiresAt: "", bomid: "-MnvKrSaKkbyRpMRDNRe", roleId: '-MnvHa-65LfIp63akaI-' },
            5: {type: "recipe", recipe: "Bourbon",          nut: "Almonds",     startAt: "", endAt: "", expiresAt: "", bomid: "-MnwvyQ-6pGjq1KmyG5I", roleId: '-MnwvSTpy0dJAU5S_vgi' },
            6: {type: "recipe", recipe: "Bourbon",          nut: "Cashews",     startAt: "", endAt: "", expiresAt: "", bomid: "-Mnx5eocalohdz-DSEDQ", roleId: '-MnwvTh3Ax5g7KuZL8SB' },
            7: {type: "recipe", recipe: "Bourbon",          nut: "Hazelnuts",   startAt: "", endAt: "", expiresAt: "", bomid: "-Mnx74ufhXcxGL-ZLK4J", roleId: '-MnwvXyu20U9VpKhWoJB' },
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
    * 
    *   @params productionData
    *   @returns
    */
    function journalBatchStart(productionData) {
        
        //  DEFINE LOCAL VARIABLES
        const BoMreadPath   = '/BOMs/' + productionData.cooking.bomid;
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
            teamMembrId:productionData.memberId,
            teamMemName:'',
            temperature:productionData.temp,
            wind:       '',
            powerSource:'',
            roaster:    productionData.roasterId,
            BoMId:      productionData.cooking.bomid,
            isComplete: false,
            txs:        {}
        };
        const returnObject = {
            jeId: "",
            txIds: []
        };

        //  IDENTIFY JOURNAL ENTRY ID FOR RETURN OBJECT
        returnObject.jeId = newJE.id;


        //  RETURN ASYNC WORK
        return new Promise(function(resolve, reject) {

            //  COLLECT THE BILL OF MATERIALS FOR THIS JOURNAL ENTRY
            Firebase.read(BoMreadPath).then(function journalBatchStartBMOFBRead(bom) {
                
                //  ITERATE OVER EACH OF THE RESOURCES
                Object.keys(bom.resources).forEach(function(roleId) {

                    //  DEFINE LOCAL VARIABLES
                    const cookingTxId  = firebase.database().ref().child('Transactions').push().key;
                    const newCookingTx = {
                        journalEntryId:newJE.id,
                        roleId:        roleId,
                        createdAt:     moment().format(),
                        updatedAt:     '',
                        createdBy:     '',
                        updatedBy:     '',
                        debit:         bom.resources[roleId],
                        credit:        0,
                        description:   '',
                        engagmentId:   productionData.engagmentId,
                        channelName:   productionData.channelName,
                        channelId:     productionData.channelId
                    };

                    //  REGISTER TRANSACTION UPDATES BEING PUSHED
                    allUpdates['/Transactions/' + cookingTxId] = newCookingTx;

                    //  ADD THE ID OF EACH OF THESE TRANSACTIONS TO THE JOURNAL ENTRY RECORD
                    newJE.txs[cookingTxId] = cookingTxId;

                    //  ADD THE ID OF EACH OF THESE TRANSACTIONS TO THE RETURN OBJECT FOR VIEW MODEL MANAGMENT
                    returnObject.txIds.push(cookingTxId);

                });

                //  ASSIGN THE FINAL JOURNAL ENTRY VALUE NOW THAT ALL VALUES HAVE BEEN ADDED
                allUpdates['/JournalEntries/' + newJE.id ] = newJE;

                console.log('all Updates', allUpdates);

                //  PROCESS ALL UPDATES
                Firebase.update(allUpdates).then(function() {
                    
                    //  SEND BACK THE RETURN OBJECT AFTER ALL UPDATES HAVE PROCESSED SUCESSFULLY
                    resolve(returnObject);

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