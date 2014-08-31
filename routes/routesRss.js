var opDb = require('../getRss/operationDb');
exports.getNewsPage = function(req, res) {
// console.log("the sisisisisiis " +req.query.typeId);
  opDb.getNewsPage(req.query.typeId, function(data) {
    //  console.log("the sisisisisiis ");

    var endNum = req.query.page * 12;
    var startNum = endNum - 12;
    if (endNum > data.newsNum)
      endNum = data.newsNum;
    var pageNews = data.posts.slice(startNum, endNum);


    var allNews = new Array();
    for (var i = 0; i < pageNews.length; i++) {
      var oneNews = {
        "author": pageNews[i].author,
       "icon":pageNews[i].icon,
        "from":pageNews[i].from,
        "title": pageNews[i].title,
        "link": pageNews[i].link,
        "pubDate": pageNews[i].pubDate.toString().slice(0, 15)
      };
      allNews[i] = oneNews;
    }
    var datas = {
      "posts": allNews,
      "newsNum": data.newsNum
    };

    res.json(datas);
  });

}