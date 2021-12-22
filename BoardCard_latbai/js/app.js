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
    GameArray: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 a b c d e f g h i j k l m n o p q r s t u v x y z'.split(" "),
    GameScreen: $("#game-screen"),
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
        if (arr.length > 10) this.Paper.css({
            width: `${50 * 8 + 2}px`
        });
        this.Paper.html(_a);
        this.SlotsItem = $(".paper__item");
        this.SlotItemClick();
        console.log("--- create slot ---");
    },

    GameCreateArraySlot: function () {

        this.CounterTrue = this.Level;
        // this.CounterTrue > this.GameArray.length ? this.CounterTrue = this.GameArray.length : this.CounterTrue;

        for (let _i = 0; _i < this.CounterTrue; _i++) {
            this.Slots.push(this.GameArray[_i]);
            this.Slots.push(this.GameArray[_i]);
        }

        this.Slots.sort(() => Math.random() - 0.5);
        this.GameCreateSlots(this.Slots);
        console.log("--- create array slot---");
    },

    CheckOpen: function () {
        let _a1 = this.Slots[this.IsOpenID[0]],
            _a2 = this.Slots[this.IsOpenID[1]];

        if (_a1 === _a2) {
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
        this.GameCounter({
            fn: "start",
            fn_type: true,
            timer: 2
        });
    },

    CheckClick: function (e) {
        if (!this.CanChooseSlot) {
            console.log(this.IsOpenID)
            return false;

        } else {
            // thêm id mấy đứa vùa mở
            this.IsOpenID.push(e);

            // lật bài
            let _value = this.Slots[e];
            this.SlotsItem.eq(e).attr("data-content", _value);

            // tăng lượt click
            this.CounterOpen++;

            // check click turn
            if (this.CounterOpen >= 2) {
                this.CanChooseSlot = false;

                //kiểm tra 2 cái lật có giống nhao ko
                let _check = this.CheckOpen();
                if (_check) {

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
                    return this.TurnReset(act.fn_type);
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
    if (_value && _value > 0 && _value <= Game.GameArray.length) {
        Game.Level = _value;
        Game.GameReset();
    }

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