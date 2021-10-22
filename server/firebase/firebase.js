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
    get: get,
    query: query,
    add: add,
    update: update,
    pushId: GetPushId,
    push: Push
};


/*
*   Get Function
*/
async function get(path) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    var ref = db.ref(path);

    //  EXECUTE
    try {
        
    } catch (error) {
        console.log('Get Error: ', error);
    }
};

/*
*   Query Function
*/
async function query(path, query) {
    //  NOTIFY PROGRESS
    console.log('Firebase Query:', path, query);
    //  LOCAL VARIABLES
    var ref = db.ref(path);
    var queryRef = ref.orderByChild(query.orderBy).equalTo(query.value);

    //  EXECUTE
    try {
        var result = await queryRef.once('value');
        //console.log(result.val());
        return result.val();
    } catch (error) {
        console.log('query Error: ', error);
    }    
};

/*
*   Add Function
*/
async function add() {};

/*
*   Update Function
*/
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

/*
*   GET PUSH ID
*/
function GetPushId(path) {
    var ref = db.ref(path); 
    var newObject = ref.push();
    return newObject.key;
};

async function Push(path, data) {
    //  NOTIFY PROGRESS
    console.log('Firebase Push', path);
    
    //  DEFINE LOCAL VARIABLES
    const ref = db.ref(path);

    //  EXECUTE
    try {
        const newRecord = ref.push(data);
        return newRecord.key;
    } catch (error) {
        console.log('push error:', error);
    }
    
};

//  EXPORT MODULE
module.exports = firebaseMod;