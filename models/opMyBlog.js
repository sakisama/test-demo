var Post = require('../models/modelDb');
var opDB = require('../getRss/operationDb.js');
var crypto = require('crypto');
function saveBlog(user, title, content,indexPic){
console.log("reay saveBlog");
	var date = new Date();
	var GMTdate = Date();

	var time = {
		year: date.getFullYear(),
		month: date.getFullYear() + "-" + (date.getMonth()+1),
		day: date.getFullYear() + "-" +  (date.getMonth()+1) + "-" + date.getDate(),
		minute: date.getFullYear() + "-" +  (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() +":"+ date.getMinutes()+":"+date.getSeconds()
	};
	var mBlog = new Post.myBlogs({
		user: user,
		time: time,
		pubDate:GMTdate,
		title: title,
		content: content,
		indexPic: indexPic,
		views:0,
		liked:0
	});
	console.log( mBlog.pubDate);
	  opDB.addNewBlog(mBlog);
}

function saveComment(req,res, callback){
	var blogId = req.params.blogId;
	var date = new Date();
	var comments;
	var comment = {
		postName: req.body.postname,
		postComment: req.body.postcomment,
		postTime: date.getFullYear() + "-" +  (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() +":"+ date.getMinutes()+":"+date.getSeconds()
	}

	Post.myBlogs.findById(blogId)
	 .exec(function(err,post){
	 	comments = post.comments;
	 	comments.push(comment);
	 	 var tmpBlog = {
	 	 	comments:comments
	 	 }	 
	 	opDB.updateBlog(blogId, tmpBlog);	

	 });
	callback();
}

function updateBlog(title, blogId, content,indexPic){
	var tmpBlog = {
		title:title,
		content:content,
		indexPic:indexPic
	}
	console.log(blogId+"+++++"+tmpBlog.indexPic);
	opDB.updateBlog(blogId, tmpBlog);
}

function delBlog(blogId){

	opDB.delTheBlog(blogId);

}

function showBlogList(req, res, callback){
	opDB.getBlogs(null, null, function(data){

		var AllBlogs = new Array();
		for(var i = 0; i<data.blogsNum; i++){
			var oneBlog={
				blogId:data.posts[i]._id,
				title:data.posts[i].title,
				pubTime:data.posts[i].time.minute
			};
			AllBlogs[i] = oneBlog;
		}
		var datas = {
			BlogList:AllBlogs
		}	
		callback(datas);
	});

}

function showBlogContent(req, res, callback){

	opDB.getBlogs(req.query.title, req.query.blogId, function(data){

		var post = {
			title: data.posts.title,
			content: data.posts.content,
			indexPic:data.posts.indexPic
		};
		callback(post);
	});

}

function showOneBlog(req, res, callback){

	opDB.getBlogs(null, req.query.blogId, function(data){

		var views = data.posts.views;
		views++;
		var tmpBlog = {
		views: views
		}
		opDB.updateBlog(req.query.blogId, tmpBlog);
		var time = data.posts.pubDate.toString();

		var post = {
			title: data.posts.title,
			indexPic:data.posts.indexPic,
			content: data.posts.content,
			pubDate:time,
			liked:data.posts.liked,
			views:data.posts.views
		};
		callback(post);
	});

}

function showIndexBlog(req, res, callback){
	opDB.getBlogs(null, null, function(datas){
		var AllBlogs = new Array();
		var pageNum = req.query.page;
		var endNum = req.query.page * 5;
		var startNum = endNum - 5;
		var blogsArray = datas.posts.slice(startNum, endNum);

		for(var i = 0; i < blogsArray.length; i++){
			var oneBlog = {
				user: blogsArray[i].user,
				blogId:blogsArray[i]._id,
				indexPic:blogsArray[i].indexPic,
				title: blogsArray[i].title,
				content: blogsArray[i].content,
				pubDate: blogsArray[i].pubDate.toString(),
				views:blogsArray[i].views
			};

			AllBlogs[i] = oneBlog;
		}

		var datas = {
			blogs: AllBlogs,
			blogsNum:datas.blogsNum
		}

		callback(datas);
	});

}

exports.saveBlog=saveBlog;
exports.saveComment = saveComment;
exports.updateBlog = updateBlog;
exports.delBlog = delBlog;
exports.showBlogList = showBlogList;
exports.showBlogContent = showBlogContent;
exports. showOneBlog = showOneBlog;
exports.showIndexBlog = showIndexBlog;