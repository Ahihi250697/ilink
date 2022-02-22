const Ani = (function (opts) {
    const WindowHeight = $(window).innerHeight();
    const AniClass = $(".ani");

    const CreateWave = () => {
        const Wave = $(".wave");
        if (Wave.length < 1) return false;

        Wave.map((a, b) => {
            let _h = $(b).text().trim().split ``;
            _h = _h.map((v) => `<span>${v}</span>`).join("");

            $(b).html(_h);
        });
    }

    const CreateType = () => {
        const AniType = $(".type");
        if (AniType.length < 1) return false;

        AniType.map((a, b) => {
            let _target = $(b).find(".target");
            let _d = -_defaults.timeDelay;
            let _h = _target.text().trim().split ``;
            _h = _h.map((v) => {
                _d += _defaults.timeDelay;
                return `<span>${v}</span>`;
            }).join("");

            _target.html(_h);
            _target.css({
                'transition-duration': _d + 's'
            })
        });
    };

    // animation
    const Animation = function (opt) {

        let _time = 0, // time delay each other
            _b = window.pageYOffset, // scroll top page
            _c = _b + WindowHeight; // scroll end page

        $.each(AniClass, function (a, b) {
            let _ = $(b);

            if (!_.hasClass("ani-passed")) {
                let _top = _.offset().top;

                if (_top >= _b && _top <= _c) {
                    // add class to check it is ready to show
                    _.addClass("ani-passed");

                    // set time out to add class animated
                    let _set = setTimeout(function () {
                        _.addClass("animated");
                    }, _time);
                    _time += opt.timeDelay;

                } else if (_.offset().top < _b) {
                    // add class if it is on top screen position
                    _.addClass("ani-passed animated");
                }
            }
        });
    };

    return {
        init(opts = {}) {
            // CreateWave(_opts);
            // CreateType(_opts);
            let _defaults = {
                timeDelay: 150,
                startAfter: 1000
            }
            _defaults = {
                ..._defaults,
                ...opts
            };

            $(window).on("load", function () {
                setTimeout(function () {
                    Animation(_defaults);
                }, _defaults.startAfter);
            });
            $(window).on("scroll", function () {
                setTimeout(function () {
                    Animation(_defaults);
                }, 50);
            });
        }
    }
})();

Ani.init(

);