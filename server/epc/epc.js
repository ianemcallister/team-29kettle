/*
*   EPC MODULE
*
*   This module houses all of the methods pertinant to handling epc codes.
*/

/*
*   DEFINE DEPENDENCIES
*/  
const Firebase    = require('../firebase/firebase.js');


/*
*   DEFINE LOCAL VARIABLES
*/

/*
*   DEFINE MODULE
*/
var epcMod = {
    add: {
        units: AddUnits
    },
    read: {
        units: ReadUnits
    }
};


/*
*  DEFINE LOCAL METHODS
*/

/*
*  DEFINE PUBLIC METHODS
*/
/*
*   ADD UNTIS
*   This function accepts an arry of units objects:
*   [{
*       "name": "" [string]
*       "description": "" [string]
*   }]
*   and returns an array of keys after the records have been added to the database
*
*   @unitsList: [Array]
*   #keysList: [Array]
*   
*/
async function AddUnits(unitsList) {
    //  DEFINE LOCAL VARIABLES
    var path = 'Units';
    var keysList = [];

    //  EXECUTE ASYNC WORK
    try {

        //  ITERATE OVER UNITS LIST
        unitsList.forEach(function(unitsObject) {

            var newKey = Firebase.push(path, unitsObject)

            keysList.push(newKey);

        });

        //  NOTIFY PROGRESS
        console.log("EPC/AddUnits returning: ", keysList);

        //  RETURN VALUES
        return keysList;
        
    } catch (error) {
        console.log('AddUnits Error:', error);
        return error;
    }

}

/*
*   READ UNITS
*
*   This function reads from the database at the "Units" path and prints out the list at a high level
*/
async function ReadUnits() {
    //  DEFINE LOCAL VARIABLES
    var readPath = 'Units';
    var results = {};

    //  EXECUTE ASYNC WORK
    try {

        results = await Firebase.get(readPath)
        var resultObject = results.val();

        Object.keys(resultObject).forEach(function(key) {
            console.log(resultObject[key].name, " - ", resultObject[key].description);
        })
        
        //  RETURN
        return 0;
    } catch (error) {
        console.log('AddUnits Error:', error);
        return error;
    }
}

/*
*  EXPORT MODULE
*/
module.exports = epcMod;