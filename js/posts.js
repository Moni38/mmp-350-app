window.addEventListener('load', function() {
	
	// global variables
	const postsDiv = document.getElementById('posts');
	const postRef = firebase.database().ref('posts');
	
	postRef.on('child_added', function(snapshot) {
		createPost(snapshot.key, snapshot.val());
	});
	
	function createPost(key, post) {
		
		// post container
		const postDiv = document.createElement('div');
		postDiv.classList.add('post');
		
		// post text
		const postText = document.createElement('div');
		postText.classList.add('post-text');
		postText.textContent = post.text;
		
		// post info 
		const postInfo = document.createElement('div');
		postInfo.classList.add('post-info');
		
		const postAuthor = document.createElement('span');
		postAuthor.classList.add('post-author');
		postAuthor.textContent = post.author;
		
		const postDate = document.createElement('span');
		postDate.classList.add('post-date');
		postDate.textContent = new Date(post.date).toLocaleString('en-us', {month: 'long', year: 'numeric', weekday: 'long', day: 'numeric' });
		
		postInfo.innerHTML += "by ";
		postInfo.appendChild(postAuthor);
		postInfo.innerHTML += " on ";
		postInfo.appendChild(postDate);
		
		postDiv.appendChild(postText);
		postDiv.appendChild(postInfo);
		
		// likes 
		const likesDiv = document.createElement('div');
		likesDiv.classList.add('likes');
		
		const likeBtn = document.createElement('button');
		likeBtn.classList.add('like-btn');
		likeBtn.textContent = "Like";
		
		const unlikeBtn = document.createElement('button');
		unlikeBtn.classList.add('unlike-btn');
		unlikeBtn.textContent = "UnLike";
		
		const likesDisplay = document.createElement('span');
		likesDisplay.classList.add('likes-display');
		
		if (post.likes) {
			likesDisplay.textContent = Object.keys(post.likes).length + " Likes";
		} else {
			likesDisplay.textContent = '0 likes';
		}
		
		likesDiv.appendChild(likeBtn);
		likesDiv.appendChild(unlikeBtn);
		likesDiv.appendChild(likesDisplay);
		postDiv.appendChild(likesDiv);
		
		likeBtn.addEventListener('click', function() {
			likeOrUnLike(true);
		});
		
		unlikeBtn.addEventListener('click', function() {
			likeOrUnLike(false);
		});
		
		function likeOrUnLike(isLike) {
			if (firebase.auth().currentUser) {
				const uid = firebase.auth().currentUser.uid;
				const likeRef = firebase.database().ref('posts').child(key).child('likes').child(uid);
				let likePromise;
				if (isLike) {
					likePromise = likeRef.set(true);
				} else {
					likePromise = likeRef.remove();	
				}
				likePromise.then(function() {
					location.reload();
				});
			} else {
				alert("Please login to like a post");
			}
		}
		
		
		
		postsDiv.insertBefore(postDiv, postsDiv.firstElementChild);
	}
});











