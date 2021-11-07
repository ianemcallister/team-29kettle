/*
*   TRANSFER ROLE LEDGER MAP CLI SCRIPT
*
*   This method is used to transfer a role/ledger map from a channel record to a production report record
*
*/

/*
*   DEFINE DEPENDENCIES
*/
const Firebase = require('../../firebase/firebase'); 

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
        "channelId": "-MmdFOUdWJKSaiY8qSBP",
        "productionReportId": "-MmdUpXPxFhM7q6JiQ8-"
    }
];

/*
*  DEFINE METHODS
*/
// ADD
async function xfrMap(toBeAdded) {
    try {
        var sourceResult = await Firebase.get('Channels/' + toBeAdded[0].channelId + '/ledgersMap');
        console.log('sourceResult', sourceResult.val());
        var dstntnResult = await Firebase.update('ProductionReports/' + toBeAdded[0].productionReportId + "/ledgersMap", sourceResult.val());
        console.log('xfr Mapp Result:', dstntnResult);
    } catch (error) {
        console.log("xfr Mapp Error: ", error);
    }
}

/*
*  EXECUTE
*/
xfrMap(toBeAdded);