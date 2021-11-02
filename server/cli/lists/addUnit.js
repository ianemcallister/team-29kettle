/*
*   ADD UNIT CLI SCRIPT
*
*   This method adds to the list of units available for epcs
*
*/

/*
*   DEFINE DEPENDENCIES
*/  
const Epc = require('../../epc/epc');

/*
*   DEFINE LOCAL VARIABLES
*/  
/*
*   toBeAdded 
*   is an array of objects values
*
*   {
*       "name": "",             This is what the unit is called, how it will be represented
*       "description": ""       This is a description of the unit, to help understand it
*   }
*/
var toBeAdded = [
    {
        "name": "unit",
        "description": "a single countable unit"
    },
    {
        "name": "oz",
        "description": "one US weight oz"
    },
    {
        "name": "floz",
        "description": "one US fluid oz"
    }
];

/*
*  DEFINE METHODS
*/
async function addUnits(toBeAdded) {
    try {
        var result = await Epc.add.units(toBeAdded);
        console.log('Add Units Result:', result);
    } catch (error) {
        console.log("Add Units Error: ", error);
    }
}

/*
*  EXECUTE
*/
addUnits(toBeAdded);



