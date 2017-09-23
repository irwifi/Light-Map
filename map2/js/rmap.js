let iframe_width2, iframe_height2, parent_width2, map_location2;

$(function() {
  iframe_width2 = $("#map2_hook").attr("data-width");
  parent_width2 = $("#map2_hook").parent().width();

  if(iframe_width2 > parent_width2) {
    iframe_width2 = parent_width2;
  }
  iframe_height2 = (iframe_width2 * 1) / 2.2;
  map_location2 = $("#map2_hook").attr("data-map_location");

  $("#map2_hook").after("<div id='rmap2_overlay'></div><div class='map2_wrapper'><iframe id='rmap2_iframe' src='" + map_location2 + "' frameborder='2' scrolling='no'></iframe> <div id='rmap2_popup'>Click here to enlarge the Map</div><div id='rmap2_close'>&#10006</div></div>");

  $("#rmap2_overlay").css({"display": "none", "position": "fixed", "top": "0", "left": "0", "width": "100vw", "height": "100vh", "background": "#000", "opacity": "0.85", "z-index": "999990", "overflow": "hidden"});
  $("#rmap2_close").css({"display": "none", "position": "fixed", "top": "10px", "right": "10px", "color": "#FFF", "font-famly": "", "font-size": "60px", "font-weight": "bold", "cursor": "pointer"});
  $(".map2_wrapper").css({"z-index": "999991"});
  $("#rmap2_iframe").css({"width": iframe_width2 + "px", "height": iframe_height2 + "px", "border": "2px solid #5e8ea9", "border-radius": "8px"});
  $("#rmap2_popup").css({"cursor": "pointer", "text-decoration": "underline", "text-align": "right", "margin-top": "4px", "font-size": "12px", "color": "#368"}).on("click", rmap2_popup);
  $("#rmap2_close").on("click", rmap2_unpop);
});

function rmap2_popup() {
  $("#rmap2_overlay").show();
  $("#rmap2_close").show();
  $("#rmap2_popup").hide();

  let iwidth = window.innerWidth * 0.9;
  let iheight = window.innerHeight * 0.9;
  let width_height = map2_full_size_aspect_ratio(iwidth, iheight);
  iwidth = (width_height[0] / window.innerWidth) * 100;
  iheight = (width_height[1] / window.innerHeight) * 100;

  $(".map2_wrapper").css({"position": "fixed", "top": "0", "left": "0", "width": "100vw"});
  $("#rmap2_iframe").css({"width": iwidth + "vw", "height": iheight + "vh", "margin": "0 auto", "margin-top": (100 - iheight) / 2 + "vh"});
}

function rmap2_unpop() {
  $("#rmap2_overlay").hide();
  $("#rmap2_close").hide();
  $("#rmap2_popup").show();
  $(".map2_wrapper").css({"position": "initial", "top": "initial", "left": "initial", "width": "100%"});
  $("#rmap2_iframe").css({"width": iframe_width2 + "px", "height": iframe_height2 + "px", "margin-top": "0"});
}

function map2_full_size_aspect_ratio(iwidth, iheight) {
  let dwidth = 2.2, dheight = 1;
  if(iheight >= (iwidth * dheight) / dwidth) {
    iheight = (iwidth * dheight) / dwidth;
  } else {
    iwidth = (iheight * dwidth) / dheight;
  }
  return [iwidth, iheight];
}