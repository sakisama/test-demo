var FeedParser = require('../node_modules/feedparser')
var request = require('../node_modules/request');
//var rssNews = require('../models/rssDb');
var Post = require('../models/modelDb');
function transToCustom(rssMsg, typeId,from,img,authorBak){
  var mPost;
  if(typeId == 0){
    rssMsg.description = "";
  }
  if(rssMsg.author == null || rssMsg.author == "null"){
      rssMsg.author = authorBak;
  }
  
  var mPost = new Post.rssNews({
        author: rssMsg.author,
        icon:img,
        from:from,
        title: rssMsg.title,
        link: rssMsg.link,
        description: rssMsg.description,
        pubDate: rssMsg.pubDate,
        source: rssMsg.source,
        typeId: typeId
  });


  return mPost;
}

function takeRss(url, typeId, from,img,authorBak,callback){
  var rssMsgs;
  var req = request(url, {timeout: 10000, pool:false});
  req.setMaxListeners(50);

  var feedparser = new FeedParser();


  req.on('error', function(err){
    console.log(url+"req.on(error) wrong:"+err);
  });
  req.on('response', function(res){
    var stream = this;
    if (res.statusCode != 200)
      return this.emit(url+'error', new Error('Bad status code'));
    rssMsgs = [];
    stream.pipe(feedparser);
  });

  feedparser.on('error', function(err){
    console.log(url+"feedparser.on(error) wrong:"+err);
  });
  feedparser.on('readable', function(){
    var rssMsg;
    while(rssMsg = this.read()){
      rssMsgs.push(transToCustom(rssMsg, typeId,from,img,authorBak));
    }
  });
  feedparser.on('end', function(err){
    if(err){
            console.log(url+"feedparser.on(end) wrong:"+err);
            return;
        }
    callback(rssMsgs);
  });

}
exports.takeRss = takeRss;
