document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '#splide-demo', {
        perPage: 5,
        rewind : true,
        perMove: 1,
        type: "loop",
        wheel    : true,
        autoplay: true,
        breakpoints:{
            1320:{
                perPage: 4,
            },
            1058:{
                perPage: 3,
            },
            796:{
                perPage: 2,
            },
            534:{
                perPage: 1,
            },
        }
      } );
    splide.mount();
    // mount này được xem là render để hiện thị
  } );