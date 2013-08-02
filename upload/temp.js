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
$(document).ready(function()
{
	$('ul.sf-menu').supersubs({minWidth:12,maxWidth:20,extraWidth:1}).superfish({animation: {width:'show'},delay:1000});
	
	$(".zoom").mouseover(function()
	{	
		if(	$(".search").css("visibility")=="hidden")
			$(".search").css("visibility","visible");
		else
			$(".search").css("visibility","hidden");		
	});
	
	$(".zoom").mouseout(function()
	{	
		if(	$(".search").css("visibility")=="hidden")
			$(".search").css("visibility","visible");
		else
			$(".search").css("visibility","hidden");		
	});
	
	for(var i=1;i<=114;i++)
	;//	$('.ribbon .sf-scrolling')[0].innerHTML+="<li>"+i+"</li>";
	
	$('.ribbon .sf-scrolling').superscroll();
	$('#recitor  .sf-scrolling').superscroll();

});

$(window).load(function()
{	
	/*
	var flipleft=Math.round($(".book").offset().left);
	var fliptop=Math.round($(".book").offset().top);	

	document.getElementById('leftMenu').style.left=(flipleft-35)+"px";
	document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
			
	// dont add this document.getElementById('gqMain').style.marginLeft=(flipleft-10)+"px";
	
	var leftValue=flipleft-160;
	document.getElementById('leftArrow').style.left=leftValue+"px";
	var topValue=fliptop+$(".book").height()/2-$(".leftArrow").height()/2;	
	document.getElementById('leftArrow').style.top=topValue+"px";
	
	
	var rightValue=flipleft+$(".book").width()+120;
	document.getElementById('rightArrow').style.left=rightValue+"px";	
	document.getElementById('rightArrow').style.top=topValue+"px";
	setScroll();
*/
	
	var flag = false;		
	var prevPageNum = 0;
	
	$(".book").turn({	
        acceleration: true,	
	    gradients: !$.isTouch,	
		autoCenter: true,
	})
	.turn("direction", "rtl")
	.bind("turned", function(event, page, view)
	{
		if(page == 1)
		{
			$(".book").css("background-image","url(img/leftbookback.png)");
			$(".stackleft").hide();
			$(".stackright").hide();
			hidePlayer();
		}
		
		if(page >= 2)
		{
			setScroll();
		//<!-- pagestackleft width control---->				
/*			
			var width=(($(".book").turn("pages")-4)/2-(page/2-1));
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
			$(".book").css("background-image","url(img/leftbookback.png),url(img/rightbookback.png)");
			document.getElementById('leftMenu').style.left=($('#stackleft').offset().left+width-66)+"px";
			document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
*/
		}
		
		if(page >= 2 && page < $(".book").turn("pages"))
		{		
/*
			$(".leftMenu").show();		
			var ribbonleft=$(".book").offset().left+$(".book").width()/2-52;
			var ribbontop=$(".book").offset().top;
			document.getElementById('ribbon').style.left=ribbonleft+"px";
			document.getElementById('ribbon').style.top=ribbontop+"px";
			$(".ribbon").show();		
*/
		}  
		else
		{
			$(".ribbon").hide();		
		}
		
		console.log(page);
	})
	.bind("turning", function(event, page, view)
	{	
		// if(page>=2)
		//	$(".book").css("background-image","url(img/bookback.png)");	
		
		if (page == 1) 
		{
			$(".leftMenu").hide();		
			$(".stackleft").hide();		
			$(".stackright").hide();		
		}
		
		$(".ribbon").hide();
	})
	.bind("pressed", function(event, page, view)
	{							
		coverflag = true;
		flag = true;
		prevPageNum = $(".book").turn("page");
		$(".ribbon").hide();
		console.log('prev page: '+prevPageNum);
	})
	.bind("turned", function(event, page, view) 
	{		
		if(flag && $(".book").turn("page") != $(".book").turn("pages") && $(".book").turn("page") != 1)
			$(".ribbon").show();
		if( $(".book").turn("page") == $(".book").turn("pages")-2)
		{
			$(".stackleft").hide();
		}		
	})
	.bind("released", function(event, page, view)
	{
		if(flag && prevPageNum == $(".book").turn("page") && $(".book").turn("page") != 1 &&  $(".book").turn("page") < $(".book").turn("pages"))
		{
			$(".stackleft").show();
			$(".leftMenu").show();
			flag = false;
			$(".ribbon").show();
		}
		
	});	
});
	
function turnLeftPage(){
	var pageNumber=$(".book").turn("page");
	if($(".book").turn("hasPage",pageNumber-1))
		$(".book").turn("previous");
}
function turnRightPage(){
	var pageNumber=$(".book").turn("page");
	if($(".book").turn("pages")-pageNumber > 2)
		$(".book").turn("next");
}
$(window).resize(function() {	
	var flipleft=Math.round($(".book").offset().left);
	var fliptop=Math.round($(".book").offset().top);

	document.getElementById('leftMenu').style.left=(flipleft-35)+"px";
	document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
		
	// dont add this  document.getElementById('gqMain').style.marginLeft=(flipleft-10)+"px";

	var leftValue=flipleft-160;
	var topValue=fliptop+$(".book").height()/2-$(".leftArrow").height()/2;	
	document.getElementById('leftArrow').style.left=leftValue+"px";	
	document.getElementById('leftArrow').style.top=topValue+"px";
	
	var rightValue=flipleft+$(".book").width()+120;
	document.getElementById('rightArrow').style.left=rightValue+"px";	
	document.getElementById('rightArrow').style.top=topValue+"px";
		
			
	var ribbonleft=$(".book").offset().left+$(".book").width()/2-35;
	var ribbontop=$(".book").offset().top;
	document.getElementById('ribbon').style.left=ribbonleft+"px";
	document.getElementById('ribbon').style.top=ribbontop+"px";
	
	var page=$(".book").turn("page");
	var width=(($(".book").turn("pages")-4)/2-(page/2-1));
	width=(width<=10?width:10);								
	document.getElementById('stackleft').style.width=(width*2)+"px";
	document.getElementById('stackleft').style.marginLeft=(36-width*2)+"px";
	document.getElementById('stackleft').style.marginTop=26+"px";	
	
	var width1=page/2-1;
	width1=(width1<=10?width1:10);
	document.getElementById('stackright').style.width=(width1*2)+"px";
	document.getElementById('stackright').style.marginLeft=1077+"px";
	document.getElementById('stackright').style.marginTop=26+"px";
	
					

	document.getElementById('leftMenu').style.left=($('#stackleft').offset().left+width-66)+"px";
	document.getElementById('leftMenu').style.top=(fliptop+130)+"px";
});


function setScroll(){	
	var pn=$(".book").turn("page");	

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