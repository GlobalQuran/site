
	
	$(window).load(function() {
	$(".leftMenu").hide();
	$(".ribbon").hide();
	$(".stack").hide();
	var flipleft=Math.round($(".sample-flipbook").offset().left);
	var fliptop=Math.round($(".sample-flipbook").offset().top);

	document.getElementById('stack').style.marginLeft=36+"px";
	document.getElementById('stack').style.marginTop=25+"px";	
			
	document.getElementById('gqMain').style.marginLeft=flipleft+"px";
	
	var leftValue=flipleft-150;
	document.getElementById('leftArrow').style.left=leftValue+"px"
	var topValue=fliptop+$(".sample-flipbook").height()/2-$(".leftArrow").height()/2;	
	document.getElementById('leftArrow').style.top=topValue+"px";
	
	
	var rightValue=flipleft+$(".sample-flipbook").width()+150;
	document.getElementById('rightArrow').style.left=rightValue+"px"	
	document.getElementById('rightArrow').style.top=topValue+"px";
	
	
	
	$(".sample-flipbook").turn({	
        acceleration: true,	
	    gradients: !$.isTouch,	
		autoCenter: true,
	});

	$(".sample-flipbook").turn("direction", "rtl");

	$(".sample-flipbook").bind("turned", function(event, page, view) {		
		if(page==1){
			$(".sample-flipbook").css("background-image","url(pics/leftbookback.png)");
			$(".stack").hide();
		}
		if(page>=2){
		<!-- pagestack width control---->						
			document.getElementById('stack').style.width=(($(".sample-flipbook").turn("pages")-4)/2-(page/2-1))+"px";
			$(".stack").show();
			$(".sample-flipbook").css("background-image","url(pics/bookback.png)");
		}	  
	  if(page>=2 && page<$(".sample-flipbook").turn("pages")){
		var left=$(".sample-flipbook").offset().left-60;
		var top=$(".sample-flipbook").offset().top+100;
		document.getElementById('leftMenu').style.left=(left+30)+"px";
		document.getElementById('leftMenu').style.top=top+"px";
		$(".leftMenu").show();
		
		var ribbonleft=$(".sample-flipbook").offset().left+$(".sample-flipbook").width()/2-35;
		var ribbontop=$(".sample-flipbook").offset().top-20;
		document.getElementById('ribbon').style.left=ribbonleft+"px";
		document.getElementById('ribbon').style.top=ribbontop+"px";
		$(".ribbon").show();		
	  }  
	  else{
		$(".ribbon").hide();		
	  }
	  
	});
	$(".sample-flipbook").bind("turning", function(event, page, view) {
	
	//if(page>=2)
			//$(".sample-flipbook").css("background-image","url(pics/bookback.png)");	
			if (page==1) {
				$(".leftMenu").hide();		
				$(".stack").hide();		
				
			 }
	  $(".ribbon").hide();
	});
	var flag=false;	
	var prevPageNum=0;
	$(".sample-flipbook").bind("pressed", function(event, page, view) {		
		if($(".sample-flipbook").turn("page")==2){
			console.log(page);
			$(".stack").hide();								
			$(".leftMenu").hide();							
		}
		flag=true;
		prevPageNum=$(".sample-flipbook").turn("page");
		$(".ribbon").hide();
	});	
	$(".sample-flipbook").bind("turned", function(event, page, view) {		
		if(flag && $(".sample-flipbook").turn("page")!=$(".sample-flipbook").turn("pages") && $(".sample-flipbook").turn("page")!=1)
			$(".ribbon").show();
		if( $(".sample-flipbook").turn("page")==$(".sample-flipbook").turn("pages")-2){
			$(".stack").hide();
		}
	});	

	$(".sample-flipbook").bind("released", function(event, page, view) {			
		if($(".sample-flipbook").turn("page")>=2){
			$(".leftMenu").show();
			$(".stack").show();
		}
		if(flag && prevPageNum==$(".sample-flipbook").turn("page") && $(".sample-flipbook").turn("page")!=1 &&  $(".sample-flipbook").turn("page")<$(".sample-flipbook").turn("pages")){
				flag=false;
				$(".ribbon").show();
			}
			
	});	
	});
	function turnLeftPage(){
		var pageNumber=$(".sample-flipbook").turn("page");
		if($(".sample-flipbook").turn("hasPage",pageNumber-1))
			$(".sample-flipbook").turn("previous");		
	};
	function turnRightPage(){
		var pageNumber=$(".sample-flipbook").turn("page");
		if($(".sample-flipbook").turn("pages")-pageNumber>2)
			$(".sample-flipbook").turn("next");
	};
	$(window).resize(function() {
		console.log("resize");
		var flipleft=Math.round($(".sample-flipbook").offset().left);
		var fliptop=Math.round($(".sample-flipbook").offset().top);
		document.getElementById('gqMain').style.marginLeft=flipleft+"px";		
		var left=flipleft-60;
		var top=fliptop+100;
		document.getElementById('leftMenu').style.left=(left+30)+"px";
		document.getElementById('leftMenu').style.top=top+"px";
		var leftValue=flipleft-150;
		document.getElementById('leftArrow').style.left=leftValue+"px";
		var topValue=fliptop+$(".sample-flipbook").height()/2-$(".leftArrow").height()/2;	
		document.getElementById('leftArrow').style.top=topValue+"px";
		
		var rightValue=flipleft+$(".sample-flipbook").width()+150;		
		document.getElementById('rightArrow').style.left=rightValue+"px"	
		document.getElementById('rightArrow').style.top=topValue+"px";		
		var ribbonleft=flipleft+$(".sample-flipbook").width()/2-35;
		var ribbontop=fliptop-20;
		document.getElementById('ribbon').style.left=ribbonleft+"px";
		document.getElementById('ribbon').style.top=ribbontop+"px";
	});
