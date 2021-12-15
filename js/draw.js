 	let num, _max;
 	let x = y = temp = 0;
 	let run = runn = runnn = 1;
 	let _arr = [];


const numberList = () => {
    document.getElementsByClassName("draw")[0].innerHTML = null;
    const num = document.getElementById('khung123').value;

    console.log(matrix(parseInt(num)));

    matrix(parseInt(num)).map((e, i) => {

        e.map((el, j) => {
            let node = document.createElement("span");
            let textnode = document.createTextNode(el);
            node.appendChild(textnode);
            node.style.width = 100 / num + "%";
            return document.getElementsByClassName("draw")[0].appendChild(node);
        })

    })

}


function matrix(n) {
    let result = new Array(n).fill().map(() => new Array(n).fill('')); // create empty n x n array
    let counter = 1;
    let startCol = 0;
    let endCol = n - 1;
    let startRow = 0;
    let endRow = n - 1;
    while (startCol <= endCol && startRow <= endRow) {
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter;
            counter++;
        }
        startRow++;
        for (let j = startRow; j <= endRow; j++) {
            result[j][endCol] = counter;
            counter++;
        }

        endCol--;

        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter;
            counter++;
        }

        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter;
            counter++;
        }

        startCol++;

    }

    return result;
}