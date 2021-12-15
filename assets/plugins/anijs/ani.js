const Window_height = window.innerHeight;
const Ani = $(".ani");
const Time_delay = 0.15;

const AniInit = () => {
    const AniWave = $(".ani.wave");
    if (AniWave.length < 1) return;
    AniWave.map((a, b) => {
        let _html = $(b).text().replace(/\s+/g, '').split("");
        _html = _html.map((val, ind) =>
            `<span style="transition-delay:${ind*0.02}s">${val}</span>`
        ).join("");
        $(b).html(_html);
    });
}
AniInit();

const AniAnimated = () => {
    const CheckPos = (a, b, c) => {
        let _top = a.offset().top;
        // return true if it inside screen
        return _top >= b && _top <= c;
    };

    let _delay = 0,
        _pageY = window.pageYOffset,
        _pageScreen = _pageY + Window_height * 0.95;

    Ani.map((ind, val) => {
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
                _delay += Time_delay;
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
        AniAnimated();
        _scroll = false;
        setTimeout(function () {
            _scroll = true;
        }, 100);
    }
});