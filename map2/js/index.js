$(function() {
  w3.includeHTML(() => {
    load_map();
    // load_data();
    load_events();
  });
});

function load_map() {
  $("svg").css({"width": $(".map_image").css("width"), "height": $(".map_image").css("height")});
  $(".map_wrapper").css("margin-top", ($(".sidebar").height() - $(".map_wrapper").height()) / 2 +  "px");
}

function load_events() {
  $("path").on("click", function(e) {
    info_popup(e, $(this));
  });

  $(window).resize(function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function() {
        $("svg").css({"width": $(".map_image").css("width"), "height": $(".map_image").css("height")});
    }, 250);
  });
}

function info_popup(e, element) {
  let x, y, ww, wh, iw, ih;
  ww = $(window).width();
  wh = $(window).height();
  iw =  ww * 0.28;
  ih = wh * 0.4;
  x = e.pageX+20;
  y = e.pageY- 30;
  if(ww - x< iw) {
      x = ww - iw;
  }

  if(wh - y < ih) {
      y = wh - ih;
  }

  $(".info_box").css({"left": x + "px", "top": y + "px"}).toggle();
}

function load_data() {
  var data_array = [
    ];

  $.each(data_array, function( index, value ) {
    $(".map .area" + index).attr({});
  });
}