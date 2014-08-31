$(function() {
    $('.to_top').click(function() {
        $('body, html').animate({scrollTop: 0}, 1000, 'easeInOutQuint');
        return false;
    });
})