const Ani = {
    windowScreen: window.innerHeight * 0.95,
    target: $(".ani"),
    timeDelay: 0.15,
    startDelay: 2000,

    aniWave: function () {
        const AniWave = $(".ani.wave");
        if (AniWave.length < 1) return;
        AniWave.map((a, b) => {
            let _html = $(b).text().replace(/\s+/g, '').split("");

            _html = _html.map((val, ind) =>
                `<span style="transition-delay:${ind*0.05}s">${val}</span>`
            ).join("");

            $(b).html(_html);
        });
    },

    aniAnimate: function () {
        const CheckPos = (a, b, c) => {
            // return true if it inside screen
            return a >= b && a <= c;
        };
        let _a = 0, // time delay each other
            _b = window.pageYOffset, // scroll top page
            _c = _b + this.windowScreen; // scroll end page

        this.target.map((ind, val) => {
            let _ = $(val);
            if (!_.hasClass("ani-pass")) {
                let _check = CheckPos(_.offset().top, _b, _c);

                if (_check) {
                    // add class to check it is ready to show
                    _.addClass("ani-pass");
                    // set time out to add class animated
                    let _set = setTimeout(() => {
                        _.addClass("animated");
                    }, _a * 1000);
                    _a += this.timeDelay;

                } else if (_.offset().top < _b) {
                    // add class if it is on top screen position
                    _.addClass("ani-pass animated");
                    //_.addClass("");
                }
            }
        });
    },

    aniScroll: function () {
        $(window).on("load scroll", () => {
            if (this.startDelay === 0) {
                this.aniAnimate();
                this.startDelay = 100;
            } else {
                setTimeout(() => {
                    this.startDelay = 0;
                }, );
            }

        });
    },

    init: function () {
        this.aniWave();
        this.aniScroll();
    }
}

Ani.init();