module.exports = {
    sleep: function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    },
    scrollToBottom: function (id) {
        var div = document.getElementById(id);
        div.scrollTop = div.scrollHeight - div.clientHeight +10;
    },
    scrollToTop: function (id) {
        var div = document.getElementById(id);
        div.scrollTop = 0;
    },
        //Require jQuery
    scrollSmoothToBottom: function (id) {
        var div = document.getElementById(id);
        $('#' + id).animate({
            scrollTop: div.scrollHeight - div.clientHeight
        }, 500);
    },
        //Require jQuery
    scrollSmoothToTop: function (id) {
        var div = document.getElementById(id);
        $('#' + id).animate({
            scrollTop: 0
        }, 500);
    },
};