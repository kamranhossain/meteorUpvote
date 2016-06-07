Meteor.methods({
	newPost: function(title, content){
		console.log(title,content);

		if (!Meteor.userId()) {
			throw new Meteor.Error("unauthorized", "Unauthorized");
		}

		//return title;
		var data = {
			title: title,
			content: content,
			owner: Meteor.userId()
		};

		var postId = Posts.insert(data);
		return postId;
	},

	upvotePost:function(postId) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("unauthorized", "Unauthorized");
		}

		Posts.update({_id: postId}, {
			$inc: {
				numUpvotes: 1,
				numDifference: 1
			}
		});
	},

	downvotePost:function(postId) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("unauthorized", "Unauthorized");
		}

		Posts.update({_id: postId}, {
			$inc: {
				numDownvotes: 1,
				numDifference: -1
			}
		});
	},

	upvoteComment:function(commentId) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("unauthorized", "Unauthorized");
		}

		Comments.update({_id: commentId}, {
			$inc: {
				numUpvotes: 1,
				numDifference: 1
			}
		});
	},

	downvoteComment:function(commentId) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("unauthorized", "Unauthorized");
		}

		Comments.update({_id: commentId}, {
			$inc: {
				numDownvotes: 1,
				numDifference: -1
			}
		});
	},


	newComment:function(content, postId){
		//console.log(content);
		//return content;
		var data = {
			content: content,
			owner: Meteor.userId(),
			postId: postId
		};

		var commnetId = Comments.insert(data);
		return commnetId;
	}
});