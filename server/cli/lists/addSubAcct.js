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
        "name": "Canopies",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Generators",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Serving Scoops",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Serving Tongs",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "1\" Clips",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "2\" Clips",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "2\" Clips",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Tablets",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Oven Mitts",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Gas Cans",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Canopy Weights",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Thermos",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Catch Buckets",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Serving Bins",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Chip Readers",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Swipe Readers",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Spray Bottles",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Cleaning Rags",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Banners",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Extension Cords",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Roasters",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Canopy Sleeves",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Fire Extenguishers",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
    },
    {
        "id": "",
        "name": "Power Splitters",
        "acct": "-MnDwVNtBnFW_s0-pVdd",
        "description": ""
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