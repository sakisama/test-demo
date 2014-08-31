var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
  author:String,
  icon:String,
  from:String,
  title:{type:String, unique:true},
  link: String,
  description: String,
  descImg: String,
  context: String,
  pubDate:{
    type:Date,
    'default':Date.now
  },
  source: String,
  typeId: Number,
  records:[]
});

var userSchema = new mongoose.Schema({
  user:{type:String, unique:true},
  passwd:String
});

var myBlog = new mongoose.Schema({
  user: String,
  time: {},
  pubDate:{
    type:Date,
    'default':Date.now
  },
  indexPic: String,
  title: String,
  content: String,
  liked: [],
  views: Number,
  pv: Number,
  comments:[]
});

exports.articleSchema= articleSchema;
exports.userSchema = userSchema;
exports.myBlogSchema = myBlog;