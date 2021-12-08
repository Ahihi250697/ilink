const Header = (opt) => {
    let _options = opt,
        _dir = _options.direction,
        _act = _options.active || "";

    const NavLogo = () => {
        return `<h1 class="nav-logo">
                    <a href="${_dir}">
                        LOGO
                    </a>
                </h1>
        `;
    };

    const NavToggle = () => {
        return `<button class="nav-toggle">
                    <span></span><span></span>
                </button>`;
    };

    const NavSubContent = (e) => {
        if (e === -1) {
            return ''
        }

        const NavSubMenu = [
            [{
                    title: "Creative div.",
                    href: "member",
                },
                {
                    title: "Produce div.",
                    href: "member",
                },
            ]
        ];
        e = +e;
        let _navSubMenu = '';
        NavSubMenu[e].map((a, b) => {
            let _t = a.title,
                _h = a.href;
            _navSubMenu += `<li class="nav-item">
                    <a href="${_dir+_h}" class="nav-link">${_t}</a>
                </li>`;
        })

        return `<ul class="sub-menu">${_navSubMenu}</ul>`
    }

    const Navbar = () => {
        const NavMenu = [{
                title: "Brand Characteristic",
                href: "brand",
                subContent: -1,
            },
            {
                title: "Service",
                href: "services",
                subContent: -1,
            },
            {
                title: "Works",
                href: "works",
                subContent: -1,
            },
            {
                title: "Members",
                href: "members",
                subContent: 0,
            },
            {
                title: "Contact",
                href: "contact",
                subContent: -1,
            },
        ];

        let _navbar = "";
        NavMenu.map((a, b) => {
            let _t = a.title,
                _h = a.href !== '#' ? _dir + a.href : '#',
                _a = a.title === _act ? "active" : "",
                _sub = a.subContent;
            _navbar += `
            <li class="nav-item ${_a}">
                <a href="${_h}" class="nav-link">${_t}</a>
                ${NavSubContent(_sub)}
            </li>`;
        });

        return `<div class="navbar"><ul class="nav-menu">${_navbar}</ul></div>`;
    };

    const Nav = `
        <nav class="nav">
            <div class="container nav-container">
                ${NavLogo()}
                ${Navbar()}
                ${NavToggle()}
            </div>
        </nav>
    `;

    const HeaderInit = (e) => {
        const header = document.getElementById("header");
        header.innerHTML = e;
        console.log("header init");
    };
    HeaderInit(Nav);
};