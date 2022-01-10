/**


tạo random vị trí || css tay

{
    hover => zoom

    => {
        thằng cha nó translate()

    }

    => click => lây item => gom mấy đứa lại => qa trang
}

*/

const Img = $(".js-hover-img");
const ImgRange = 200;

const hoverImg = (e, hover) => {
    //zoom


    e.css({
        transform: `scale(${hover})`
    });

};
const Scale = (a, b) => {
    // a: vi tri hinh imgcenter
    // b: khoang cach pos
    let _range = a.w2 + ImgRange;
    let _per = Math.abs(1 - (b / _range));
    // let _a = b
    // if (a < b) {
    //     console.log("lon hon");
    // } else {
    //     console.log("nho hon");
    // }
    console.log(_per);
    return _per;

}
const pointDistance = (x1, y1, x2, y2) => {
    let _pos = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    console.log("p", _pos);
    return _pos;
}

const mouse = (e) => {
    let _mx = e.pageX,
        _my = e.pageY;
    return {
        mx: _mx,
        my: _my
    }
}

const getImgHalfSize = (e) => {
    let _w2 = e.innerWidth() * 0.5,
        _h2 = e.innerHeight() * 0.5;

    return {
        w2: _w2,
        h2: _h2
    }
}

const getImgPos = (e) => {
    let _x = e.position().left,
        _y = e.position().top;

    return {
        x: _x,
        y: _y,
    }
}

const zoomImg = (e, m) => {
    const mouseX = m.mx;
    const mouseY = m.my;

    Img.map((a, b) => {
        const _ = $(b);
        let _img = getImgPos(_);
        let _size = getImgHalfSize(_);
        // tinh khaong cach
        let _pos = pointDistance(_img.x, _img.y, mouseX, mouseY);

        if (_pos < _size.w2 + 50) {
            let _scale = Scale(_size, _pos);
            hoverImg(_, _scale);
        }
    })
}
$('#root').on("mousemove", function (e) {
    // lay vi tri chuot
    // let _m = mouse(e);
    const Mouse = mouse(e);

    zoomImg(e, Mouse);

});
// Img.on("mousemove", function (e) {
//     const _ = $(this);
//     //getImgPos(_);

// });