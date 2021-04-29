ckc
    .controller('loginController', loginController);

	loginController.$inject = ['$scope','$log'];

/* @ngInject */
function loginController($scope, $log) {

	//	NOTIFY PROGRES
	//	LOCAL VARIABLES
	var vm = this;
	var ui = new firebaseui.auth.AuthUI(firebase.auth());

	//	EXECUTE
	ui.start('#firebaseui-auth-container', {
		signInOptions: [
		  firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		// Other config options...
	});
	var uiConfig = {
		callbacks: {
		  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			//console.log(authResult);
			var userId = authResult.user.uid;
			var path = "/#/member/" + userId;
			window.location.assign(path);

			return false;
		  },
		  uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		  }
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: 'popup',
		signInSuccessUrl: '/#/member/290ug',
		signInOptions: [
		  // Leave the lines as is for the providers you want to offer your users.
		  firebase.auth.EmailAuthProvider.PROVIDER_ID,
		  firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		  firebase.auth.FacebookAuthProvider.PROVIDER_ID
		  //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		  //firebase.auth.GithubAuthProvider.PROVIDER_ID,
		  
		  
		],
		// Terms of service url.
		tosUrl: '<your-tos-url>',
		// Privacy policy url.
		privacyPolicyUrl: '<your-privacy-policy-url>'
	};
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);

	//define view model variable
	

	$log.info('in the login controller');	    //  TODO: TAKE THIS OUT LATER


}
