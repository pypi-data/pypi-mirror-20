$(window).on('pytsite.widget.init:pytsite.widget._input.Integer', function (e, widget) {
    var options = {
        allowMinus: false
    };

    if (widget.em.data('allowMinus'))
        options.allowMinus = true;

    widget.em.find('input[type=text],input[type=tel],input[type=number]').inputmask('integer', options);

    $(window).trigger('pytsite.widget.init:pytsite.widget._input.Text', [widget]);
});
