Zepto(function() {
  function slideTo(to){
    var from = $(window).scrollTop(),
        dy = to - from, // change in scroll position - deltaY
        body = $("body");

    // Use margin-top to move the the page so it feels like we're at the *from* scroll position
    body.css("margin-top", dy+"px");
    $(window).scrollTop(to);

    // CSS transition margin-top
    body.css("transition","margin-top 1s ease-in-out");
    body.css("margin-top", 0);

    // Reset transition
    body.on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(){
      $("body").css("transition", "none");
    });
  }

  $('div.container').on('click', '.to_top', function() {
    slideTo(0);
    return false;
  });
});