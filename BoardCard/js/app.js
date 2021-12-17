/* system */

let TotalCoin = 1000,
    SetCoin = 10,
    TotalTurn = 5;

const PrtTotalCoin = $(".total-coin"),
    PrtSetCoin = $(".set-coin");

const Card = [];
let CardClone = [];

let CardPlayer = [],
    CardComp = [];

const RandomCard = () => {
    let _len = CardClone.length;
    let _id = Math.floor(Math.random() * (_len - 1));
    let _card = CardClone[_id];
    let a = CardClone.splice(_id, 1);
    return _card;
}

const LocalStorage = (tr, name, val) => {
    if (tr === "set") {
        localStorage.setItem(name, val);
        return true;
    }
    return localStorage.getItem(name);
}

// create card
const CreateCard = (e, w) => {
    let _name = e.name,
        _type = e.type,
        _class = "";

    switch (_type) {
        case "1": {
            _class = "hearts";
            break;
        }
        case "2": {
            _class = "diamonds";
            break;
        }
        case "3": {
            _class = "clubs";
            break;
        }
        case "4": {
            _class = "spades";
            break;
        }
    }
    _name === '1' ? _name = 'A' : _name === '11' ? _name = 'J' : _name === '12' ? _name = 'Q' : _name === '13' ? _name = 'K' : _name;
    let _card = `<span class="card__item ${_class}" data-content="${_name}" data-card="${e.name+_type}"></span>`;

    if (w === "player") {
        CardPlayer.push(e);
        $(".card").append(_card);
    } else {
        CardComp.push(e);
        $(".comp-card").append(_card);
    }
}

// print notice
let _notiCounter = 0;
const PrintNoti = (a) => {
    _notiCounter++;
    let _id = `noti${_notiCounter}`;
    const _noti = `<span class="noti ${a}" id="${_id}"></span>`;
    $("body").append(_noti);
    let _rm = setTimeout(function () {
        $(`#${_id}`).remove();
        _notiCounter--;
    }, 1200);
}

const PrintHTML = (a, b) => {
    a.html(b);
}

const Draw = (w) => {
    let _rd = RandomCard();
    CreateCard(_rd, w);
}

// đặt tiền
const Coins = $(".coin");
Coins.on("click", function () {
    if (LocalStorage("get", "set-coin", "true") === "false" ||
        LocalStorage("get", "set-is-playing", "false") === "false") {
        PrintNoti("not-time");
        return false;
    }
    const CoinValue = $(this).attr("data-coin");
    if (CoinValue === "all-in") {
        SetCoin += TotalCoin;
        TotalCoin = 0;
    } else {
        if (TotalCoin - +CoinValue >= 0) {
            SetCoin += +CoinValue;
            TotalCoin -= +CoinValue;
        } else {
            PrintNoti("not-enought");
        }
    }
    PrintHTML(PrtTotalCoin, TotalCoin);
    PrintHTML(PrtSetCoin, SetCoin);
});

// check bài
const CardCheck = (e) => {
    const _list = [...e];
    let _pointCard = 0;

    const HighCard = () => {
        let _return = _list[0];
        _list.map((a) => {
            if (+a.name > +_return.name) {
                _return = a;
            }
        });

        return _return;
    }

    const PointCard = () => {
        let _return = 0;
        _list.map((a) => {
            if (+a.name > 10) _return += 10
            else _return += +a.name;
        });
        return _return % 10;
    }

    const ThreeOfFairy = () => {
        for (let _i = 0; _i < _list.length; _i++) {
            if (_list[_i].name <= 10) return 0;
        }

        return 1000;
    }

    const Straight = () => {
        let _straightPoint = 0;

        let _a = _list.sort((a, b) => {
            if (+a.name < +b.name) {
                return -1;
            }
            if (+a.name < +b.name) {
                return 1;
            }
            return 0;
        });

        // return true if it is straight and not
        const CheckOrder = (or) => {

            for (let _i = 0; _i < or.length - 1; _i++) {
                for (let _j = _i + 1; _j < or.length; _j++) {
                    if (+or[_i].name + 1 !== +or[_j].name) return false;
                    else break;
                }
            }
            return true;
        }

        // filter with A card
        if (_a.filter(a => a.name === '1').length !== 0) {

            let _x = 0;
            for (let _i = 0; _i < _a.length; _i++) {
                _x += +_a[_i].name;
            }
            if (_x === 26) {
                return 1500;
            } else {
                let xx = CheckOrder(_a);
                if (xx) return 1000;
                else return 0;
            }
        }

        let xx = CheckOrder(_a);
        if (xx) {
            _straightPoint = 1000;
        } else _straightPoint = 0;
        return _straightPoint;
    }

    const ThreeOfKing = () => {
        let _return = true,
            _c = _list[0];

        for (let _j = 1; _j < _list.length; _j++) {
            if (_list[_j].name != _c.name) return 0;
        }
        let _point = (_c.name === '1') ? 100000 : +_c.name + 10000;
        return _point;
    }

    const CheckCardPoint = () => {
        let _h = HighCard();
        // 3 cao
        let _p0 = ThreeOfKing();
        if (_p0 !== 0) {
            return _p0 + +_h.name;
        }

        // sanh
        let _p1 = Straight();
        if (_p1 !== 0) {
            return _p1 + +_h.name;
        }

        // 3 tien
        let _p2 = ThreeOfFairy();
        if (_p2 !== 0) {
            return _p2 + +_h.name;
        }

        // Point
        let _p3 = PointCard();
        return _p3;
    }

    return CheckCardPoint();
}

// chơi tiếp
const Replay = $(".replay");
Replay.on("click", function () {
    if (LocalStorage("get", "set-is-playing", "") === "true") {
        return false;
    }
    BoardCard.GameReset();
});

// bỏ
const Del = $(".del");
Del.on("click", function () {
    SetCoin = 10;

    PrintHTML(PrtSetCoin, SetCoin);

    BoardCard.GameReset();
});
// game
let Timeout;
const BoardCard = {
    CardList: '1 2 3 4 5 6 7 8 9 10 11 12 13'.split(" "),
    CardType: '1 2 3 4'.split(" "),
    Time: $(".timer"),
    TimeCounter: 5,
    TimeStep: 500,

    // let set coin
    LetSetCoin: $(".let-set-coin"),

    // card init
    CardInit: function () {
        this.CardList.map((a) => {
            this.CardType.map((b) => {
                let _card = {
                    name: a,
                    type: b
                }
                Card.push(_card);
            });
        });
        CardClone = [...Card];
    },

    CountDown: function (e) {
        let _e = e - 1;
        this.Time.html(e);

        // end game
        if (TotalTurn <= 0) {
            console.info("---------tong ket------------");
            LocalStorage("set", "set-is-playing", "false");

            let _compPoint = CardCheck(CardComp);
            console.log("comp point", _compPoint);
            let _playerPoint = CardCheck(CardPlayer);
            console.log("player point", _playerPoint);
            // win
            if (_playerPoint > _compPoint) {
                TotalCoin += 1.95 * SetCoin;
                console.info("player win");
                $(".comp-card").addClass("lose");
            } else if (_playerPoint === _compPoint) {
                TotalCoin += 0.95 * SetCoin;
                console.info("--hoa--");
            } else {
                console.info("comp win");
                $(".card").addClass("lose");
            }

            // lose
            SetCoin = 0;
            PrintHTML(PrtTotalCoin, TotalCoin);
            PrintHTML(PrtSetCoin, SetCoin);
            return false;
        }

        if (e >= 0) {
            Timeout = setTimeout(() => {
                this.CountDown(_e);
            }, this.TimeStep);
        } else {
            TotalTurn--;

            if (LocalStorage("get", "set-coin", -1) === "false") {
                this.LetSetCoin.removeClass("none");

                LocalStorage("set", "set-coin", "true");
                this.CountDown(this.TimeCounter);
            } else {
                this.LetSetCoin.addClass("none");

                Draw("comp");

                Draw("player");

                LocalStorage("set", "set-coin", "false");
                this.CountDown(2);
            }
        }
    },
    // start
    GameStart: function () {
        console.warn("--- start game ---");
        TotalTurn = 5;
        SetCoin = 10;
        TotalCoin -= SetCoin;
        PrintHTML(PrtTotalCoin, TotalCoin);
        PrintHTML(PrtSetCoin, SetCoin);

        LocalStorage("set", "set-coin", "true");
        this.CountDown(this.TimeCounter);
    },

    // reset
    GameReset: function () {
        if (TotalCoin < 10) {
            PrintNoti("not-enought");
            return false;
        }
        LocalStorage("set", "set-is-playing", "true");
        CardSlot = 0;
        // cards

        CardClone = [...Card];
        // card
        $(".card").removeClass("lose");
        $(".card").find(".card__item").remove();
        $(".comp-card").removeClass("lose");
        $(".comp-card").find(".card__item").remove();

        // coins
        // SetCoin = 0;
        // PrintHTML(PrtTotalCoin, TotalCoin);
        //PrintHTML(PrtSetCoin, SetCoin);
        this.LetSetCoin.removeClass("none");
        // card slot
        CardPlayer.length = 0;
        CardComp.length = 0;
        clearTimeout(Timeout);
        // restart
        this.GameStart();
    },

    // init
    Init: function () {
        LocalStorage("set", "set-is-playing", "true");
        this.CardInit();
        // print total coin
        PrintHTML(PrtTotalCoin, TotalCoin);
        // print set coin
        PrintHTML(PrtSetCoin, SetCoin);
        // init
        this.GameStart();
    }
};

BoardCard.Init();