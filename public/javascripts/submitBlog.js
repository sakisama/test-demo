function submitBlog(title, content,indexPic){
	$.ajax({
		data: {

			title: title,
			content: content,
			indexPic: indexPic
		},
		dataType: 'text',
		type:'post',
		url:'/submitBlog',
		success: function(data) {
			alert(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("post new blog faild: "+textStatus + "  errorThrown:"+errorThrown);
		}

	});
}

function updateBlog(title, blogId, content,indexPic){
	$.ajax({
		data:{
			title: title,
			blogId: blogId,
			content: content,
			indexPic: indexPic
		},
		dataType: 'text',
		type: 'post',
		url: '/updateBlog',
		success: function(msg){
			alert(msg);
		},
		error:function(){
			alert("update blog faild");
		}	

	});
}

function delBlog(blogId){
	$.ajax({
		data:{
			blogId: blogId
		},
		dataType:'text',
		type:'get',
		url:'/delBlog',
		success:function(datas){
			alert(datas);
		},
		error:function(){
			alert("delBlog Wrong");
		}
	});
}