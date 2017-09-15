let iframe_width, iframe_height, parent_width, map_location;

$(function() {
  iframe_width = $("#map_hook").attr("data-width");
  parent_width = $("#map_hook").parent().width();

  if(iframe_width > parent_width) {
    iframe_width = parent_width;
  }
  iframe_height = (iframe_width * 9) / 16;
  map_location = $("#map_hook").attr("data-map_location");

  $("#map_hook").after("<div id='rmap_overlay'></div><div class='map_wrapper'><iframe id='rmap_iframe' src='" + map_location + "' frameborder='2' scrolling='no'></iframe> <div id='rmap_popup'>Click here to enlarge the Map</div><div id='rmap_close'>&#10006</div></div>");

  $("#rmap_overlay").css({"display": "none", "position": "fixed", "top": "0", "left": "0", "width": "100vw", "height": "100vh", "background": "#000", "opacity": "0.85", "z-index": "999990", "overflow": "hidden"});
  $("#rmap_close").css({"display": "none", "position": "fixed", "top": "10px", "right": "10px", "color": "#FFF", "font-famly": "", "font-size": "60px", "font-weight": "bold", "cursor": "pointer"});
  $(".map_wrapper").css({"z-index": "999991"});
  $("#rmap_iframe").css({"width": iframe_width + "px", "height": iframe_height + "px"});
  $("#rmap_popup").css({"cursor": "pointer", "text-decoration": "underline", "text-align": "right", "margin-top": "4px", "font-size": "12px", "color": "#368"}).on("click", rmap_popup);
  $("#rmap_close").on("click", rmap_unpop);
});

function rmap_popup() {
  $("#rmap_overlay").show();
  $("#rmap_close").show();
  $("#rmap_popup").hide();

  let iwidth = window.innerWidth * 0.9;
  let iheight = window.innerHeight * 0.9;
  let width_height = full_size_aspect_ratio(iwidth, iheight);
  iwidth = (width_height[0] / window.innerWidth) * 100;
  iheight = (width_height[1] / window.innerHeight) * 100;

  $(".map_wrapper").css({"position": "fixed", "top": "0", "left": "0", "width": "100vw"});
  $("#rmap_iframe").css({"width": iwidth + "vw", "height": iheight + "vh", "margin": "0 auto", "margin-top": (100 - iheight) / 2 + "vh"});
}

function rmap_unpop() {
  $("#rmap_overlay").hide();
  $("#rmap_close").hide();
  $("#rmap_popup").show();
  $(".map_wrapper").css({"position": "initial", "top": "initial", "left": "initial", "width": "100%"});
  $("#rmap_iframe").css({"width": iframe_width + "px", "height": iframe_height + "px", "margin-top": "0"});
}

function full_size_aspect_ratio(iwidth, iheight, dwidth = 16, dheight = 9) {
  if(iheight >= (iwidth * dheight) / dwidth) {
    iheight = (iwidth * dheight) / dwidth;
  } else {
    iwidth = (iheight * dwidth) / dheight;
  }
  return [iwidth, iheight]
}