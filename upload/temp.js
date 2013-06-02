function showPlayer(){
	$('.startplay').css('display','none');
	$('.closeplayer').css('display','inherit');
	$('#playerNavBox').css('display','inherit');
}
function hidePlayer(){
	$('.startplay').css('display','inherit');
	$('.closeplayer').css('display','none');
	$('#playerNavBox').css('display','none');
}
$(document).ready(function(){
	$('ul.sf-menu').supersubs({minWidth:12,maxWidth:20,extraWidth:1}).superfish({animation: {width:'show'},delay:1000});
	
	$(".zoom").mouseover(function(){	
		if(	$(".search").css("visibility")=="hidden")
			$(".search").css("visibility","visible");
		else
			$(".search").css("visibility","hidden");		
	});
	$(".zoom").mouseout(function(){	
		if(	$(".search").css("visibility")=="hidden")
			$(".search").css("visibility","visible");
		else
			$(".search").css("visibility","hidden");		
	});
	for(var i=1;i<=114;i++)
		$('.ribbon .sf-scrolling')[0].innerHTML+="<li>"+i+"</li>";
	$('.ribbon .sf-scrolling').superscroll();
	$('#recitor  .sf-scrolling').superscroll();

});

	$(window).load(function() {
	
	
	var flipleft=Math.round($(".flipbook").offset().left);
	var fliptop=Math.round($(".flipbook").offset().top);

	

	document.getElementById('leftMenu').style.left=(flipleft-35)+"px";
	document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
			
	document.getElementById('gqMain').style.marginLeft=(flipleft-10)+"px";
	
	var leftValue=flipleft-160;
	document.getElementById('leftArrow').style.left=leftValue+"px"
	var topValue=fliptop+$(".flipbook").height()/2-$(".leftArrow").height()/2;	
	document.getElementById('leftArrow').style.top=topValue+"px";
	
	
	var rightValue=flipleft+$(".flipbook").width()+120;
	document.getElementById('rightArrow').style.left=rightValue+"px"	
	document.getElementById('rightArrow').style.top=topValue+"px";
	setScroll();

	
	$(".flipbook").turn({	
        acceleration: true,	
	    gradients: !$.isTouch,	
		autoCenter: true,
	});

	$(".flipbook").turn("direction", "rtl");

	$(".flipbook").bind("turned", function(event, page, view) {
		if(page==1){
		$(".flipbook").css("background-image","url(images/leftbookback.png)");
			$(".stackleft").hide();
			$(".stackright").hide();
			hidePlayer();
		}		
		if(page>=2){
			setScroll();
		//<!-- pagestackleft width control---->				
			
			var width=(($(".flipbook").turn("pages")-4)/2-(page/2-1));
			width=(width<=20?width:20);								
			document.getElementById('stackleft').style.width=(width*2)+"px";
			document.getElementById('stackleft').style.marginLeft=(36-width*2)+"px";
			document.getElementById('stackleft').style.marginTop=26+"px";
			
			var width1=page/2-1;
			width1=(width1<=20?width1:20);
			document.getElementById('stackright').style.width=(width1*2)+"px";
			document.getElementById('stackright').style.marginLeft=1077+"px";
			document.getElementById('stackright').style.marginTop=26+"px";
					
			$(".stackleft").show();
			$(".stackright").show();
			$(".flipbook").css("background-image","url(images/leftbookback.png),url(images/rightbookback.png)");
			document.getElementById('leftMenu').style.left=($('#stackleft').offset().left+width-66)+"px";
			document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
		}	  
	  if(page>=2 && page<$(".flipbook").turn("pages")){		
		$(".leftMenu").show();		
		var ribbonleft=$(".flipbook").offset().left+$(".flipbook").width()/2-52;
		var ribbontop=$(".flipbook").offset().top;
		document.getElementById('ribbon').style.left=ribbonleft+"px";
		document.getElementById('ribbon').style.top=ribbontop+"px";
		$(".ribbon").show();		
	  }  
	  else{
		$(".ribbon").hide();		
	  }
	  
	});
	$(".flipbook").bind("turning", function(event, page, view) {
	
	//if(page>=2)
			//$(".flipbook").css("background-image","url(images/bookback.png)");	
			if (page==1) {
				$(".leftMenu").hide();		
				$(".stackleft").hide();		
				$(".stackright").hide();		
			 }			 
	  $(".ribbon").hide();
	});
	var flag=false;		
	var prevPageNum=0;
	$(".flipbook").bind("pressed", function(event, page, view) {							
		coverflag=true;
		flag=true;
		prevPageNum=$(".flipbook").turn("page");
		$(".ribbon").hide();
	});	
	$(".flipbook").bind("turned", function(event, page, view) {		
		if(flag && $(".flipbook").turn("page")!=$(".flipbook").turn("pages") && $(".flipbook").turn("page")!=1)
			$(".ribbon").show();
		if( $(".flipbook").turn("page")==$(".flipbook").turn("pages")-2){
			$(".stackleft").hide();
		}

		
	});	

	$(".flipbook").bind("released", function(event, page, view) {			

		if(flag && prevPageNum==$(".flipbook").turn("page") && $(".flipbook").turn("page")!=1 &&  $(".flipbook").turn("page")<$(".flipbook").turn("pages")){
				$(".stackleft").show();
				$(".leftMenu").show();
				flag=false;
				$(".ribbon").show();
			}
			
	});	
	});
	function turnLeftPage(){
		var pageNumber=$(".flipbook").turn("page");
		if($(".flipbook").turn("hasPage",pageNumber-1))
			$(".flipbook").turn("previous");		
	}
	function turnRightPage(){
		var pageNumber=$(".flipbook").turn("page");
		if($(".flipbook").turn("pages")-pageNumber>2)
			$(".flipbook").turn("next");
	}
	$(window).resize(function() {	
		var flipleft=Math.round($(".flipbook").offset().left);
		var fliptop=Math.round($(".flipbook").offset().top);

		document.getElementById('leftMenu').style.left=(flipleft-35)+"px";
		document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
			
		document.getElementById('gqMain').style.marginLeft=(flipleft-10)+"px";
	
		var leftValue=flipleft-160;
		var topValue=fliptop+$(".flipbook").height()/2-$(".leftArrow").height()/2;	
		document.getElementById('leftArrow').style.left=leftValue+"px"	
		document.getElementById('leftArrow').style.top=topValue+"px";
		
		var rightValue=flipleft+$(".flipbook").width()+120;
		document.getElementById('rightArrow').style.left=rightValue+"px"	
		document.getElementById('rightArrow').style.top=topValue+"px";
			
				
		var ribbonleft=$(".flipbook").offset().left+$(".flipbook").width()/2-35;
		var ribbontop=$(".flipbook").offset().top;
		document.getElementById('ribbon').style.left=ribbonleft+"px";
		document.getElementById('ribbon').style.top=ribbontop+"px";
		
		var page=$(".flipbook").turn("page");
		var width=(($(".flipbook").turn("pages")-4)/2-(page/2-1));
		width=(width<=20?width:20);								
		document.getElementById('stackleft').style.width=(width*2)+"px";
		document.getElementById('stackleft').style.marginLeft=(36-width*2)+"px";
		document.getElementById('stackleft').style.marginTop=26+"px";	
		
		var width1=page/2-1;
		width1=(width1<=20?width1:20);
		document.getElementById('stackright').style.width=(width1*2)+"px";
		document.getElementById('stackright').style.marginLeft=1077+"px";
		document.getElementById('stackright').style.marginTop=26+"px";
		
						

		document.getElementById('leftMenu').style.left=($('#stackleft').offset().left+width-66)+"px";
		document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
	});
	
	
	function setScroll(){	
		var pn=$(".flipbook").turn("page");	

		if(pn<=1) return;
		if(pn==2){			
			$('.p3 #pagecontent').slimScroll({
			position: 'right',
		height: '710px',
		width: '490px',
		railVisible: true,
			distance : '1px',
		alwaysVisible: false
			});	
			return;
		}
		if(pn>=3){
			if(pn%2==0){		
				var classId="p"+pn;	
				$('.'+classId+' #pagecontent').slimScroll({
				position: 'left',
			height: '710px',
			width: '440px',
			railVisible: true,
				distance : '55px',
			alwaysVisible: false	
				});
				
				classId="p"+(pn+1);	
				$('.'+classId+' #pagecontent').slimScroll({
				position: 'right',
			height: '710px',
			width: '490px',
			railVisible: true,
				distance : '1px',
			alwaysVisible: false	
				});
				return;
			}
			if(pn%2==1){
				var classId="p"+pn;
				$('.'+classId+' #pagecontent').slimScroll({
				position: 'right',
			height: '710px',
			width: '490px',
			railVisible: true,
				distance : '1px',
			alwaysVisible: false	
				});
				if(pn!==3){
					classId="p"+(pn-1);
					$('.'+classId+' #pagecontent').slimScroll({
					position: 'left',
				height: '710px',
				width: '440px',
				railVisible: true,
					distance : '55px',
				alwaysVisible: false	
					});			
				}
			}
		}
		
	}