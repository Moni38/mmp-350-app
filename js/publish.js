window.addEventListener('load', function(){
	
	// publish a post
	const publishButton = document.getElementById('submit-post');
	const postInput = document.getElementById('post-body');
	
	// listen for user to click submit button
	publishButton.addEventListener('click', publishPost);
	
	function publishPost() {
		const uid = firebase.auth().currentUser.uid;
		const db = firebase.database();
		const ref = db.ref('posts');
		const postInfo = {
			text: postInput.value,
			date: Date.now(),
			author: firebase.auth().currentUser.displayName,
			id: uid
		};
		ref.push(postInfo);
		postInput.value = ""; // clears out the user input
	}
	
});