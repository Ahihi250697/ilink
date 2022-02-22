;
(function () {
    const create_button = (o) => {
        return `<button class="btn btn--${o}">
            <span class="btn__content">
                this is button
            </span>
        </button>`
    }

    const fetch_button = () => {
        let _html = '';

        for (let _i = 0; _i < 15; _i++) {
            _i < 10 ? _i = '0' + _i : _i;
            _html += create_button(_i);
        }

        $('#root').html(_html);
    }

    fetch_button();

    const button10 = $(".btn--10");
    button10.append(`<span class="btn__decore js-btn--10"></span>`);

    button10
        .on("mouseenter", function (e) {
            const _ = $(this);

            let
                _mx = e.pageX,
                _my = e.pageY,
                _x = _.offset().left,
                _y = _.offset().top;

            _.find(".js-btn--10").css({
                top: `${_my - _y}px`,
                left: `${_mx - _x}px`
            });
        });

    const button11 = $(".btn--11");
    button11.append(`<span class="btn__decore js-btn--10"></span>`);

    button11
        .on("mouseenter", function (e) {
            const _ = $(this);

            let
                _mx = e.pageX,
                _my = e.pageY,
                _x = _.offset().left,
                _y = _.offset().top;

            _.find(".js-btn--10").css({
                top: `${_my - _y}px`,
                left: `${_mx - _x}px`
            });
        })
        .on("mousemove", function (e) {
            const _ = $(this);

            let
                _mx = e.pageX,
                _my = e.pageY,
                _x = _.offset().left,
                _y = _.offset().top;

            _.find(".js-btn--10").css({
                top: `${_my - _y}px`,
                left: `${_mx - _x}px`
            });
        });
})();