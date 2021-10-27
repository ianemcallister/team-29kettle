/*
*   READ UNIT CLI SCRIPT
*
*   This method reads from the list of units available for epcs
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
*  DEFINE METHODS
*/
async function readUnits() {
    try {
        var result = await Epc.read.units();
        console.log('done reading');
    } catch (error) {
        console.log("Reads Units Error: ", error);
    }
}

/*
*  EXECUTE
*/
readUnits();



