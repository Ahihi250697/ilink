const WINDOW_HEIGHT = window.innerHeight;
const ANI = $(".ani");
const TIMEDELAY = 0.15;

const ANI_ANIMATED = () => {
    const CheckPos = (a, b, c) => {
        let _top = a.offset().top;
        // return true if it inside screen
        return _top >= b && _top <= c;
    };

    let _delay = 0,
        _pageY = window.pageYOffset,
        _pageScreen = _pageY + WINDOW_HEIGHT * 0.95;

    ANI.map((ind, val) => {
        let _ = $(val);
        if (!_.hasClass("ani-pass")) {
            let _check = CheckPos(_, _pageY, _pageScreen);

            if (_check) {
                // add class to check it is ready to show
                _.addClass("ani-pass");
                // set time out to add class animated
                let _set = setTimeout(() => {
                    _.addClass("animated");
                }, _delay * 1000);
                _delay += TIMEDELAY;
            } else if (_.offset().top < _pageY) {
                // add class if it is on top screen position
                _.addClass("ani-pass animated");
                //_.addClass("");
            }
        }
    });
};

let _scroll = true;
$(window).on("load scroll", function () {
    if (_scroll) {
        ANI_ANIMATED();
        _scroll = false;
        setTimeout(function () {
            _scroll = true;
        }, 100);
    }
});
