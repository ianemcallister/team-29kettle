

const Square        = require('../square/square');
const Fs            = require('fs');

async function downloadSquareOrder(orderId) {
    try {
        var anOrder = await Square.orders.get(orderId);
        console.log(anOrder.order.tenders[0]);
        //console.log(anOrder.order.tenders[0].amountMoney);
        //var textOrder = JSON.stringify(anOrder, null, '\t');
        //console.log(anOrder);
        
        /*Fs.writeFile('squareOrder.json', textOrder, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
    
            console.log("The file was saved!");	
        });*/
        
    } catch (error) {
        console.log('error', error);
    }
};

downloadSquareOrder('m6VSzDBapsM0blKKnDlwb1geV');