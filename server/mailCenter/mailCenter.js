/*
*   MAIL CENTER
*
*   This module handles email
*/

//  DEFINE DEPENDENCIES
var nodemailer 		= require('nodemailer');

//  DEFINE GLOBAL VARIABLES
let transporter = nodemailer.createTransport({
    host: process.env.AH_NUTS_MAIL_HOST,
    port: process.env.AH_NUTS_MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.AH_NUTS_MAIL_USER,
        pass: process.env.AH_NUTS_MAIL_PASSWORD
    }
});

//  DEFINE THE MODULE
var mailCenter = {
    send: send
};

/*
*   SEND
*/
async function send(options) {
    //  DEFINE LOCAL VARIABLES
    //  NOTIFY PROGRESS
    console.log('Mail Send');
    //  EXECUTE
    try {
        let info = await transporter.sendMail(options);
        return info.messageId;
        
    } catch (error) {
        console.log('Mail Send Error:', error);
    }

};

//  RETURN THE MODULE
module.exports = mailCenter;

