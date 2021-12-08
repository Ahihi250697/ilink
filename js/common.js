const navLink = () => {
    $(".nav-link").on("click", function () {
        if (!$(this).parent().find(".sub-menu")) return false;
        console.log("object");
        return false;
    });
};

// const navLink = () => {
//     $(".nav-link").on("click", function () {
//         if ($(this).hasClass("open")) {
//             $(this).removeClass("open");
//             $(this).parent().find(".sub-menu").slideUp(300);
//         } else {
//             $(this).addClass("open");
//             $(this).parent().find(".sub-menu").slideDown(300);
//         }
//         if (!$(this).parent().find(".sub-menu")) return false;
//     });
// };
// navLink();
const navToggle = () => {
    const navbar = $(".navbar");
    $(".nav-toggle").on("click", function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            navbar.removeClass("open");
        } else {
            $(this).addClass("open");
            navbar.addClass("open");
        }
    });
};
navToggle();
