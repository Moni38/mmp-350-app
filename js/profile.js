window.addEventListener('load', function() {
	
	/* adding an image */
	const submitButton = document.getElementById('submit-photo');
	submitButton.addEventListener('click', function() {
		
		// get the file 
		const file = document.getElementById('profile-photo-file').files[0];
		
		// upload to storage
		const storage = firebase.storage();
		const user = firebase.auth().currentUser;
		const ref = storage.ref('users').child(user.uid).child('profile-photo');
		const filePromise = ref.put(file);
		filePromise.then(function(success) {
			return success.ref.getDownloadURL();
		}).then(function(photoURL) {
			user.updateProfile({photoURL: photoURL});
			document.getElementById('profile-photo').src = photoURL;
		});
		
		
	});
	
	/* display the image */
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			document.getElementById('profile-name').textContent = user.displayName;
			document.getElementById('profile-photo').src = user.photoURL;
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
});