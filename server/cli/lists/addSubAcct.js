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
    },
    {
        "id": "",
        "name": "Sea Salt",
        "acct": "-MnDwVNkGSKQMqx53mLu",
        "description": ""
    },
    {
        "id": "",
        "name": "Sweet & Salty Mix",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": ""
    },
    {
        "id": "",
        "name": "Bourbon Mix",
        "acct": "-MnrcHbO37Uu4qx5AMln",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Sweet & Salty Pecans",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Sweet & Salty Almonds",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Sweet & Salty Cashews",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Sweet & Salty Peanuts",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Sweet & Salty Hazelnuts",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Bourbon Pecans",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Bourbon Almonds",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Bourbon Cashews",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Bourbon Peanuts",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
        "description": ""
    },
    {
        "id": "",
        "name": "Cooked Bourbon Hazelnuts",
        "acct": "-MnDwVNs0PvBOkgspQyQ",
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