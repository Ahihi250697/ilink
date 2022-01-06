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
    allItems: "🍕 🍔 🍟 🌭 🧂 🥓 🥚 🍳".split(" "),
    //game point in level
    point: 0,
    pointBouns: 0,
    pointAdd: 5,
    yourPoint: $(".your-point"),
    pointCounter(e) {
        this.yourPoint.addClass("add-point");
        this.yourPoint.attr("data-content", e);

        setTimeout(() => {
            this.yourPoint.removeClass("add-point");
        }, 300);
    },

    addPoint(e) {
        if (e) {
            let _add = this.pointAdd + Math.floor(this.pointBouns * this.point * 0.01);

            this.pointCounter(_add);
            this.point += _add;
            this.yourPoint.html(this.point);
        }

        $(".click-counter").html(this.pointBouns);
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
            $(e.target).addClass("active");
            $(".mode").not(".active").remove();

            //set mode time
            switch (this.mode) {

                //medium
                case 1: {
                    this.hideTime = 600;
                    this.pointAdd = 30;
                    break;
                }
                //hard
                case 2: {
                    this.hideTime = 400;
                    this.pointAdd = 60;
                    break;
                }
                //super hard
                case 3: {
                    this.hideTime = 200;
                    this.pointAdd = 100;
                    break;
                }
                //hell
                case 4: {

                    this.hideTime = 100;
                    this.pointAdd = 220;
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
    itemsPush(e) {

        this.items.push(e);
        this.items.push(e);

    },
    itemsShuffle() {

        this.items.sort(() => Math.random() - 0.5);

    },
    renderSlot(e) {

        if (e) {
            for (let _i = 0; _i < this.level; _i++) {
                let _item = {
                    id: _i,
                    active: 0
                };
                this.itemsPush(_item);
            }
        } else {
            console.log("false");
            for (let _i = 0; _i < this.level; _i++) {
                let _id = Math.floor(Math.random() * this.level);
                let _item = {
                    id: _id,
                    active: 0
                };
                this.itemsPush(_item);
            }
        }

    },
    renderMode() {

        if (this.level < 1) this.level = 1;
        if (this.level >= this.allItems.length) this.level = this.allItems.length;
        this.coupleCounter = this.level;
        console.log(this.level, "lv");
        let _modename = this.modeName();
        //add sreen mode
        this.screen.addClass(_modename);

        //render with mode
        switch (this.mode) {

            //medium
            case 1:
                //hard
            case 2:
                //super hard
            case 3:
                //hell
            case 4: {
                console.log("--- 1 2 3 4 mode ---");
                this.renderSlot(true);
                break;
            }

            //easy
            default: {
                console.log("--- easy mode ---");
                this.renderSlot(false);
                break;
            }
        }

        this.itemsShuffle();

    },
    renderItems(e) {

        let _html = `<span class="paper__item"></span>`.repeat(this.items.length);
        console.log(this.items.length);
        this.screen.html(_html);

    },
    render() {

        //array with mode
        this.renderMode();
        //html items
        this.renderItems();
        //play
        this.play();

    },

    //play
    slotOpen: [],
    clickMode: 2,
    clickModeCounter: 2,
    slotOpenReset(e) {

        if (e) {

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
                        console.log("--- giong nhau ne ---");

                        //add point
                        this.pointBouns++;
                        this.addPoint(true);

                        //decrease 1 with couple slot
                        this.coupleCounter--;
                        this.slotOpenReset(true);

                        if (this.coupleCounter <= 0) {
                            console.log("--- win game ---");
                            this.createNotification("win");
                            setTimeout(() => {
                                this.reset(true);
                            }, 300);
                        } else {
                            this.createNotification("open");
                        }

                    } else {
                        console.log("--- ko giong nha ---");
                        //add point
                        this.pointBouns = 0;
                        this.addPoint(false);
                        setTimeout(() => {
                            this.slotOpenReset(false);
                        }, this.hideTime);
                    }
                }

            } else {
                console.log("cant cclick");
                this.createNotification("error");
            }
        }).on("mouseenter", (e) => {
            const _ = $(e.target);
            const slotID = _.index();
            //add data
            let _iddata = this.items[slotID];

            _.html(this.allItems[_iddata.id]);
        }).on("mouseleave", (e) => {
            const _ = $(e.target);
            const slotID = _.index();
            //add data
            let _iddata = this.items[slotID];

            _.html("");
        });
    },
    createNotification(c) {
        let _n = `<span id="a" class="noti ${c}"></span>`;

        $('#root').append(_n);
        setTimeout(() => {
            $('#a').remove();
        }, 1000);
    },
    play() {
        console.log("--- play ---");
        this.paperItemsClick();

    },

    //reset
    reset(e) {
        console.log("--- reset ---");
        if (e) {
            let _add = this.mode >= 3 ? 2 : this.mode;
            this.level += _add + 1;
            this.items.length = 0;
            console.log("target", this.level, this.coupleCounter);
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