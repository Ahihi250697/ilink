/*
HTMLCreateFigure({
    className: "class chung thẻ p",
    moreClassName: "thêm class riêng nếu cần",
    text: "nội dung",
    span: "thêm span nếu cần"
});
*/
const HTMLCreateP = (opts) => {
    let defaults = {
        className: "p",
        moreClassName: "",
        text: "",
        span: ""
    }
    defaults = {
        ...defaults,
        ...opts
    };
    let _className = defaults.className + " " + defaults.moreClassName,
        _text = defaults.text,
        _span = defaults.span;

    return `
        <p class="${_className}">
            ${_text}
            ${_span}
        </p>
    `;
}