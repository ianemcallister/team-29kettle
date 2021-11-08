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
        "name": "36oz Staged Almonds Bag",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": "staged nuts and sugar"
    },
    {
        "id": "",
        "name": "32oz Staged Cashew Bag",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": "staged nuts and sugar"
    },
    {
        "id": "",
        "name": "40oz Staged Peanuts Bag",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": "staged nuts and sugar"
    },
    {
        "id": "",
        "name": "36oz Staged Hazelnuts Bag",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": "staged nuts and sugar"
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