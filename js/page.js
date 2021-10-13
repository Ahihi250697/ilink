const getHeader = () => {
    const nav = `
        <nav class="nav animated">
            <div class="container">
                <h1 class="nav-logo">
                    <a href="">
                        LOGO
                    </a>
                </h1>

                <div class="navbar">
                    <ul class="nav-menu">
                        ${menuItem()}
                    </ul>
                </div>

                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    `;
    writeHtml(nav);
};

const menuItem = () => {
    const menuData = [
        { title: "home", sub: 0, href: "./" },
        {
            title: "about",
            sub: [
                { title: "about 01", href: "./about01" },
                { title: "about 02", href: "./about02" },
                { title: "about 03", href: "./about03" },
                { title: "about 04", href: "./about04" },
            ],
            href: "#",
        },
        {
            title: "contact",
            sub: [
                { title: "contact 01", href: "./contact01" },
                { title: "contact 02", href: "./contact02" },
            ],
            href: "#",
        },
        { title: "more", sub: 0, href: "./more" },
    ];

    let _return = "";
    menuData.map((a) => {
        _return += `
        <li class="nav-item">
            <a href="${a.href}" class="nav-link">${a.title}</a>
            ${a.sub != 0 ? menuDrop(a.sub) : " "}
        </li>`;
    });
    return _return;
};

const menuDrop = (e) => {
    _return = `<ul class="sub-menu">`;
    e.map(
        (a) =>
            (_return += ` <li class="nav-item">
                <a href="${a.href}" class="nav-link">${a.title}</a></li>`)
    );
    _return += `</ul>`;
    return _return;
};

const writeHtml = (e) => {
    document.write(e);

    const navLink = () => {
        $(".nav-link").on("click", function () {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).parent().find(".sub-menu").slideUp(300);
            } else {
                $(this).addClass("open");
                $(this).parent().find(".sub-menu").slideDown(300);
            }
            if (!$(this).parent().find(".sub-menu")) return false;
        });
    };
    navLink();
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
};
