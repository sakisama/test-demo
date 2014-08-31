var spiderUtil = require('../getRss/spiderUtil.js');
var opDB = require('../getRss/operationDb.js');
var rssSite = require('../config/rssSite.json');
var cheerio = require('cheerio');

function spiderStart(callback){
  console.log("spider start...")
  var sites = rssSite.sites;
  sites.forEach(function(site){
    site.channel.forEach(function(e){
      if(e.work !== "false"){
        console.log("begin " + e.title);
        spiderUtil.takeRss(e.link, e.typeId, e.from,e.img, e.title, function(rssMsgs){ //获得指定链接的RSS
          rssMsgs.forEach(function(rssMsg){
            /*spiderUtil.getNewsContent(rssMsg.link, site.contentTag, function(context, descImg){
              if(descImg != null && descImg.indexOf(site.newsPic) === -1){
                rssMsg.descImg = descImg;
              }
              if(context != null && context !== ""){
                var $ = cheerio.load(context);
                $("iframe").remove();
                $("img[src='" + site.removeElement +"']").remove();
                rssMsg.context = $.html();
                saveDB.addMsg(rssMsg);  //保存到数据库
              }
            });*/

            opDB.addNews(rssMsg);  //保存到数据库
          });

        });
      }
    });
  });
   callback();
}

exports.spiderStart = spiderStart;
