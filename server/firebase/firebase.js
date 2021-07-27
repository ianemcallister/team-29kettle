/*
*   FIREBASE
*/

//  DEFINE DEPENDENICES
var admin 			= require("firebase-admin");

//  INITIALIZE
var serviceAccount = {
    "type": "service_account",
    "project_id": "kettle-team",
    "private_key_id": process.env.KETTLETEAM_FIREBASE_ADM_PRIVATE_KEY_ID,
    "private_key": process.env.KETTLETEAM_FIREBASE_ADM_PRIVATE_KEY.replace(/\\n/g, '\n'), 
    "client_email": "firebase-adminsdk-yxsea@kettle-team.iam.gserviceaccount.com",
    "client_id": "107970557588247572604",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yxsea%40kettle-team.iam.gserviceaccount.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kettle-team-default-rtdb.firebaseio.com"
});
var db = admin.database();

//  DEFINE MODULE
var firebaseMod = {
    update: update
};

async function update(path, data) {
    //  DEFINE LOCAL VARIABLES
    var ref = admin.database().ref(path);

    try {
        ref.update(data, function(error) {
            if(!error) {
                console.log('data written successfully');
                return 0;
            }
        })
    } catch (error) {
        console.log('update Error: ', error);
    }
}

//  EXPORT MODULE
module.exports = firebaseMod;