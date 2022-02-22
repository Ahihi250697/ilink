;
const AniJs = (function () {
    const Window_height = $(window).innerHeight();
    const Ani_items = $(".ani");

    let _defaults = {
        delay: 150,
        delayStart: 0,
    };

    // ani wave
    const instance_create_wave = function () {
        const Target = $(".wave");
        if (Target.length < 1) return false;

        $.each(Target, function (ind, val) {
            const _ = $(val);
            let _text = _.text().replace(/\s+/g, '').split(""),
                _replace = "";
            _text = _text.forEach(function (lett) {
                _replace += '<span>' + lett + '</span>'
            });

            _.html(_replace);
        });
    };

    // ani type
    const instance_create_img_slide = function () {
        const Target = $(".img_slide");
        if (Target.length < 1) return false;

        $.each(Target, function (ind, val) {
            const _ = $(val);
            _.html(`<div class="item_inside">${_.html()}</div>`);
        });
    };

    const instance_create_linebar = function () {
        const Target = $(".linebar");
        if (Target.length < 1) return false;

        $.each(Target, function (ind, val) {
            const _ = $(val);
            let _html = '<span class="item_inside">' + _.text().trim() + '</span>';
            _.html(_html);
        });
    }

    // animation
    const animation = function () {

        let _set_time = 0, // time delay each other
            _page_y = window.pageYOffset, // scroll top page
            _y_target = _page_y + Window_height; // scroll end page

        $.each(Ani_items, function (ind, val) {
            const _ = $(val);

            if (!_.hasClass("ani-pass")) {
                let
                    _top = _.offset().top,
                    _data_delay = _.attr("data-ani-delay");

                isNaN(_data_delay) ? _data_delay = 0 : _data_delay = +_data_delay;

                if (_top >= _page_y && _top <= _y_target) {
                    // add class to check it is ready to show
                    _.addClass("ani-pass");
                    // set time out to add class animated
                    let _time = _data_delay || _set_time;
                    console.log(_time)
                    if (_.attr('data-ani-delay')) {
                        _time = +_.attr('data-ani-delay');
                    } else {
                        _set_time += _defaults.delay;
                    }

                    let _set = setTimeout(function () {
                        _.addClass("animated");
                    }, _time);

                } else if (_.offset().top < _page_y) {
                    // add class if it is on top screen position
                    _.addClass("ani-pass animated");
                }
            }
        });
    };

    const Init = function (opts) {
        _defaults = {
            ..._defaults,
            ...opts
        };
        //create wave
        // instance_create_wave();
        //linebar
        // instance_create_linebar();
        //create img slide
        //instance_create_img_slide();

        // console.log(_defaults, opts);
        $(window).on("load", function () {
            setTimeout(function () {
                animation();
            }, _defaults.delayStart);
        });

        $(window).on("scroll", function () {
            animation();
        });
    };

    return {
        init: function (opts) {
            Init(opts);
        }
    };

})();