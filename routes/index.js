var User = require('../models/user.js');
var crypto = require('crypto');
var routesRss = require('./routesRss');
var getRcntNews = require('./rcntNews');
var  useDb= require('../models/modelDb');
var opBlog = require('../models/opMyBlog');
module.exports = function(app) {
	app.get('/', function(req, res) {
			res.render('index');
	});
        app.get('/demo/:demoId',function(req,res){
          res.render('demo'+req.params.demoId,{
            title:"demo"            
          });
        }); 
	app.get('/about', function(req, res) {
			res.render('aboutShow');
	});

	app.get('/blogs/:blogId', function(req, res) {
			res.render('blogPage', {
				title:req.query.title
			});
		});
	app.post('/blogs/:blogId',function(req, res){
		opBlog.saveComment(req,res,function(){
			res.redirect('/blogs/'+req.params.blogId);
		});
	
		
	})
			

	app.get('/getOneBlog', function(req,res){
		opBlog.showOneBlog(req, res, function(data){
			res.json(data);
		});

	});

	app.get('/getNewsPage', function(req, res) {

		routesRss.getNewsPage(req, res);

	});
	app.get('/getIndexBlog',function(req, res){
		opBlog.showIndexBlog(req, res, function(datas){
			res.json(datas);
		});
		
	});
	app.get('/getBlogList', function(req, res) {
		opBlog.showBlogList(req, res,function(datas){
			res.json(datas);
		});

	});
	app.get('/getBlogContent', function(req, res) {
		opBlog.showBlogContent(req, res, function(post){
			res.json(post);
		});
		
	});


	app.get('/ghostadmin', checkNotLogin);
	app.get('/ghostadmin',function(req, res){
		res.render('adminlogin', {
			title:'login'
		});
	});


	app.get('/postBlog', function(req, res) {
		if(req.session.user){
			res.render('postBlog', {
				title: 'postBlog',
				admin:req.session.user
			});
		}
		else
		 return res.redirect('/ghostadmin');
			
	});


	app.post('/submitBlog', function(req, res){
		
		opBlog.saveBlog(req.session.user, req.body.title, req.body.content, req.body.indexPic);
		 res.json("submit success");
		/*var currentUser = req.session.user;
		var blogTitle ;
		if(req.body.editor1 != null)
			res.redirect('');

		console.log(req.body.editor1);*/
 		//postBlog(currentUser, )
 		

	});
	app.post('/updateBlog', function(req, res){
		opBlog.updateBlog(req.body.title, req.body.blogId, req.body.content, req.body.indexPic);
		res.json("update success");
	});
	app.get('/delBlog', function(req, res){
		opBlog.delBlog(req.query.blogId);
		res.json("del success");
	});

	app.post('/ghostadmin',function(req, res){
		useDb.userAdmin.findOne({'user':req.body.username})
		      .exec(function(err,posts){
		      	if(err){console.log(err); return;}
		      	if(posts == null)
		      		console.log("not found");
		      	else if(posts.passwd == req.body.password){
		      		req.session.user = req.body.username;
		      		res.redirect('/postBlog');

		      	}
		      		
		      	else{
		      		req.session.user = null;
		      		console.log("not right");
		      		res.redirect('/ghostadmin');
		      	}
		      		
		      });
		
	});
	app.get('/logout',function(req, res){
		req.session.user = null;
		res.redirect('/');

	});

};

function checkNotLogin(req, res, next){
	if(req.session.user){
		console.log('already login!');
		return res.redirect('/postBlog');
	}
	next();
}
