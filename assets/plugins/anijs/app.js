const Ani = {
    AniScreen: window.innerHeight,
    AniClass: $(".ani"),
    AniDelay: 0.15,
    AniDelayStart: 2000,

    AniWaveCreate: function () {
        const Wave = $(".wave");
        if (Wave.length < 1) return false;

        Wave.map((a, b) => {
            let _h = $(b).text().replace(/\s+/g, '').split("");

            _h = _h.map((v) => `<span>${v}</span>`).join("");

            $(b).html(_h);
        });
    },

    AniTypeCreate: function () {

    },



    Animation: function () {
        const CheckPos = (a, b, c) => {
            // return true if it inside screen
            return a >= b && a <= c;
        };
        let _a = 0, // time delay each other
            _b = window.pageYOffset, // scroll top page
            _c = _b + this.AniScreen; // scroll end page
        console.log(this.AniScreen, _b, _c);

        this.AniClass.map((ind, val) => {
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
                    _a += this.AniDelay;

                } else if (_.offset().top < _b) {
                    // add class if it is on top screen position
                    _.addClass("ani-pass animated");
                    //_.addClass("");
                }
            }
        });
    },

    init: function () {
        this.AniWaveCreate();
        $(window).on("load", () => {
            setTimeout(() => {
                this.Animation();
            }, this.AniDelayStart);
        });

        $(window).on("scroll", () => {
            this.Animation();
        });
    }
}

Ani.init();