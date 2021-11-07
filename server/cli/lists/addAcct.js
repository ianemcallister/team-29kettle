/*
*   ADD ACCOUNT CLI SCRIPT
*
*   This method adds to the list of accounts available for epcs
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
*   To be added
*   is an array of string values.
*
*   {
*       "id": ""
*       "name": "",
*       "description": ""
*       "type": "",
*       "prefix": ""            //   This is the INTERNAL ONLY UPC company prefix. 6 digits
*   }
*/
var toBeAdded = [
    {
        "id": "",
        "name": "Staged Products",
        "description": "Products that are staged for internal purposes",
        "type": "Capital",
        "prefix": ""            //  DSCGVN -> 
    }
];

/*
*  DEFINE METHODS
*/
// ADD
async function addAccts(toBeAdded) {
    try {
        var result = await Epc.add.accts(toBeAdded);
        console.log('Add Accts Result:', result);
    } catch (error) {
        console.log("Add Accts Error: ", error);
    }
}

/*
*  EXECUTE
*/
addAccts(toBeAdded);