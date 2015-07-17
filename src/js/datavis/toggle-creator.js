module.exports = function(container, buttonListener) {
    var $ = require('jquery');

    $(container).each(function() {
        //console.log($(this).text());
        var btn = $('<button class="' + buttonListener + ' mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" value="' + $(this).attr('value') + '">' + $(this).text() + '</button>');
        $(this).replaceWith(btn);
        if ($(this).attr('checked') === 'checked') btn.addClass('' + buttonListener + '-on');
    });

    $(document).on('click', '.' + buttonListener, function() {
        $('.' + buttonListener).removeClass('' + buttonListener + '-on');
        $(this).addClass('' + buttonListener + '-on');
    });
}