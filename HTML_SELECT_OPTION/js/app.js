const Js_select = $(".js-select");
const Js_option = $(".options-item");

Js_select.on("click", function () {
    const _ = $(this);
    _.hasClass("open") ? _.removeClass("open") : _.addClass("open");
});

const SelectSetValue = (e, v) => {
    const _ = e.find(".select");
    _.attr("data-value", v);
    _.html(v);
    _.removeClass("open");
}

Js_option.on("click", function () {
    const _ = $(this);
    if (!_.hasClass("disabled")) {
        const OptionValue = _.attr("data-value");
        const OptionParent = _.parents(".select-group");
        SelectSetValue(OptionParent, OptionValue);
    }
});