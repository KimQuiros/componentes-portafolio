/* ==|====================
   JS/script
   -------INDEX--------
   #Slider
   #Canvas
   #Skills
   ======================= */

/* #Slider
 *-------------------------------------------------------*/
var initNumber = 1,
    itemSwipe = $('.slide'),
    interval,
    list = $(".content-product"),
    numToShow = 6,
    load_more = $("#loadMore"),
    return_top = $("#return"),
    numInList = list.length,
    slideImage = $(".slide-image img"),
    categoryChoose = "";

function sliderFunctions(){
  function nextImage(){
    if(initNumber != itemSwipe.length){
      $('.active').removeClass("active").next('.slide').addClass('active');
      $(".active-control").removeClass("active-control").next(".controls-item").addClass("active-control");
      initNumber=initNumber+1;
    }else{
      $('.active').removeClass('active');
      $('.slide:first').addClass('active');
      $(".active-control").removeClass("active-control");
      $(".controls-item:first").addClass("active-control");
      initNumber=1;
    }
  };

  function prevImage(){
    if(initNumber != 1){
      $('.active').removeClass('active').prev('.slide').addClass('active');
      $(".active-control").removeClass("active-control").prev(".controls-item").addClass("active-control");
      initNumber=initNumber-1;
    }else{
      $('.active').removeClass('active')
      $('.slide:last').addClass('active');
      $(".active-control").removeClass("active-control");
      $(".controls-item:last").addClass("active-control");
      initNumber=itemSwipe.length;
    }
  }

  function startSlider(){
    interval = setInterval(function(){
      nextImage();
    }, 5000);
  };

  function pauseSlider() {
    clearInterval(interval);
  }

  function createControls(){
    var li_controls="",
        controlsContent= $("#slider-controls");
    for(var i = 0;i<itemSwipe.length;i++){
      li_controls+='<li class="controls-item" id="'+i+'"></li>';
    }
    controlsContent.append(li_controls);
    $(".controls-item:first").addClass("active-control");
  }

  $("#slider-controls").on("click","li",function(){
    var li_id=$(this).attr("id");
    for(var i = 0;i<itemSwipe.length;i++){
      if(li_id == i){
        $('.active').removeClass('active');
        $(".slide"+i).addClass('active');
        $(".active-control").removeClass("active-control");
        $(this).addClass("active-control");
        initNumber=i+1;
      }
    }
  });

  $("#prev").on("click",function(){
    prevImage();
  });

  $("#next").on("click",function(){
    nextImage();
  });

  $( "#slider" )
    .on( "mouseenter", function() {
      pauseSlider();
    })
    .on( "mouseleave", function() {
      startSlider();
    });

    function sliderProduct(){
      var controlsImage="";
      for(var i =0;i<slideImage.length;i++){
        controlsImage = '<li class="image-control" id="item'+i+'">'+$(".img"+i).html()+'</li>';
         $("#controls-product").append(controlsImage);
      }
      $(".image-control:first").addClass("active-image");
    }

    $("#controls-product").on("click","li",function(){
        var li_id=$(this).attr("id");
        for(var i = 0;i<slideImage.length;i++){
          if(li_id == ('item'+i)){
            $('.main-img').removeClass('main-img');
            $(".img"+i).addClass('main-img');
            $(".active-image").removeClass("active-image");
            $(this).addClass("active-image");
          }
        }
      });

   function gallerySwipe() {
    var contentSwipe = $('#slider');

    contentSwipe.swipe({
      swipeLeft: function() {
        nextImage();
      },
      swipeRight: function() {
        prevImage();
      },
      threshold: 0,
      triggerOnTouchEnd: false
    });
  }

    createControls();
    startSlider();
    loadProducts();
    gallerySwipe();
};

/* #Canvas
 *-------------------------------------------------------
 * particles.js config
 */

particlesJS("circle", {
  "particles": {
    "number": {
      "value": 1000,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#83AF9B"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
      },
      "onclick": {
        "enable": false
      },
      "resize": false
    }
  },
  "retina_detect": true
});

/* #Skills
 *-------------------------------------------------------*/
$(function() {
  $('.chart').easyPieChart({
    scaleColor: "#ecf0f1",
    lineWidth: 20,
    lineCap: 'butt',
    barColor: '#FC9D9A',
    trackColor: "#ecf0f1",
    size: 160,
    animate: 500
  });
});