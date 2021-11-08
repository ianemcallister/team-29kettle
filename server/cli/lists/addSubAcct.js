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
        "name": "Burned Batch SS Pecans",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch SS Almonds",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch SS Cashews",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch SS Peanuts",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch SS Hazelnuts",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch BB Pecans",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch BB Almonds",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch BB Cashews",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch BB Peanuts",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
    },
    {
        "id": "",
        "name": "Burned Batch BB Hazelnuts",
        "acct": "-MnwjhS6H72MNDPva0sE",
        "description": "A failed batch"
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