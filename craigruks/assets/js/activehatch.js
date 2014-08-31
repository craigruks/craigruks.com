$(function() {
    var aH        = $('.activehatch');
    var closeAh   = $('.close_ah');
    var closeTxt  = closeAh.find('.close');
    var inTransit = false;

    closeAh.click(function() {
        if (true == inTransit) {
            return;
        }
        inTransit = true;

        aH.stop(true).slideToggle(1000, 'easeInOutQuint', function() {
            closeTxt.stop(true).fadeToggle(300, function() {
                if (aH.is(':hidden')) {
                    closeTxt.html('aH');
                } else {
                    closeTxt.text('CLOSE');
                }
                closeTxt.fadeToggle(400, function() {
                    inTransit = false;
                });
            })
        });
    })
})