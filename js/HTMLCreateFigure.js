/*
HTMLCreateFigure({
    className: "class chung của figure",
    moreClassName: "thêm class riêng nếu cần",
        img: {
            className: "class của thẻ img nếu cần",
            src: "link dẫn file img",
            alt: "alt",
            direction: "link thư mục",
        },
        figcaption: {
            className: "class figcaption nếu cần",
            title: "nội dung",
            span: "thêm span nếu cần"
        },
    span: "thêm span nếu cần"
    });
*/
const HTMLCreateFigure = (opts) => {
    let defaults = {
        className: "figure",
        moreClassName: "",
        img: {
            className: "figure__img",
            src: "",
            alt: "image",
            direction: "./",
        },
        figcaption: {
            className: "figure__caption",
            title: "this is figcaption title",
            span: ""
        },
        span: ""
    }
    defaults = {
        ...defaults,
        ...opts
    };
    console.log(defaults)

    const HTMLCreateImage = (e) => {
        let _a = e.className || 'figure__img',
            _b = e.src,
            _c = e.alt || "images",
            _d = e.direction || "./";
        return `<img class="${_a}" src="${_d + _b}" alt="${_c}"/>`;
    }

    const HTMLCreateFigcaption = (e) => {
        let _a = e.className || 'figure__caption',
            _b = e.title,
            _c = e.span || '';

        return `<figcaption class="${_a}">
            ${_b}
            ${_c}
        </figcaption>`;
    }

    let _className = defaults.className + " " + defaults.moreClassName,
        _img = defaults.img,
        _figcaption = defaults.figcaption,
        _span = defaults.span;

    return `
        <figure class="${_className}">
            ${HTMLCreateImage(_img)}
            ${HTMLCreateFigcaption(_figcaption)}
            ${_span}
        </figure>
    `;
}