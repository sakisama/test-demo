function endOfWordIndex(htmlStr, maxnums){
	//目前未处理的情况截取字数所在位置没有后面的闭标签
	var startCount = true;
	var numWords = 0;
	var index;
	for(var i =0; i<htmlStr.length; i++){
		if(htmlStr[i] == "<"){
			startCount = false;
			continue;
		}
		else if(htmlStr[i] == ">"){
			startCount =true;
			continue;
		}
		if(startCount == true){
			numWords++;
			if(numWords == maxnums){
				index = i;
				break;
			}
		}
	}
	return index;		
}

function DelHtmlTag(htmlStr, keepTags, callback){
	var tmp=htmlStr;
	var delRegex  = new RegExp("<([^>]+)>", "g");
	var regexTag;
	var tempTag;
	if(htmlStr){	
		for(var i = 0; i<keepTags.length; i++){
			regexTag = new RegExp("<"+keepTags[i]+" ", "g") ;
			tempTag = "[" + keepTags[i] +" ";
			tmp = tmp.replace(regexTag, tempTag);
			
			regexTag = new RegExp("<"+keepTags[i]+">", "g") ;
			tempTag = "[" + keepTags[i] +">";
			tmp = tmp.replace(regexTag, tempTag);

			regexTag =new RegExp("<\\/" + keepTags[i] + ">", "g");
			tempTag = "[/" + keepTags[i] + "]";
			tmp = tmp.replace(regexTag, tempTag);
		}
		
		tmp = tmp.replace(delRegex, "");

		for(var i = 0; i<keepTags.length; i++){
			regexTag = new RegExp('\\['+keepTags[i]+' ', "g") ;
			tempTag = "<" + keepTags[i] +" ";
			tmp = tmp.replace(regexTag, tempTag);

			regexTag = new RegExp('\\['+keepTags[i]+'>', "g") ;
			tempTag = "<" + keepTags[i] +">";
			tmp = tmp.replace(regexTag, tempTag);

			regexTag =new RegExp("\\[/" + keepTags[i] + "]", "g");
			tempTag = "</" + keepTags[i] + ">";
			tmp = tmp.replace(regexTag, tempTag);
		}
		return tmp;

	}
	else{
		return false;
	}
		
}

function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appenChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}

}

function setDuoShuo(blogId,title){
		$(".ds-thread").attr("data-thread-key",blogId);
		$(".ds-thread").attr("data-title",title);
		$(".ds-thread").attr("data-url",window.location.href);
}


/*function getDuoShuoStatistics(blogId){
	var user = "codecat";
	blogId = blogId.slice(0,blogId.length-1);
	
	   $.ajax({
	    	type:"get",
	    	url:"http://api.duoshuo.com/threads/counts.jsonp",
	    	dataType:"jsonp",
	    	data:{
	    		short_name:user,
	    		threads:blogId,
	    		
	    	},
	    	success: function(data){
	    		var countVal ;
	    		var blogId;
	    	
	    		$.each(data.response, function(i, item) {
	    		        countVal = item.comments;
	    		        blogId = "#"+i;
	    		       console.log(i+" "+countVal);
	    		        $(blogId).html(countVal+"条评论");
	    		    });

	    		
	    	},
	    	error: function(XMLHttpRequest, textStatus, errorThrown){
	    		  console.log(XMLHttpRequest.status);
	    		  console.log(XMLHttpRequest.readyState);
	    		  console.log(textStatus);

	    	}
	    });
}*/
function getChangYanStatistics(blogId){
	var user = "cyrjEFRl8";
	blogId = blogId.slice(0,blogId.length-1);
	
	   $.ajax({
	    	type:"get",
	    	url:"http://changyan.sohu.com/api/2/topic/count",
	    	dataType:"jsonp",
	    	data:{
	    		client_id:user,
	    		topic_source_id:blogId	    		
	    	},
	    	success: function(data){
	    		var countVal ;
	    		var blogId;
	    	
	    		$.each(data.result, function(i, item) {
	    		        countVal = item.comments;
	    		        blogId = "#"+i;
	    		       console.log(i+" "+countVal);
	    		        $(blogId).html(countVal+"条评论");
	    		    });

	    		
	    	},
	    	error: function(XMLHttpRequest, textStatus, errorThrown){
	    		  console.log(XMLHttpRequest.status);
	    		  console.log(XMLHttpRequest.readyState);
	    		  console.log(textStatus);

	    	}
	    });
}


function createPageList(totalPage, currentPage){
	var showPageNums = parseInt(5);
	var startPage = parseInt(currentPage - (showPageNums-1)/2);
	var lastOne = parseInt(currentPage + (showPageNums-1)/2);
	var htmlPage = [];
	var temp;
	totalPage = parseInt(totalPage);
	currentPage = parseInt(currentPage);
	if(currentPage > totalPage){
		return "error: currentPage > totalPage";
	}

	if(lastOne >= totalPage)
		lastOne = totalPage-1;

	if(startPage - 1 > 3){
		htmlPage.push(1);
		htmlPage.push("...");
	}
	else{
		for(var i = 1; i < startPage; i++){
			htmlPage.push(i);
		}
	}

	if(startPage <= 0)
		startPage = 1;
	if(startPage >= (totalPage-showPageNums) && (totalPage-showPageNums)>0)
		startPage = totalPage-showPageNums+1;

	for(var i = 0; i < showPageNums; i++){
		temp = startPage + i;
		if(temp <= 0 || temp >= totalPage){
			continue;
		}
		htmlPage.push(temp);
	}

	if((totalPage - lastOne) >3){
		htmlPage.push("...");
		htmlPage.push(totalPage);
	}
	else{
		for(var i = lastOne+1; i <= totalPage; i++){
			htmlPage.push(i);
		}
	}
	return htmlPage;
}

