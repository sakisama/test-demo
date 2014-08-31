document.write("<script src='/javascripts/myTools.js'></script>");
function getRSSnews(pageNum, id) {
	
	if (pageNum == null)
		pageNum = 1;
	if (id == null)
		id= 0;
	$.ajax({
		data: {
			page: pageNum,
			typeId: id
		},
		dataType: "json",
		type: "get",
		url: "/getNewsPage",
		success: function(data) {
			var newsNum = data.newsNum;
			var newsPages = Math.ceil(newsNum / 12);
			var pageHtml = "";
			var html = "";
			var rPageNum;
			pageNum = parseInt(pageNum);		
			rPageNum = pageNum + 1;

			for (var i = 0; i < data.posts.length; i++) {
				var blog = data.posts[i];
				var date = blog.pubDate;
				//var time = date[1].split(' ');
				if(i%4 == 0)
					html += "<ul class = 'show-Panel'>";
					html += "<li class='NewsPanel'><article ><header><span class='rssPubTime'>"+date+"</span></header><a target='_blank' href='"+blog.link+"'>"+blog.title+"</a>";
					html +="<footer class='uperPanel'><ul class='authorInfo'><li>by "+blog.author+"</li><li class='blogfrom'>from "+blog.from+"</li></ul>";
					html += "<img class='uperIcon' src='"+blog.icon+"'></footer></article></li>";

				if(i%4 == 3 || i == (data.posts.length -1) )
					html += "</ul>";
			}
			$(".rss-panel .loadingPanel").remove();
			$(".rss-panel").append(html);

			$("#more a").attr("id", rPageNum);
			$("#more a").attr("total", newsPages);
			$("#more i").remove();

			
			if(rPageNum > newsPages){
				$("#more").remove();
			}
			
			
			$("#newsPage").html(pageHtml);
		},
		error: function() {
			$(".rss-panel").html("数据获取失败，刷新一下吧～");
		}
	})

};

function showIndexBlog(pageNum){
	if (pageNum == null)
		pageNum = 1;
	$.ajax({
		data:{
			page:pageNum
		},
		dataType:'json',
		type:'get',
		url:'/getIndexBlog',
		success:function(datas){
			var blogsNum = datas.blogsNum;
			var blogsPages =  Math.ceil(blogsNum/ 5);
			var pageHtml = "";
			var lPageNum;
			var rPageNum;
			var html = "";
			var allBlogId="";
			pageNum = parseInt(pageNum);
			if (pageNum > 1)
				lPageNum = pageNum - 1;
			if (pageNum < blogsPages)
				rPageNum = pageNum + 1;
			console.log("blogsNum: "+blogsNum);
			console.log("blogslength: "+datas.blogs.length);
			for (var i = 0; i < datas.blogs.length; i++) {
				
				var blog = datas.blogs[i];
				var date = blog.pubDate.slice();
				var abstract= blog.content;
				var keepTags = ["p","br","ul","li"];
				var abstract = DelHtmlTag(abstract, keepTags);
				var wordIndex = endOfWordIndex(abstract, 600);
				abstract = abstract.slice(0,wordIndex);
				abstract += "...";
					//alert(blog.indexPic.length);
				if(blog.indexPic != ""){
					html += "<article id='articlePanel' class='shiftContent'><img class='indexPic' src='"+blog.indexPic+"'>";
				}
				else{
					html += "<article id='articlePanel' class='shiftContent'>";
				}
				html += "<h1><a  class='blog-title' target='_blank' href='/blogs/"+ blog.blogId +"'>"+blog.title+"</a></h1>"
				html += "<div id='blog-meta"+i+"' class='blog-meta'><div class='blog-date'><h2>"+ blog.pubDate.split(" ")[2] + "</h2>";
				html += "<h3>"+blog.pubDate.split(" ")[1] +" "+ blog.pubDate.split(" ")[3]+"</h3>";
				html += " <div class='author-image-line'></div></div>";
				html +="<span class='blog-author'><a>" + blog.user + "</a><i class='fa fa-user'></i></span>";
				html += "<span class='views'><a>"+blog.views+"次阅览</a><i class='fa fa-eye'></i></span>";
				html += "<span class='comments'><a id='"+blog.blogId+"'>0条评论</a><i class='fa fa-comments'></i></span></div>";
									

				html +="<div id='contentPanel'  class='blog-content'>" + abstract+ "</div>";
				html += "<div class='readBlogBtn'><a target='_blank' href='/blogs/"+ blog.blogId +"'>继续阅读</a></article></div>";
				//$(".blog-panel").append(html);

				allBlogId += blog.blogId+",";
			}
				
				$(".blog-panel").html(html);
				

				//getDuoShuoStatistics(allBlogId);
				getChangYanStatistics(allBlogId);

				var pagePanel = "<div id='blogsPage' class='blogPagePanel pageBtn'></div>";
				$(".blog-panel").append(pagePanel);
				var pageArray =  createPageList(blogsPages, pageNum);
				if(pageArray.length>1){
					
					for(var i = 0; i < pageArray.length; i++){
						if(pageArray[i] == pageNum)
							pageHtml += "<span class='noneBtn'>"+pageArray[i]+"</span>";
						else if( pageArray[i] == "...")
							pageHtml += "<span class='noneBtn dot'>"+pageArray[i]+"</span>";
						else 
							pageHtml += "<a id='"+pageArray[i]+"' href='#blog'>"+pageArray[i]+"</a>";
					}

					$("#blogsPage").html(pageHtml);
				}

		},
		error: function(){
			$(".blog-panel").html("数据获取失败，刷新一下吧～");
		}
	});
}

escapeHTML = function(text) {
  return $('<div/>').text(text).html();
}
function showBlogList(){
	$.ajax({
		dataType:'json',
		type:'get',
		url:'/getBlogList',
		success: function(data){
	
			var html='';
			for(var i=0; i < data.BlogList.length; i++){// <li class="active"><a href="#"><p class="entry-title">abc</p></a></li>
				html += "<li><a href='#' id='"+data.BlogList[i].blogId+"' ><p class='entry-title'>"+escapeHTML(data.BlogList[i].title)+"</p>";
				html += "<span>"+data.BlogList[i].pubTime+"</span>"
				html += "</a><div class='rmBtn'><span class='glyphicon glyphicon-remove'></span></div></li>";

			}
			$('.list-ol').html(html);

		},
		error:function(){

			alert("showBlogList Wrong");
		}


	});
}

function showBlogContent(blogTitle,blogId){
	$.ajax({
		data:{
			title:blogTitle,
			blogId:blogId
		},
		dataType:'json',
		type:'get',
		url:'/getBlogContent',
		success:function(datas){
			$('#blogTitle').val(datas.title);
			$('#indexPic').val(datas.indexPic);
			CKEDITOR.instances.editor1.setData( datas.content);
		},
		error:function(){
			alert("showBlogContent Wrong");
		}
	});
}

function showOneBlog(blogId){
	$.ajax({
		data:{
			blogId:blogId
		},
		dataType:'json',
		type:'get',
		url:'/getOneBlog',
		success:function(datas){
			var pubDate= datas.pubDate.split(" ");
			var time = pubDate[1]+" "+pubDate[2]+"," +pubDate[3];
			$('.panel-title').html(datas.title);
			$('.blog-content').html(datas.content);


			var html = time;
			$('.panel-time').html(html);
			
			if(datas.indexPic.length > 0){
				$('.showPanel').css({"background-image":"url('"+datas.indexPic+"')"});
			}
			else{
				$('.showPanel').css({"background-image":"url('/images/2.jpg')"});
			}
				

			//$(".views").find("span").html(datas.views+" views");
			//setDuoShuo(blogId,datas.title);
			document.title=datas.title;
			//getDuoShuoUserInfo();
		},
		error:function(){
			alert("showBlogContent Wrong");
		}
	});
}

