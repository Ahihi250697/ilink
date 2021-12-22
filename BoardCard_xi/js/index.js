/**
tạo bài
---------------------
play -> đặt cược -> chia bài

random bài 
-> xóa trong bộ bài 
-> check (xì A / AA) 
-true->thêm vào biến tạm () 
-false-> lật/dằn 
-> hiện bài (thêm vào html) 
-> tính điểm (win/ lose)
-> tính tiền

 */

let AllCards,
    StartTurn = 4;
const AllCard = [];


// lưu vào biến tạm

const BoardcardDealer = [],
    BoardcardPlayer = [];

// play game
const PlayGame = {
    GameIsPlay: true,
    Dealer: $(".boardcard-dealer"),
    Player: $(".boardcard-player"),
    CoinValue: 1000,
    SetCoin: 10,
    HTMLSetCoin: $(".set-coin"),
    HTMLCoinValue: $(".coin-value"),
    Coins: $(".coin"),
    CanSetCoin: true,
    CanDraw: true,
    PlayerPoint: 0,
    DealerPoint: 0,
    Timeout: null,
    // random card
    SortCard: function () {
        AllCards = AllCard.sort(() => Math.random() - 0.5);
    },

    // tạo bộ bài
    CreateAllCard: function () {
        const CardNum = '1 2 3 4 5 6 7 8 9 10'.split(" ");
        const CardType = 'a b c d'.split(" ");

        CardNum.map((a) => {
            CardType.map((b) => {
                let _card = {
                    num: a,
                    type: b
                }
                AllCard.push(_card);
            })
        });
        this.SortCard();
        console.log("--- Create All Card ---");
    },

    // rút 1 lá bài
    Draw: function () {
        // rut bai
        if (BoardcardPlayer.length < 5 && this.CanDraw) {
            let _rdCard = this.DrawCard();
            let _card = this.CreateCard(_rdCard, true);
            BoardcardPlayer.push(_rdCard);

            this.Player.append(_card);
        }

        if (BoardcardPlayer.length === 5) {
            $(".draw-end").addClass("active");
            this.CanDraw = false;

            this.DealerPlay();
        }
    },

    // dằn bài
    DrawEnd: function () {
        // dằn bài    
        if (this.CanDraw) {
            console.log("--- dằn bài ---");
            this.CanDraw = false;
            // console.log(_point);
            this.DealerPlay();
        }
    },

    // bỏ bài
    DrawOff: function () {
        // dằn bài
        this.RestartGame();
    },

    // rut bai
    DrawCard: function () {
        let _card = AllCards[0];
        AllCards.splice(0, 1);
        return _card;
    },

    // đặt tiền
    CanSetCoins: function (e) {
        console.log(e)
        if (e === 'all-in') {
            this.SetCoin += this.CoinValue;
            this.CoinValue -= this.CoinValue;
        } else {
            if (this.CoinValue - +e >= 0) {
                this.SetCoin += +e;
                this.CoinValue -= +e;
            }
        }

        this.HTMLSetCoin.html(this.SetCoin);
        this.HTMLCoinValue.html(this.CoinValue);
    },

    SetCoins: function () {
        this.Coins.on("click", (e) => {
            let _coin = $(e.target).attr("data-coin");
            if (this.CanSetCoin) {
                this.CanSetCoins(_coin);
            }
        });
    },

    // game is playing
    GameReady: function () {
        let _winInStart = this.DealerPlayStartGame();
        if (_winInStart) {
            console.log("asdasd ---------")
        }
    },

    // check bài + ăn tiền
    CardCheck: function (e) {

        // check A
        const CheckA = (arr) => {
            // check bài có A
            for (let _i = 0; _i < arr.length; _i++) {
                if (arr[_i].num === '1') return true;
            }
            return false;
        }

        // check J Q K A
        const CheckJQKA = (arr) => {
            if (arr.length > 2) return false;
            for (let _i = 0; _i < arr.length; _i++) {
                if (+arr[_i].num < 10) return false;
            }
            return true;
        }

        // check A A
        const CheckAA = (arr) => {
            if (arr.length > 2) return false;
            if (arr[0].num === arr[1].num) return true;
            return false;
        }

        const CheckPoint = (arr) => {
            let _ret = 0;
            arr.map((a) => {
                if (+a.num > 10) {
                    _ret += 10;
                } else _ret += +a.num;
            });
            if (_ret > 21) return -10000;
            let _o = _ret - 21;
            _o > 0 ? _o *= -1 : _o;

            return _o;
        }

        const CheckPointA = (arr) => {
            let _ret = 0;
            arr.map((a) => {
                let _a = +a.num;
                _a > 10 ? _ret += 10 : _a === 1 ? _ret += 11 : _ret += _a
            });

            let _oac = _ret - 21;
            if (_oac === 0) _ret = 21;
            if (_oac > 1) {
                if (_ret - 10 <= 21) _ret = _ret - 10;
                else _ret = _ret - 11;
            }

            let _o = _ret - 21;
            _o > 0 ? _o *= -1 : _o;
            return _o;
        }

        let _checked = CheckA(e);
        if (_checked) {
            // bài có A

            // check AA
            console.log("bai co a");
            let _aa = CheckAA(e);
            if (_aa) return 10000;

            console.log("bai jqk a");
            let _jqka = CheckJQKA(e);
            if (_jqka) return 1000;


            if (e.length > 3) {
                console.log("bai tinh diem");
                return CheckPoint(e);
            } else {
                console.log("bai tinh diem a");
                return CheckPointA(e);
            }
        } else {
            // bài ko có A
            console.log("bai binh thuong");
            return CheckPoint(e);
        }
    },

    // máy bóc bài
    DealerAI: function () {
        this.DealerPoint = this.CardCheck(BoardcardDealer);
        this.PlayerPoint = this.CardCheck(BoardcardPlayer);

        if (BoardcardPlayer.length !== 5) {
            if (this.PlayerPoint = -10000) {
                console.log("win 1");
                this.GameWin("dealer");
                return true;
            }
            if (this.PlayerPoint < this.DealerPoint && this.DealerPoint >= -5) {
                this.GameWin("dealer");
                return true;
            }
        }

        while (BoardcardDealer.length < 5) {
            if (
                (this.DealerPoint < 15) || (this.DealerPoint < this.PlayerPoint && this.PlayerPoint <= 21)
            ) {
                console.log("nho hon 14 ne");
                let _rdCard = this.DrawCard();
                let _card = this.CreateCard(_rdCard, true);
                BoardcardDealer.push(_rdCard);

                this.Dealer.append(_card);
            } else {
                console.log("break");
                break;
            }

            this.DealerPoint = this.CardCheck(BoardcardDealer);
        }

        this.CheckWin();

    },

    CheckWin: function () {
        let _a = this.DealerPoint,
            _b = this.PlayerPoint;
        console.log(_a, _b);
        if (_a === _b) {
            console.log("hoa nha");
            return this.GameWin("hoa");
        }
        if (_a < _b) {
            if (BoardcardDealer.length === 5) {
                console.log("dealer win");
                return this.GameWin("dealer");
            }
            console.log("player win");
            return this.GameWin("player");
        }
        if (_a > _b) {
            if (BoardcardPlayer.length === 5) {
                console.log("player win");
                return this.GameWin("player");
            }
            console.log("dealer win");
            return this.GameWin("dealer");
        }
        // if ((_b > 21 && _a <= 21) || (_b <= 15 && _a >= 15)) {
        //     console.log("win ko can check");
        //     return this.GameWin("dealer");
        // }
        // if ((_a > 21 && _b <= 21) || (_a <= 14 && _b >= 16)) {
        //     console.log("win ko can check");
        //     return this.GameWin("dealer");
        // }
        // if (_a < _b) {
        //     if (BoardcardDealer.length === 5) {
        //         if (BoardcardPlayer.length === 5) {
        //             console.log("dealer ngu linh nho hon nha")
        //             return this.GameWin("dealer");
        //         }
        //         console.log("dealer ngu linh nha");
        //         return this.GameWin("dealer");

        //     } else {
        //         if (BoardcardPlayer.length === 5) {
        //             console.log("player ngu linh nho hon nha")
        //             return this.GameWin("player");
        //         }
        //         console.log("dealer ngu linh nha");
        //         return this.GameWin("dealer");
        //     }
        // } else if (_a > _b) {
        //     if (BoardcardDealer.length === 5) {
        //         if (BoardcardPlayer.length === 5) {
        //             console.log("player ngu linh nho hon nha")
        //             return this.GameWin("player");
        //         }
        //         console.log("dealer ngu linh nha");
        //         return this.GameWin("dealer");

        //     } else {
        //         if (BoardcardPlayer.length === 5) {
        //             console.log("player ngu linh nho hon nha")
        //             return this.GameWin("player");
        //         }
        //         console.log("dealer ngu linh nha");
        //         return this.GameWin("dealer");
        //     }
        // }
        /*
        if (BoardcardDealer.length === 5) {
            console.log("=== 5");
            if (BoardcardPlayer.length === 5) {
                if (_a < _b) {
                   
                } else if (_a === _b) {
                    console.log("dealer ngu linh = nhau nha")
                    return this.GameWin("hoa");
                }
                console.log("player linh nho hon nha")
                return this.GameWin("player");
            } else {
                if (_a <= 21) {
                    
                }
                console.log("dealer oac cmnr")
                return this.GameWin("player");
            }
        } else {
            if (_b === _a) {
                console.log("hoa nha")
                return this.GameWin("hoa");
            }

            if (_a > 21 && _b > 21) {
                console.log("oac 2 nha");
                return this.GameWin("hoa");
            }
            console.log("khong = 5");
            if (_a >= 15 && _a <= 21 && _b > 21) {
                console.log("player oac")
                return this.GameWin("dealer");
            }
            if (_b >= 15 && _b <= 21 && _a > 21) {
                console.log("dealer oac")
                return this.GameWin("player");
            }

            if (_a > _b) {
                console.log("dealer win ko oac nha");
                return this.GameWin("dealer");
            }
            console.log("player win khong oac nha")
            return this.GameWin("player");
        }
        */
    },

    // dealer mở bài
    DealerOpenCard: function () {
        BoardcardDealer.map((a, b) => {
            let _cardItem = $(".boardcard-dealer").find(".null").eq(0);
            _cardItem.removeClass("null");
            let _n = this.NumCard(a),
                _t = this.TypeCard(a);

            _cardItem.html(_n);
            _cardItem.addClass(_t);
        });
    },

    // dealer 
    DealerPlay: function () {
        this.DealerOpenCard();

        this.DealerAI();
    },

    // thời gian đếm
    Timer: function (e) {
        console.log(e);
        if (e > 0) {
            e--;
            this.Timeout = setTimeout(() => {
                this.Timer(e);
            }, 500);
        } else {
            // hết thời gian đặt tiền
            console.log("--- stop ---");
            this.CanSetCoin = false;
            this.GameReady();
        }
    },

    // chất của bài
    TypeCard: function (e) {
        switch (e.type) {
            case 'a': {
                return "hearts";
                break;
            }
            case 'b': {
                return "diamonds";
                break;
            }
            case 'c': {
                return "clubs";
                break;
            }
            case 'd': {
                return "spades";
                break;
            }
        }
    },

    // đơn vị lá bài
    NumCard: function (e) {
        let _num;
        e.num === '1' ? _num = 'A' : e.num === '11' ? _num = 'J' : e.num === '12' ? _num = 'Q' : e.num === '13' ? _num = 'K' : _num = e.num;
        return _num;
    },

    // tạo lá bài
    CreateCard: function (e, action) {
        let _num = this.NumCard(e),
            _type = this.TypeCard(e);

        if (action) {
            return `<span class="card ${_type}">${_num}</span>`
        } else {
            return `<span class="card null"></span>`
        }
    },

    // win game
    GameWin: function (e) {
        this.GameIsPlay = false;
        this.DealerOpenCard();

        let _bonus = 0;
        if (e === "player") {
            $(".boardcard-player").find(".card").addClass("active");
            _bonus += this.SetCoin * 1.95;
        }
        if (e === "dealer") {
            $(".boardcard-dealer").find(".card").addClass("active");
        }
        if (e === "equal") {
            $(".boardcard-player").find(".card").addClass("active");
            $(".boardcard-dealer").find(".card").addClass("active");
            _bonus += this.SetCoin * 0.95;
        }
        // đặt tiền
        this.CoinValue += _bonus;
        this.SetCoin = 0;
        this.HTMLSetCoin.html(this.SetCoin);
        this.HTMLCoinValue.html(this.CoinValue);

        this.CanDraw = false;
    },

    // chia theo lượt
    DealerPlayStartGame: function () {
        for (let _i = 0; _i < 4; _i++) {
            let _rdCard = this.DrawCard();
            if (_i % 2 === 0) {
                let _card = this.CreateCard(_rdCard, false);
                BoardcardDealer.push(_rdCard);

                this.Dealer.append(_card);
            } else {
                let _card = this.CreateCard(_rdCard, true);
                BoardcardPlayer.push(_rdCard);

                this.Player.append(_card);
            }
        }

        console.log("dealer :", BoardcardDealer);
        console.log("player :", BoardcardPlayer);

        this.PlayerPoint = this.CardCheck(BoardcardPlayer);
        this.DealerPoint = this.CardCheck(BoardcardDealer);

        if ((this.PlayerPoint === 10000 && this.DealerPoint === 10000) ||
            (this.PlayerPoint === 1000 && this.DealerPoint === 1000)) {
            this.GameWin("equal");
            return false;
        }

        if (this.PlayerPoint === 10000 && this.DealerPoint !== 10000) {
            this.GameWin("player");
            return false;
        }

        if (this.DealerPoint === 10000 && this.PlayerPoint !== 10000) {
            this.GameWin("dealer");
            return false;
        }

        if (this.DealerPoint === 1000 && this.PlayerPoint !== 1000) {
            this.GameWin("dealer");
            return false;
        }

        if (this.PlayerPoint === 1000 && this.DealerPoint !== 1000) {
            this.GameWin("player");
            return false;
        }

        return false;
    },

    // bat dau tro choi
    StartGame: function () {
        console.log("--- start game ---");
        // tạo ra bộ bài
        this.CreateAllCard();

        // đặt tiền
        this.CoinValue -= 10;
        this.SetCoin = 10;
        this.HTMLSetCoin.html(this.SetCoin);
        this.HTMLCoinValue.html(this.CoinValue);
        this.SetCoins();

        // bộ đếm
        this.Timer(3);
    },

    // restart
    RestartGame: function () {

        // reset
        this.GameIsPlay = true;
        this.CanSetCoin = true;
        this.CanDraw = true;

        this.PlayerPoint = 0;
        this.DealerPoint = 0;

        this.SetCoin = 0;

        this.Dealer.find(".card").remove();
        this.Player.find(".card").remove();
        $(".draw-end").removeClass("active");
        clearTimeout(this.Timeout);

        BoardcardDealer.length = 0;
        BoardcardPlayer.length = 0;

        this.SortCard();
        this.StartGame();

    }
};

PlayGame.StartGame();
$(".draw").on("click", () => {
    if (PlayGame.CanDraw) {
        PlayGame.Draw();
    }
});

$(".draw-off").on("click", () => {
    console.log("--- bỏ bài ---");
    PlayGame.RestartGame();
});

$(".play-game").on("click", () => {

    if (!PlayGame.GameIsPlay) {
        console.log("--- re play ---");
        PlayGame.RestartGame();
    }
});

$(".draw-end").on("click", function () {
    $(this).addClass("active");
    PlayGame.DrawEnd();
});

//console.log(CreateAllCard());