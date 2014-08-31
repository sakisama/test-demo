function getRssInHomePage(){

  $.ajax({
  data:{page:1},
  dataType:"json",
  type:"get",
  url:"/getNewsPage",
  success:function(data){
    var html="";
    for(var i=0;i<data.posts.length;i++){
      var blog = data.posts[i];
      var date = blog.pubDate.split('T');
      var time = date[1].split('.');
      html += "<tr><th><a target='_blank' href='"+blog.link+"'>"+blog.title+"</a></th>";
      html += "<th class='text-right'>"+time[0]+" "+date[0]+"</th></tr>"
    }

    $(".showRss").html(html);

  },
  error:function(){
      alert("首页rss获取失败");
  }


});
}
