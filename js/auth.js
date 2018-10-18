window.addEventListener('load', function() {
	
	const userNameAuth = document.getElementById('username');
	const emailAuth = document.getElementById('email');
	const passwordAuth = document.getElementById('password');
	const signUpButton = document.getElementById('sign-up');
	const logInButton = document.getElementById('login');
	const logOutButton = document.getElementById('logout');
	
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			document.getElementById('display-name').textContent = "Welcome, " + firebase.auth().currentUser.displayName;
			
			document.body.classList.add('user-logged-in');
			document.body.classList.remove('no-user');
		} else {
			document.body.classList.add('no-user');
			document.body.classList.remove('user-logged-in');
		}
	});
	

	
	// new user
	signUpButton.addEventListener('click', function() {
		const email = emailAuth.value;
		const password = passwordAuth.value;
		const auth = firebase.auth();
		const createUserPromise = auth.createUserWithEmailAndPassword(email, password);
		
		// promise reponse
		createUserPromise.then(function(credential){
			const id = credential.user.uid;
			const db = firebase.database();
			const ref = db.ref('users').child(id);
			const userInfo = {
				displayName: userNameAuth.value		
			};
			ref.set(userInfo);
			credential.user.updateProfile(userInfo)
				.then(displayUserInfo);
		});
		
		// promise error
		createUserPromise.catch(function(error) {
			alert(error.message);	
		});
	});
	
	// log in
	logInButton.addEventListener('click', function() {
		const email = emailAuth.value;
		const password = passwordAuth.value;
		const auth = firebase.auth();
		const signInPromise = auth.signInWithEmailAndPassword(email, password);
		signInPromise.then(displayUserInfo);
		signInPromise.catch(function(error) {
			alert(error.message);
		});
	});
	
	// log out
	logOutButton.addEventListener('click', function() {
		firebase.auth().signOut();
		document.getElementById('user-info').style.display = 'none';
		document.getElementById('auth').style.display = 'block';
	});
	
});






