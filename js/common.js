const navLink = () => {
    $(".nav-link").on("click", function () {
        if (!$(this).parent().find(".sub-menu")) return false;
        console.log("object");
        return false;
    });
};
