/**
 * HTMLCreateAnchor({
 *  className: "class chung",
    title: "nội dung",
    direction: "dẫn thư mục",
    href: "điều hướng",
    target: "mở trang",
    moreClassName: "thêm class riêng",
    download: true || false,
    rel: thêm data-bla nếu cần,
    span: "thêm span nếu cần"

    rel: [
        {link: "link-title"},
        {link2: "title2"}
    ]
    ==> data-link="link-title" data-link2="title2"
 });
 */

const HTMLCreateAnchor = (opts) => {
    let defaults = {
        className: "link",
        title: "default title",
        direction: "./",
        href: "#",
        target: "_self",
        moreClassName: "",
        download: false,
        rel: false,
        span: "<span>this is span</span>"
    }
    defaults = {
        ...defaults,
        ...opts
    };

    let _title = defaults.title,
        _href = defaults.href !== "#" ? `${defaults.direction + defaults.href}` : "#",
        _className = defaults.className,
        _moreClassName = defaults.moreClassName,
        _target = defaults.target ? `target="${defaults.target}"` : '',
        _download = defaults.download ? `download` : '',
        _span = defaults.span,
        _rel = '';

    if (defaults.rel) {
        defaults.rel.map(a => {
            let _dataID = Object.keys(a),
                _dataName = a[_dataID];
            _rel += `data-${_dataID}="${_dataName}"`;
        });
    }

    return `<a href="${_href}" class="${_className} ${_moreClassName}" ${_target} ${_download} ${_rel}>
        ${_title}
        ${_span}
    </a>`;
}