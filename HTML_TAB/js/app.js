const TabItem = $(".tab__item");
const TabName = $(".tab__name");
const TabPrev = $(".tab-prev");
const TabNext = $(".tab-next");

const TabItemActive = (ind) => {
    TabName.removeClass("open");
    TabName.eq(ind).addClass("open");
    TabItem.removeClass("open");
    TabItem.eq(ind).addClass("open");
};

const TabButtonActive = (ind) => {

    ind === 0 ? (
            TabPrev.addClass("none"),
            TabNext.removeClass("none")
        ) :
        ind === TabItem.length - 1 ? (
            TabNext.addClass("none"),
            TabPrev.removeClass("none")
        ) :
        $(".tab-button").removeClass("none");

}

const TabInit = () => {
    TabItemActive(0);
    TabButtonActive(0);
}

TabInit();
TabName.on("click", function () {
    TabName.removeClass("active");
    $(this).addClass("active");

    const TabValue = +$(this).attr("data-tab");

    TabItemActive(TabValue);
    TabButtonActive(TabValue);
});

$(".tab-button").on("click", function () {
    const ButtonData = $(this).attr("data-next");
    const TabItem = $(".tab__item");
    const TabActiveId = $(".tab__content").find(".open").index();

    let _index = TabActiveId + +ButtonData;

    _index >= TabItem.length - 1 ? _index = TabItem.length - 1 : _index <= 0 ? _index = 0 : _index;
    TabButtonActive(_index);
    TabItemActive(_index);
});