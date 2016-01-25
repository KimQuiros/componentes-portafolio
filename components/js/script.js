/* ==|====================
   JS/script
   -------INDEX--------
   #Slider
   #Canvas
   #Skills
   ======================= */

/* #Slider
 *-------------------------------------------------------*/
'use strict';
(function( $ ) {

  $.fn.slider = function( options ) {
    var defaults = {
      previous: "#slider-previous",
      next: "#slider-next",
      wrapper: "#slider-wrapper",
      slide: ".slide",
      images: ".slide-image",
      loader: "#slider-loader",
      loaderBar: "#slider-loader-bar",
      transitionSpeed: 500,
      transitionEasing: "linear",
      slideSpeed: 1000,
      slideEasing: "ease",
      afterLoad: function() {},
      afterSlide: function() {}
    };

    $.fn.slider.defaults = defaults;

    options = $.extend( $.fn.slider.defaults, options );

    var Slider = function( element ) {
      this.$slider = element;
      if( this.$slider.length ) {
        this.init();
      }
    };

    Slider.prototype = {
      init: function() {

        this.$wrapper = this.$slider.find( options.wrapper );
        this.$next = this.$slider.find( options.next );
        this.$previous = this.$slider.find( options.previous );
        this.$slides = this.$slider.find( options.slide );
        this.$images = this.$slider.find( options.images );
        this.$loader = this.$slider.find( options.loader );
        this.$loaderBar = this.$slider.find( options.loaderBar );

        this.currentSlide = 0;

        this.preload();
        this.actions();
      },
      next: function() {
        var self = this;
        self.currentSlide++;
        if( self.currentSlide == self.$slides.length ) {
          self.currentSlide = self.$slides.length - 1;
        }
        self.slideTo( self.currentSlide );
      },
      previous: function() {
        var self = this;
        self.currentSlide--;
        if( self.currentSlide == 0 ) {
          self.currentSlide = 0;
        }
        self.slideTo( self.currentSlide );  
      },
      actions: function() {
        var self = this;
        self.$previous.on( "click", function( e ) {
          e.preventDefault();
          self.previous();
        });
        self.$next.on( "click", function( e ) {
          e.preventDefault();
          self.next();
        });
        
      },
      preload: function() {
        var self = this;
        var totalImages = self.$images.length;

        this.setUp();

        self.$slider.imagesLoaded().
        always(function( instance ) {
          self.$loaderBar.fadeOut(function() {
            self.$loader.fadeOut(function() {
              self.$slides.transition({
                opacity: 1
              }, options.transitionSpeed, options.transitionEasing);
              self.$next.transition({
                opacity: 1
              }, options.transitionSpeed, options.transitionEasing);
              self.$previous.transition({
                opacity: 1
              }, options.transitionSpeed, options.transitionEasing);
              options.afterLoad();
            });
          });
        }).progress(function( instance, image ) {
          if( image.isLoaded ) {
            var $img = $( image.img );
            self._setSlideImage( $img );
            var countLoadedImages = self.$slider.find( ".loaded" ).length;
            var width = parseInt( 100 * ( countLoadedImages / totalImages ), 10 );
            self.$loaderBar.transition({
              width: width + "%"
            }, options.transitionSpeed, options.transitionEasing);
          }
        });
      },
      setUp: function() {
        var self = this;
        self.$slides.width( self.$slider.width() );
        self.$wrapper.width( self.$slider.width() * self.$slides.length );
      },
      _setSlideImage: function( img ) {
        var self = this;
        var $slide = img.parent();
        $slide.css( "background-image", "url(" + img.attr( "src" ) + ")" );
        img.addClass( "loaded" ).hide();
      },
      slideTo: function( n ) {
        var self = this;
        var $currentSlide = self.$slides.eq( n );
        var left = $currentSlide.position().left;

        self.$wrapper.transition({
          x: "-" + left
        }, options.slideSpeed, options.slideEasing);

        setTimeout(function() {
          options.afterSlide( $currentSlide );
        }, options.slideSpeed);
      }
    };

    $.fn.slider.slideTo = Slider.prototype.slideTo;
    $.fn.slider.next = Slider.prototype.next;
    $.fn.slider.previous = Slider.prototype.previous;


    return this.each(function() {
      var $element = $( this );
      if( !$element.data( "slider" ) ) {
        $element.data( "slider", new Slider( $element ) );
      }
    });
  };

  $(function() {
    $( "#slider" ).slider();
  });

})( jQuery );
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
    lineWidth: 5,
    lineCap: 'butt',
    barColor: '#FC9D9A',
    size: 130,
    animate: 500
  });
});