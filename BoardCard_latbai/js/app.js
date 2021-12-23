const Paper = $(".paper");
// Paper.on("mousedown", function (e) {
//     _startY = e.clientY;
//     console.log("start y", _startY);
// }).on("mouseup", function (e) {
//     e.preventDefault();
//     let _endY = e.clientY,
//         _scroll = window.pageYOffset + _startY - _endY;

//     _scroll <= 0 ? _scroll = 0 : _scroll;

//     $("html, body").animate({
//             scrollTop: _scroll,
//         },
//         160
//     );
//     return false;
// });

const Game = {
    GameArray: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 a b c d e f g h i j k l m n o p q r s t u v x y z A B C D E F G H I J K L M N O P Q R S T U V X Y Z AA BB CC DD EE FF GG HH II JJ KK LL MM NN OO PP QQ RR TT UU VV XX YY ZZ'.split(" "),
    GameScreen: $("#game-screen"),
    CanChooseMode: true,
    GameMode: -1,
    GameDefault: [4, 10, 30, 60, 40],
    CanChooseSlot: true,
    CounterOpen: 0,
    CounterTrue: 0,
    CounterClick: 0,
    IsOpenID: [],
    Slots: [],
    SlotsItem: null,
    Level: 1,

    Paper: $(".paper"),
    HTMLLevel: $(".current-level"),
    HTMLClickCounter: $(".click-counter"),

    SlotItemClick: function () {
        this.SlotsItem.on("click", (e) => {
            const _ = $(e.target);

            if (this.CanChooseSlot && !_.hasClass("active")) {
                let _ind = _.index();
                _.addClass("active");
                this.CheckClick(_ind);
            } else {
                console.log("none click")
            }
        });
    },

    GameCreateSlots: function (arr) {
        let _a = arr.map((a) => {
            return `<span class="paper__item"></span>`
        }).join("");

        this.Paper.html(_a);
        this.SlotsItem = $(".paper__item");
        this.SlotItemClick();
        console.log("--- create slot ---");
    },

    GameSlotsPush: function (e) {
        let _item = {
            value: this.GameArray[e],
            active: false
        }
        this.Slots.push(_item);
        this.Slots.push(_item);
    },

    GameSlotsShuffle: function () {
        this.Slots.sort(() => Math.random() - 0.5);
    },

    GameCreateArraySlot: function () {
        let _max = this.Level;
        switch (this.GameMode) {
            case 0: {
                console.log("---easy---");
                _max = this.GameDefault[0];
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }

            case 1: {
                console.log("--- medium ---");
                _max = this.GameDefault[1];
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }

            case 2: {
                console.log("--- hard ---");
                _max = this.GameDefault[2];
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }
            case 3: {
                console.log("--- super hard ---");
                _max = this.GameDefault[3];
                for (let _i = 0; _i < _max; _i++) {
                    this.GameSlotsPush(_i);
                }
                break;
            }
            case 4: {
                console.log("--- hell ---");
                _max = this.GameDefault[4];
                for (let _i = 0; _i < _max; _i++) {
                    this.GameSlotsPush(_i);
                }
                break;
            }

            default: {
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }
        }
        this.CounterTrue = _max;
        // for (let _i = 0; _i < _max; _i++) {
        //     let _rd = Math.floor(Math.random() * this.GameArray.length);
        //     this.Slots.push(this.GameArray[_rd]);
        //     this.Slots.push(this.GameArray[_rd]);
        // }

        this.GameSlotsShuffle();
        this.GameCreateSlots(this.Slots);
        console.log("--- create array slot---");
    },

    GameCreateMode: function () {
        console.log("game mode", this.GameMode);

    },

    CheckOpen: function () {
        let _a1 = this.Slots[this.IsOpenID[0]],
            _a2 = this.Slots[this.IsOpenID[1]];

        if (_a1.value === _a2.value) {
            _a1.active = true;
            _a2.active = true;
            return true;
        }
        return false;
    },

    GameUpdate: function () {
        console.log("--- game update ---");
        if (this.Level < this.GameArray.length) {
            this.Level++;
        }
    },

    GameReset: function () {
        console.log("---- reset ----");
        this.Slots.length = 0;
        this.TurnReset(-1);
        this.CounterTrue = 0;
        this.IsOpenID.length = 0;
        this.CanChooseSlot = true;
        this.CounterOpen = 0;
        clearTimeout(this.SetTimeOut);
        this.GameCounter({
            fn: "start",
            fn_type: true,
            timer: 2
        });
    },

    GameHell: function () {
        this.GameSlotsShuffle();
        console.log(this.Slots);
        this.Slots.map((a, b) => a.active ? (
            this.SlotsItem.eq(b).attr("data-content", a.value),
            this.SlotsItem.eq(b).addClass("is-open")
        ) : (
            this.SlotsItem.eq(b).attr("data-content", ""),
            this.SlotsItem.eq(b).removeClass("active is-open")
        ))
    },

    CheckClick: function (e) {
        if (!this.CanChooseSlot) {
            console.log(this.IsOpenID)
            return false;

        } else {
            // thêm id mấy đứa vùa mở
            this.IsOpenID.push(e);

            // lật bài
            let _value = this.Slots[e].value;
            this.SlotsItem.eq(e).attr("data-content", _value);

            // tăng lượt click
            this.CounterOpen++;

            // check click turn
            if (this.CounterOpen >= 2) {
                this.CanChooseSlot = false;

                //kiểm tra 2 cái lật có giống nhao ko
                let _check = this.CheckOpen();
                if (_check) {
                    // trung nhao ne
                    this.GameCounter({
                        fn: "reset",
                        fn_type: true,
                        timer: 1
                    });

                    this.CounterTrue--;
                    if (this.CounterTrue <= 0) {
                        this.GameUpdate();
                        this.GameReset();
                        return 0;
                    }
                } else {
                    // khong trung nhao ne

                    // tăng lượt click
                    this.CounterClick++;
                    this.HTMLClickCounter.html(this.CounterClick);

                    // reset click
                    this.GameCounter({
                        fn: "reset",
                        fn_type: false,
                        timer: 1
                    });
                }
            }
        }
        return true;
    },

    TurnReset: function (e) {
        console.log("--- reset ---");
        if (!e) {
            this.IsOpenID.map(a => {
                let _ = this.SlotsItem.eq(a);
                _.removeClass("active");
                _.attr("data-content", "");
            });
        } else {
            this.IsOpenID.map(a => {
                this.SlotsItem.eq(a).addClass("is-open");
            });
            switch (this.GameMode) {
                case 4: {
                    console.log("--- hell ---");
                    this.GameHell();

                    break;
                }
            }
        }
        // reset click
        this.IsOpenID.length = 0;
        this.CanChooseSlot = true;
        this.CounterOpen = 0;
    },

    GameCounter: function (act) {
        let _counter = act.timer;

        if (_counter > 0) {
            act.timer -= 1
            this.SetTimeOut = setTimeout(() => {
                this.GameCounter(act);
            }, 500);

        } else {
            //this.CanChooseSlot = !this.CanChooseSlot;

            switch (act.fn) {
                case "reset": {
                    this.TurnReset(act.fn_type);
                    return false;
                }
                case "start": {
                    return this.GameStart();
                }
            }
        }
        // lap lai
        // this.GameCounter({
        //     timer: 2
        // });
    },

    GameStart: function () {
        this.HTMLLevel.html(this.Level);

        this.GameCreateArraySlot();

    },

    Init: function () {
        //this.GameCounter(10);
        this.GameStart();
    }
};

Game.Init();

// $(".paper__item").on("click", function () {
//     const _ = $(this);
//     if (Game.CanChooseSlot && !_.hasClass("active")) {
//         let _ind = _.index();
//         _.addClass("active");
//         Game.CheckClick(_ind);
//     } else {
//         console.log("none click")
//     }
//     // Game.GameCreateScreen();
// });

$(".start-with").on("click", function () {
    let _value = $("#game-screen").val();
    console.log(Game.GameArray.length)
    if (_value && _value > 0 && _value <= Game.GameArray.length) {
        Game.Level = _value;
        Game.GameReset();
    } else {
        Game.GameReset();
    }
});

$(".mode").on("click", function () {
    const _ = $(this);
    $(".mode").removeClass("active");
    const ModeValue = _.attr("data-mode");
    _.addClass("active");
    Game.GameMode = +ModeValue;
    Game.GameCreateMode();
});

/*
 tạo slot
 => click 1
 push slot () => in ra html => active

 => click 2 
 => can click => push slot => false => in ra html => active => check slot

 - true => clear slot => can click = true => so lan click + 1

 - false => clear slot => can click = true => so lan click - 1

 */
let _click = 0;
$('html').on("click", function (e) {
    _click++;
    console.log(_click);
    let _top = e.clientY,
        _left = e.clientX,
        _id = `m${_click}`;
    let _mouseEffect = `<span style="top: ${_top}px; left: ${_left}px" class="mouse-effect" id ="${_id}"></span>`;
    $('body').append(_mouseEffect);

    let _s = setTimeout(function () {
        $(`#${_id}`).remove();
        _click--;
    }, 1000);
});