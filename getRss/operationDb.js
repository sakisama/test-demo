var Post = require('../models/modelDb');
function addNews(postMsg){
  postMsg.save(function(err){
    if(err){
//console.log(err.message);
      //  console.error(err.message);
      return;
    }
    console.log(postMsg.title);
  }); 
}

function addNewBlog(postMsg){

  postMsg.save(function(err){
    if(err){
//console.log(err.message);
       console.error(err.message);
      return;
    }
    console.log(postMsg.title);
  }); 
}

function addComment(blogId, comment){

}



function updateBlog(blogId, tmpBlog){
  var options = {};
  console.log("will begin to update: "+ blogId);
  Post.myBlogs.findByIdAndUpdate(blogId,tmpBlog, options, function(err){
      if (err) {
        console.log("up faild: "+err);
        return handleError(err);
      }
  console.log('update ok');
  });

}

function getNewsPage(id,callback){
  Post.rssNews.find({'typeId':id})
      .sort({'pubDate':-1})
      .exec(function(err,posts){
            if(err){console.log(err); return;}
         //  console.log(posts);
            callback({"posts":posts,"newsNum":posts.length});
        });

}

function getBlogs(title,blogId,callback){
  
  if(title == null && blogId == null){

  Post.myBlogs.find({})
    .sort({'pubDate':-1})
    .exec(function(err,posts){
      if(err){console.log(err); return;}
      callback({"posts":posts, "blogsNum":posts.length});
    });
  
  }

  else
  {
    console.log("begin find yourContent " +blogId);
    Post.myBlogs.findById(blogId)
    .exec(function(err,posts){
        if(err){console.log(err); return;}
        callback({"posts":posts});
    });

  }
}

function delTheBlog(blogId){
  console.log("begin delTheBlog");
  Post.myBlogs.findByIdAndRemove(blogId, function(err, docs){
       if(err){console.log("delTheBlog err: "+err); return;}
    console.log("delTheBlog:"+blogId);
  });
}

exports.addNews = addNews;
exports.addComment = addComment;
exports.addNewBlog = addNewBlog;
exports.updateBlog =  updateBlog;
exports.getNewsPage = getNewsPage;
exports.getBlogs = getBlogs;
exports.delTheBlog = delTheBlog;