/*
*	SERVER: SERVER APP
*
*	This module runns the express server
*/

//  NOTIFY PROGRESS
//  DEFINE DEPENDENCIES
var express		= require('express');
var bodyParser 	= require('body-parser');

//  LOCAL VARIABLES
var serverApp           = express();
var port                = process.env.PORT || 3000;
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();


/*
*	USE Declarations
*
*/
//  EXECUTE: BODY PARSING
serverApp.use(jsonParser);              // for parsing application/json
serverApp.use(urlencodedParser);        // for parsing application/x-www-form-urlencoded
serverApp.use(express.static('dist'));  // folder being servered

//  EXECUTE: NOTIFY URL REQESTS
serverApp.use('/', function(req, res, next) {
	//log the url to the console
	console.log('Request Url: ' + req.url);
	next();
});

serverApp.get('/config/firebase', async function(req, res) {
	//	NOTIFY
	//	LOCAL
	var returnString = "";

	returnString += "var config = {";
	returnString += "apiKey: '"              + process.env.KETTLETEAM_FIREBASE_WEB_APP_API_KEY   	+ "',";
	returnString += "authDomain: '"          + process.env.KETTLETEAM_FIREBASE_WEB_APP_AUTH_DOMAIN  + "',";
	returnString += "databaseURL: '"         + process.env.KETTLETEAM_FIREBASE_WEB_APP_DB_URL       + "',";
	returnString += "projectId: 'kettle-team',";
	returnString += "storageBucket: 'kettle-team.appspot.com',";
	returnString += "messagingSenderId: '731473466333',";
	returnString += "appId: '"   			 + process.env.KETTLETEAM_FIREBASE_WEB_APP_APP_ID    	+ "'};";
	returnString += "firebase.initializeApp(config);";

	//advise of the post body
	console.log('firebase config GET', returnString);

	res.status(200);
	res.send(returnString);
});

/*
*	EXECUTE: RUN THE SERVER
*/

serverApp.listen(port,function() {
	//display the port
	console.log('Express server is up and running on port ' + port);
	//identify the environment
	if(process.env.IS_PROUDCTION == 'true') {
		console.log('is production');
		//console.log('got these codes:', JSON.parse(process.env.PROMO_CODES));
	} else {
		console.log('is development');
		//console.log(JSON.parse(process.env.PROMO_CODES));
	}
});