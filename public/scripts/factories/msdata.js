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
msData.$inject = ['$interval', '$firebaseObject', '$routeParams', 'moment'];

/*
*   DECLARE THE SERVICE
*
*   All of the injected modules are now provided to the service
*/  
/* @ngInject */
function msData($interval, $firebaseObject, $routeParams, moment) {

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
    self.data = {
        power: {
            isOn: _loadFBObject('Engagments/' + $routeParams.engmntId + '/power/isOn'),
            source: _loadFBObject('Engagments/' + $routeParams.engmntId + '/power/source'),
            txs: _loadFBObject('Engagments/' + $routeParams.engmntId + '/power/txs'),
            opSeconds: {
                generator: {
                    continous: 0,
                    total: 0
                },
                house: {
                    continous: 0,
                    total: 0
                }
            },
            timeBlocks: []
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
        data: self.data,
        power: {
            togglePower: togglePower,
            getPowerKPIs: getPowerKPIs
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
    *   PRIVATE: IS ON
    *
    *   Description: This function checks the status of a timeblock, to see if the blck is on or off
    * 
    *   Algorithm:  1) Define local variables
    *               2) Iterate over array of transactions
    * 
    *   @param  int     index:
    *   @param  array   txsArray: 
    *   @return boolean returnValue: TRUE/FALSE depending on the findings
    *   @see    (n/a)
    */
    function _isOn(powerTx) {
        let returnValue = false;
        if(powerTx.turning != undefined) {
            if(powerTx.turning == 'on') returnValue = true
        }
		return returnValue;
	};

    /*
    *   PRIVATE: CLEAN FIREBASE OBJECT
    *   
    *   This function removes all non-object values from a firebase object
    * 
    *   @param  {object}    txs:
    *   @return {object}    returnObject:
    */
    function _cleanFirebaseObject(txs) {
        const returnObject = {};

        Object.keys(txs).forEach(function(key) {

            if(key != '$$conf' && key != '$id' && key != '$priority' && key != '$resolved') returnObject[key] = txs[key];

        })

        return returnObject;
    }

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
        self.data.power.txs.$save();

        //  3) REBUILD PROGRESS BARS
        const powerKPIs = getPowerKPIs(self.data.power.txs, self.data.power.opSeconds)
        
        //  ASSIGN VALUES
        self.data.power.timeblocks  = powerKPIs.timeblocks;
        self.data.power.opSeconds   = powerKPIs.opSconds;

    };

    /*
    *   PUBLIC: GET POWER KPIs
    *
    *   This function builds the power sector KPIs
    * 
    *   Algorithm   1) Append a current transaction with current time stamp to the end of the cleanTXS list
    *
    *   @param  (none)
    *   @return object      powerKPIs      
    *   @see
    */
    function getPowerKPIs(txs, opSeconds) {
    //	NOTIFY PROGRESS
		//console.log('getPowerKPIs', txs, opSeconds);

		//	DEFINE LOCAL VARIABLES
        const powerKPIs = { timeblocks: [], opSconds: opSeconds }
        const cleanTxs = _cleanFirebaseObject(txs);
        const keysList = [];

        //  ZERO OUT VALUES
		opSeconds['generator'].total = 0;
		opSeconds['generator'].continous = 0;
		opSeconds['house'].total = 0;
		opSeconds['house'].continous = 0;

        //  1) Append a current transaction with current time stamp to the end of the cleanTXS list
        const newTimestamp = moment().format();
        cleanTxs[newTimestamp] = { timestamp: newTimestamp };

        //  2) Generate a keys list
        Object.keys(cleanTxs).forEach(function(key) { keysList.push(key); })
	

        //  3) Build Time Blocks, by iterating over this array of timestamps
		for (let index = 0; index < keysList.length - 1; index++) {
            //  Define local variabels
            const firstKey      = keysList[index];
            const secndKey      = keysList[index + 1];
			const blockStart    = moment(cleanTxs[firstKey].timestamp);
            const endBlock      = moment(cleanTxs[secndKey].timestamp);
			const durationSeconds = moment.duration(endBlock.diff(blockStart));
			const durationPercentage = (durationSeconds.as('seconds') / (59 + (59 * 60) + (23 * 60 * 60))).toFixed(2);
			const progressObject = {
				prcntg: durationPercentage * 100,
				seconds: durationSeconds.as('seconds'),
				isOn: _isOn(cleanTxs[firstKey]),
				classes: ['progress-bar']
			};

            //  notify progress
            console.log('progressObject', progressObject);
            
            
			
			//	MAKE SURE "ON" BLOCKS ARE YELLOW
			if(progressObject.isOn) progressObject.classes.push('bg-warning')

			if(_isOn(cleanTxs[firstKey])) {
                if(powerKPIs.opSeconds != undefined) {
                    powerKPIs.opSeconds['house'].total      += durationSeconds.as('seconds');
				    powerKPIs.opSeconds['house'].continous  = durationSeconds.as('seconds');
                }
				
			}
			
			//	UPDATE THE ARRAY
			powerKPIs.timeblocks.push(progressObject);
		}

		return powerKPIs;
    };

    //  DEFINE PUBLIC METHODS

   
    /*
    *   EXECUTE: MiniShopIntevals
    *
    *   Here we run our intveral functions that need to per processed on a regular cadence.
    *   All functions being run should be syncronous, or rather, not require 
    * 
    *   @param  int     cadence: is an integer to define how requenly these functions shoulld
    *                           be run
    */  
    const cadence = 1000 * 10;  //  1000 miliseconds = 1 second x 10 = 10 seconds
    $interval(function MiniShopIntervals() {
        //  DEFINE LOCAL VARIABLES
        const powerKPIs = getPowerKPIs(self.data.power.txs, self.data.power.opSeconds)

        //  ASSIGN VALUES
        self.data.power.timeblocks  = powerKPIs.timeblocks;
        self.data.power.opSeconds   = powerKPIs.opSconds;

    }, cadence)

    //   RETURN
    return msDataMod;
};