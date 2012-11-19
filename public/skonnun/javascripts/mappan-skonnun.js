var lastStatus = "fullscreen";
var mobileBreakpoint = 767;
var floatIns = [];
function Update() {
  $('.floatin').each( function() {

    if ( $(this).is(':in-viewport-vertically') ){
      //$(this).children(".floatin").each( function() {
        revealIfFullScreen(this, "transition-1");
      //});
    }
  });
  $('.floatin-text').each( function() {
    if ( $(this).is(':in-viewport-vertically') ){
      //$(this).children(".floatin").each( function() {
        revealIfFullScreen(this, "transition-text");
      //});
    }
  });
}

function revealIfFullScreen(this, cssClass) {
  if(lastStatus == "fullscreen") {
    triggerReveal(this, cssClass);    
  }
}

function isTouchDevice() {
   var el = document.createElement('div');
   el.setAttribute('ongesturestart', 'return;');
   return typeof el.ongesturestart === "function";
}

(function ($) {
  if (isTouchDevice()) {
    
  } else {
    $(window).bind('scroll',function(){
        Update();
    });
    Update();
    $(window).on('resize',function(){  
      Resize();
    });
    Resize();
  }
} ( jQuery ) );

    
function triggerReveal(this, cssClass) {
  if (floatIns[$(this).attr('id')] != true) {
    floatIns[$(this).attr('id')] = true;
    setTimeout( function() {
      $(this).addClass(cssClass);  
    }, 300);
  }
}


function Resize() {
  if (window.innerWidth <= mobileBreakpoint)
  {
    if (lastStatus != "mobile")
    {
      //$("body").addClass("mobile-site");
      
      lastStatus = "mobile";  
    }
  }
  else
  {
    if (lastStatus != "fullscreen")
    {
      //$("body").removeClass("mobile-site");
     
      lastStatus = "fullscreen";  
    }
  }
  

}