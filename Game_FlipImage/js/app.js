/*
🍕🍔🍟🌭🧂🥓🥚🍳🧇🥞🧈🍞🥐🥨🥯🥖🧀🥗🥙🥪🌮🌯🥫🍖🍗🥩🍠🥟🥠🥡🍱🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🍝🥣🥧🍦🍧🍨🍩🍪🎂🍰
*/

const Game = {
    // all items
    GameItems: '🍕 🍔 🍟 🌭 🧂 🥓 🥚 🍳 🧇 🥞 🧈 🍞 🥐 🥨 🥯 🥖 🧀 🥗 🥙 🥪 🌮 🌯 🥫 🍖 🍗 🥩 🍠 🥟 🥠 🥡 🍱 🍘 🍙 🍚 🍛 🍜 🦪 🍣 🍤 🍥 🥮 🍢 🧆 🥘 🍲 🍝 🥣 🥧 🍦 🍧 🍨 🍩 🍪 🎂 🍰'.split(" "),

    //your point
    YourPoint: 0,
    YourPointHTML: $(".your-point"),

    //mode
    CanChooseMode: true,
    GameMode: -1,

    CanChooseSlot: true,
    CounterOpen: 0,
    CounterTrue: 0,
    CounterClick: 0,
    IsOpenID: [],
    Slots: [],
    SlotsItem: null,

    //level
    Level: 60,

    //board
    Paper: $(".screen"),

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
            value: this.GameItems[e],
            active: false
        }
        this.Slots.push(_item);
        this.Slots.push(_item);
    },

    GameSlotsShuffle: function () {
        this.Slots.sort(() => Math.random() - 0.5);
    },

    GameModeCreate: function () {
        switch (this.GameMode) {

            //easy
            case 0: {
                console.log("---easy---");
                _max = this.GameDefault[0];
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }

            //medium
            case 1: {
                console.log("--- medium ---");
                _max = this.GameDefault[1];
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }

            //hard
            case 2: {
                console.log("--- hard ---");
                _max = this.GameDefault[2];
                for (let _i = 0; _i < _max; _i++) {
                    let _rd = Math.floor(Math.random() * _max);
                    this.GameSlotsPush(_rd);
                }
                break;
            }

            //super hard
            case 3: {
                console.log("--- super hard ---");
                _max = this.GameDefault[3];
                for (let _i = 0; _i < _max; _i++) {
                    this.GameSlotsPush(_i);
                }
                break;
            }

            //hell
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
    },

    GameCreateArraySlot: function () {
        this.Level;

        this.CounterTrue = _max;
        // for (let _i = 0; _i < _max; _i++) {
        //     let _rd = Math.floor(Math.random() * this.GameItems.length);
        //     this.Slots.push(this.GameItems[_rd]);
        //     this.Slots.push(this.GameItems[_rd]);
        // }

        this.GameSlotsShuffle();
        this.GameCreateSlots(this.Slots);
        console.log("--- create array slot---");
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
        if (this.Level < this.GameItems.length) {
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
            // this.SlotsItem.eq(b).attr("data-content", a.value),
            this.SlotsItem.eq(b).html(a.value),
            this.SlotsItem.eq(b).addClass("is-open")
        ) : (
            // this.SlotsItem.eq(b).attr("data-content", ""),
            this.SlotsItem.eq(b).html(''),
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
            // this.SlotsItem.eq(e).attr("data-content", _value);
            this.SlotsItem.eq(e).html(_value);

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
                _.html("");
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
    console.log(Game.GameItems.length)
    if (_value && _value > 0 && _value <= Game.GameItems.length) {
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

const MouseSpan = $('.mouse');
const MouseEffect = {
    mouseClickCounter: 0,
    mouseEffect: false,
    mouseTarget: $(".mouse-checkbox"),

    mouseEffectCheckbox: function () {
        this.mouseTarget.on("click", (e) => {
            if (this.mouseEffect) {
                this.mouseEffect = false;
                this.mouseTarget.removeClass("checked");
                $('body').css({
                    cursor: "unset"
                });
                $('.mouse').css({
                    top: "0",
                    left: "0"
                });
            } else {
                this.mouseEffect = true;
                this.mouseTarget.addClass("checked");
                $('body').css({
                    cursor: "none"
                });
            }
        });
    },
    init: function () {
        this.mouseEffectCheckbox();
    }

}
MouseEffect.init();

$('html').on("click", (e) => {

    if (MouseEffect.mouseEffect) {
        MouseEffect.mouseClickCounter++;

        let _top = e.clientY,
            _left = e.clientX,
            _id = `effect${MouseEffect.mouseClickCounter}`;
        let _mouseEffect = `<span style="top: ${_top}px; left: ${_left}px" class="mouse-effect" id ="${_id}"></span>`;
        $('body').append(_mouseEffect);

        let _s = setTimeout(function () {
            $(`#${_id}`).remove();
            MouseEffect.mouseClickCounter--;
        }, 1000);
    }
});


$('html, body').on("mousemove", function (e) {
    if (MouseSpan.mouseEffect) {
        let _x = e.clientX,
            _y = e.clientY;

        CircelHover.css({
            top: _y,
            left: _x
        });
    }
});