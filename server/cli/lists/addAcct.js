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
        "name": "Discounts Given",
        "description": "This account tracks all discounts given",
        "type": "Expense",
        "prefix": ""            //  DSCGVN -> 
    },
    {
        "id": "",
        "name": "Accounts Payable",
        "description": "This account tracks bills.",
        "type": "Liability",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Accounts Receivable",
        "description": "This account tracks invoices.",
        "type": "Revenue",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Cash on Hand",
        "description": "This account tracks liquid cash assets.",
        "type": "Asset",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Alternte Currency on Hand",
        "description": "This account tracks exchangable currency assets that have not yet been exchanged.",
        "type": "Asset",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Raw Materials",
        "description": "This account tracks physical food products that end up in our finished products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Raw Materials",
        "description": "This account tracks physical food products that end up in our finished products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Packaging",
        "description": "This account tracks physical packaging that end up in our finished products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Retail Products",
        "description": "This account tracks all of our finished retail products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Wholesale Products",
        "description": "This account tracks all of our finished wholesaleproducts.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "E-Commerce Products",
        "description": "This account tracks all of our finished e-commerce products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Value Added Products",
        "description": "This account tracks all of our value added products, otherwise known as our mid-stage products. They exist between raw materials and finished products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Job Supplies",
        "description": "Ultimatly disposable but usually multi-use supplies that assist in the creation of our finished products.",
        "type": "Capital",
        "prefix": ""
    },
    {
        "id": "",
        "name": "Equipment",
        "description": "Multi-use supplies and tools intended for regular use and not frequently disposed of.",
        "type": "Capital",
        "prefix": ""
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