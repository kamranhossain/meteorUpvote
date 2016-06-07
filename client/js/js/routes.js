Router.route("/", {
	name: "index",
	layoutTemplate: "mainLayout",
	waitOn: function(){
		return Meteor.subscribe("posts"); //goto publisher and search item
	},
	action: function() {
		this.render("index");
	}
});

Router.route("/create-post", {
	name: "createPost",
	layoutTemplate: "mainLayout",
	action: function() {
		//if not login redirect home
		this.render("newPost");
	}
});

Router.route("/post/:postId", {
	name: "post",
	layoutTemplate: "mainLayout",
	waitOn: function(){
		return [
		Meteor.subscribe("comments", this.params.postId), //goto publisher and search item
		Meteor.subscribe("singlepost", this.params.postId)
		];
	},
	action: function(){
		var postId = this.params.postId;
		this.render("post")
	}
});
