/*
*   ADD SUB ACCOUNT CLI SCRIPT
*
*   This method adds to the list of sub accounts available for epcs
*
*/

/*
*   DEFINE DEPENDENCIES
*/  
const Epc = require('../../epc/epc'); 

/*
*   DEFINE LOCAL VARIABLES
*/  
//  To be added is an array of string values
var toBeAdded = [
    {
        "id": "",
        "name": "33oz Staged Pecans",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": "A Full 33oz (12oz Sugar + 21oz Pecans) Batch of Pecans"
    }
];

/*
*  DEFINE METHODS
*/
async function addSubAccts(toBeAdded) {
    try {
        var result = await Epc.add.subAccts(toBeAdded);
        console.log('Add Accts Result:', result);
    } catch (error) {
        console.log("Add Accts Error: ", error);
    }
}

/*
*  EXECUTE
*/
addSubAccts(toBeAdded);