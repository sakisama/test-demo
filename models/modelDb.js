var mongoose = require('mongoose');
var dbStruct = require('../config/DbStruct.js');

var rssNews = mongoose.model('rssNews', dbStruct.articleSchema);
var  userAdmin = mongoose.model('users',dbStruct.userSchema);
var myBlogs = mongoose.model('myBlogs', dbStruct.myBlogSchema);

exports.rssNews = rssNews;
exports.userAdmin = userAdmin;
exports.myBlogs = myBlogs;
