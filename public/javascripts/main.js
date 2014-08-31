$(document).ready(function(){
   $(window).resize(function(){
        var shiftPos = ($(window).height() - $('.panel-intro').height())/2;
    $('.panel-intro').css({'padding-top':shiftPos +'px'});
    });

  $(window).scroll(function(){
  var newsHeight = $('#news').offset().top;
  var currentPos = $(window).scrollTop();//目前已经滚动了的高度
  var scrollHeight = $(document).height();//整个页面高度
  var windowHeight = $(this).height();//可见区域高度
  if(currentPos >= (newsHeight - 100)){
    $("#to-top").css({"display":"block"});
   }
   else{
     $("#to-top").css({"display":"none"});
   }

   if(currentPos <newsHeight){
    $('.panel-intro').css({'opacity':1-currentPos*0.003});//'transform': 'translate(0px, '+currentPos*0.5+'px)'

   }
});

  $(".nav-scroll li").click(function(){
    var target = $(this).find("a").attr('href').slice(1);
    var scrollDistance = parseInt($('#'+target).offset().top);
    $("html,body").animate({scrollTop: scrollDistance}, 1000);
    return false;
  });

  $("#to-top").click(function(){
    $("html,body").animate({scrollTop: 0},1000);
    return false;
  })

  $(".label-nav li").click(function(){
    var typeId = $(this).find("a").attr("id");
    changeTag(typeId);
    return false;
  });

  $(".responsive-menu i").click(function(){
    
    if($(".head-nav").hasClass("is-visible")){
      $(".mobile-btn.fa-angle-up").addClass("hidden");
        $(".mobile-btn.fa-list").removeClass("hidden");
       $(".head-nav").removeClass("is-visible");
       
    }
    else{
           $(".mobile-btn.fa-list").addClass("hidden");
        $(".mobile-btn.fa-angle-up").removeClass("hidden");
         $(".head-nav").addClass("is-visible");
    }

  });

$("#more a").click(function(){
  var loadingStr = "加载更多<i class='fa fa-repeat'></i>"; 
  var nextPage = $(this).attr("id");
  var typeId = $(".label-nav").find(".selected").attr("id");
  $("#more a").html(loadingStr);
  getRSSnews(nextPage, typeId);
  return false;
});
$(".imgBox a").click(function(){
  var audio = document.getElementById('myaudio');
  var play = "<div class='audio'><i class='fa fa-play'></i></div>";
  var pause = "<div class='audio'><i class='fa fa-pause'></i></div>";
  if(audio.paused){
    $("audio").attr("src","music/1.mp3");
    audio.play();
    $(".describe-info").html(pause);
  }
  else{
    audio.pause();
    $(".describe-info").html(play);
  }
   return false;
});

$(".label-nav li a").mouseenter(function(){
  var start = 38; 
  var tagNum=$(this).attr("id");
  var distance = start+(28+50+28)*tagNum;
  console.log("in "+tagNum);
  $(".point-arrow").css({"left":distance+"px"});
});

$(".label-nav li a").mouseleave(function(){
    var tagNum = 0;
    var $isSelected = $(".label-nav li:eq("+i+")").find("a").hasClass("selected");
    var $this_selected = $(this).hasClass("selected");
    if(!$this_selected){
       var start = 38;
       for(var i=0; i< $(".label-nav li a").length; i++){
        if($(".label-nav li a").eq(i).hasClass("selected")){
          tagNum = $(".label-nav li a").eq(i).attr("id");      
          }
     }
    var distance = start+(28+50+28)*tagNum;
    $(".point-arrow").css({"left":distance+"px"});
   }
});


});

$(document).on("click", "#blogsPage a",function(){
   var pageNum = $(this).attr("id");
  $('.blog-panel').html("<div class='loadingPanel'>正在加载... <i class='fa fa-repeat'></i></div>");
  showIndexBlog(pageNum);
}); 



function changeTag(id){
  $('.rss-panel').html("<div class='loadingPanel'><i class='fa fa-repeat'></i></div>");
  for(var i=0; i<2; i++){
    if(i == id)
      $(".label-nav").find("a").eq(i).addClass("selected");
    else
      $(".label-nav").find("a").eq(i).removeClass("selected");
  }
$("#more a").attr("id",1);
    getRSSnews(null,id);

}
