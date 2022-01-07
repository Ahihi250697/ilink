/*
🍕🍔🍟🌭🧂🥓🥚🍳🧇🥞🧈🍞🥐🥨🥯🥖🧀🥗🥙🥪🌮🌯🥫🍖🍗🥩🍠🥟🥠🥡🍱🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🍝🥣🥧🍦🍧🍨🍩🍪🎂🍰
*/
/*
 tạo slot
 {
     level (chọn hoặc không, mặc định 1),
     chọn mode,
     play,

     tạo slot -> shuffle

     click -> {
         lật nếu chưa đủ 2, 3 .... lá -> {
            thêm vào slot những lá đang lật ->{
                check -> trùng {
                    lật lên,
                    số cặp trùng -1 -> {
                        nếu số cặp trùng = 0 -> win game
                    }
                }
                -> không trung {
                    up lại
                }
            }
         }
     }
 }
 */

const Game = {
    //all items
    allItems: "🍕 🍔 🍟 🌭 🧂 🥓 🥚 🍳 🧇 🥞 🧈 🍞 🥐 🥨 🥯 🥖 🧀 🥗 🥙 🥪 🌮 🌯 🥫 🍖 🍗 🥩 🍠 🥟 🥠 🥡 🍱 🍘 🍙 🍚 🍛 🍜 🦪 🍣 🍤 🍥 🥮 🍢 🧆 🥘 🍲 🍝 🥣 🥧 🍦 🍧 🍨 🍩 🍪 🎂 🍰".split(" "),
    //game point in level
    point: 0,
    pointBouns: 0,
    pointAdd: 10,
    yourPoint: $(".your-point"),
    // pointCounter(e, c = true) {
    //     if (c) {
    //         this.yourPoint.addClass("add-point");
    //     } else {
    //         this.yourPoint.addClass("add-point lose");
    //     }
    //     this.yourPoint.attr("data-content", e);

    //     setTimeout(() => {
    //         this.yourPoint.removeClass("add-point lose");
    //     }, 300);
    // },
    addPoint(e) {
        let _add = 0;

        if (e) {
            _add = this.pointAdd + Math.floor(this.pointBouns * this.point * 0.1);
            this.yourPoint.addClass("add-point");

        } else {
            _add = (this.mode + 1) * -2;
            this.yourPoint.addClass("add-point lose");
        }
        setTimeout(() => {
            this.yourPoint.removeClass("add-point lose");
            this.yourPoint.attr("data-content", 0);
        }, 300);

        this.point += _add;
        if (this.point < 0) {
            this.point = 0;
        } else {
            this.yourPoint.attr("data-content", _add);
            this.yourPoint.html(this.point);
        }

        $(".crit-bonus").html(this.pointBouns);
    },

    //game level
    level: 1,
    //couple counter
    coupleCounter: 1,

    //mode
    mode: 0,
    hideTime: 1000,
    canChooseMode: true,
    modeName: function () {

        switch (this.mode) {
            case 0: {
                // this.hideTime = 900;
                return 'easy';
            }
            case 1: {
                // this.hideTime = 600;
                return 'medium';
            }
            case 2: {
                // this.hideTime = 400;
                return 'hard';
            }
            case 3: {
                // this.hideTime = 200;
                return 'super-hard';
            }
            case 4: {
                //  this.hideTime = 100;
                return 'hell';
            }
        }

    },
    chooseMode() {

        $(".mode").on("click", (e) => {
            //set can choose mode
            if (!this.canChooseMode) return false;
            this.canChooseMode = false;
            //set mode
            this.mode = $(e.target).index();

            //add class and remove mode
            // $(".mode").removeClass("active");
            $(e.target).addClass("active");
            $(".mode").not(".active").remove();

            //set mode time
            switch (this.mode) {

                //medium
                case 1: {
                    this.hideTime = 600;
                    this.pointAdd = 20;
                    break;
                }
                //hard
                case 2: {
                    this.hideTime = 400;
                    this.pointAdd = 40;
                    this.clickMode = 3;
                    this.clickModeCounter = 3;
                    break;
                }
                //super hard
                case 3: {
                    this.hideTime = 200;
                    this.pointAdd = 80;

                    break;
                }
                //hell
                case 4: {
                    this.hideTime = 100;
                    this.pointAdd = 100;
                    this.clickMode = 3;
                    this.clickModeCounter = 3;
                    break;
                }
            }

            //render
            this.render();
        });

    },

    //render
    screen: $(".screen"),
    items: [],
    itemsPush(e, c = 2) {
        for (let _i = 0; _i < c; _i++) {
            this.items.push(e);
        }

    },
    itemsShuffle() {

        this.items.sort(() => Math.random() - 0.5);

    },
    renderSlot() {

        switch (this.mode) {
            case 1:
            case 3: {
                for (let _i = 0; _i < this.level; _i++) {
                    let _item = {
                        id: _i,
                        active: 0
                    };
                    this.itemsPush(_item, 2);
                }
                break;
            }

            case 2:
            case 4: {
                for (let _i = 0; _i < this.level; _i++) {
                    let _item = {
                        id: _i,
                        active: 0
                    };
                    this.itemsPush(_item, 3);
                }
                break;
            }

            default: {
                for (let _i = 0; _i < this.level; _i++) {
                    let _id = Math.floor(Math.random() * this.level);
                    let _item = {
                        id: _id,
                        active: 0
                    };
                    this.itemsPush(_item, 2);
                }
                break;
            }
        }

        this.itemsShuffle();
    },
    renderMode() {

        if (this.level < 1) this.level = 1;
        if (this.level >= this.allItems.length) this.level = this.allItems.length;
        this.coupleCounter = this.level;

        let _modename = this.modeName();

        //add sreen mode
        this.screen.addClass(_modename);

        //render with mode
        this.renderSlot();

    },
    renderItems(e = true) {

        let _html = '';
        if (e) {
            _html = `<span class="paper__item"></span>`.repeat(this.items.length);

        } else {
            this.items.map((a) => {

                // let _iddata = this.items[slotID];

                // _.html(this.allItems[_iddata.id]);
                a.active === 1 ?
                    _html += `<span class="paper__item active">${this.allItems[a.id]}</span>` :
                    _html += `<span class="paper__item"></span>`
            }).join('');
        };
        this.screen.html(_html);
        this.paperItemsClick();
    },
    render() {

        //array with mode
        this.renderMode();
        //html items
        this.renderItems(true);
        //play
        // this.play();

    },
    //notification
    createNotification(c) {

        let _n = `<span id="a" class="noti ${c}"></span>`;

        $('#root').append(_n);
        setTimeout(() => {
            $('#a').remove();
        }, 1000);

    },

    //play
    slotOpen: [],
    clickMode: 2,
    clickModeCounter: 2,
    slotOpenReset(e) {

        if (e) {
            this.slotOpen.map((a, b) => {
                let _a = this.items[a].active = 1;
            });

            if ((this.mode === 3 || this.mode === 4) && this.coupleCounter > 0) {
                this.itemsShuffle();
                this.renderItems(false);
            }
        } else {
            this.slotOpen.map((a, b) => {
                let _a = $(".paper__item").eq(a);
                _a.removeClass("active");
                _a.html("");
            });
        }
        this.slotOpen.length = 0;
        this.clickModeCounter = this.clickMode;

    },
    slotOpenCheck() {

        let _slot1id = this.slotOpen[0],
            _slot1 = this.items[_slot1id].id;
        for (let _i = 1; _i < this.slotOpen.length; _i++) {
            let _slotid = this.slotOpen[_i];

            if (this.items[_slotid].id !== _slot1) return false;
        }
        return true;

    },
    paperItemsClick() {

        const Slots = $(".paper__item");
        Slots.on("click", (e) => {
            const _ = $(e.target);
            const slotID = _.index();

            if (this.clickModeCounter > 0) {
                //push ID to open array
                this.slotOpen.push(slotID);

                //addclass active
                _.addClass("active");

                //add data
                let _iddata = this.items[slotID];

                _.html(this.allItems[_iddata.id]);

                //descrease click follow mode
                this.clickModeCounter--;

                //check open slot
                if (this.clickModeCounter === 0) {
                    //start check
                    if (this.slotOpenCheck()) {
                        // console.log("--- giong nhau ne ---");

                        //add point
                        this.pointBouns++;
                        this.addPoint(true);

                        //decrease 1 with couple slot
                        this.coupleCounter--;
                        this.slotOpenReset(true);

                        if (this.coupleCounter <= 0) {
                            // console.log("--- win game ---");
                            this.createNotification("win");
                            setTimeout(() => {
                                this.reset(true);
                            }, 300);
                        } else {
                            this.createNotification("open");
                        }

                    } else {
                        // console.log("--- ko giong nha ---");
                        //add point
                        this.pointBouns = 0;
                        this.addPoint(false);
                        setTimeout(() => {
                            this.slotOpenReset(false);
                        }, this.hideTime);
                    }
                }

            } else {
                // console.log("cant cclick");
                this.createNotification("error");
            }
        });

    },
    // play() {

    //     console.log("--- play ---");
    //     this.paperItemsClick();

    // },

    //reset
    reset(e) {

        console.log("--- reset ---");
        if (e) {
            let _add = this.mode >= 3 ? 2 : this.mode;
            this.level += _add + 1;
            this.items.length = 0;
            this.render();
        } else {
            this.items.length = 0;
            this.render();
        }

    },

    //init
    init() {
        //set mode
        this.chooseMode();
    }
}
Game.init();

$(".guide-toggler").on("click", function () {
    const _ = $('.guide');
    _.hasClass("open") ?
        _.removeClass("open") :
        _.addClass("open");
});