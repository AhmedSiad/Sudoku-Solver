let lines = `Grid 03
000000907
000420180
000705026
100904000
050000040
000507009
920108000
034059000
507000000`


let g = createGrid(lines);
console.log(g);
//solve(g);
console.log(g);

async function solve(grid) {
    let zeroes = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 0) zeroes.push([i, j]);
        }
    }

    let path = [];
    let current = 0;
    let cycles = 0;
    Global:
    while (true) {
        if (path.length == zeroes.length) break Global;
        cycles++;

        let time = document.getElementById("speed").value;
        time = logslider(time);
        if (time >= 1) {
            await sleep(time);
            redraw();
        }
        else {
            let interval = Math.ceil(1 / time);
            if (cycles % interval == 0) {
                await sleep(1);
                redraw();
            }
        }

        if (path[current] != undefined) {
            for (let i = path[current]; i < 10; i++) {
                if (checkValidMove(grid, i, zeroes[current][0], zeroes[current][1])) {
                    grid[zeroes[current][0]][zeroes[current][1]] = i;
                    path[path.length - 1] = i;
                    current++;
                    continue Global;
                }
            }
            path[path.length - 1] = 9;
            current++;
        }
        else {
            for (let i = 1; i < 10; i++) {
                if (checkValidMove(grid, i, zeroes[current][0], zeroes[current][1])) {
                    grid[zeroes[current][0]][zeroes[current][1]] = i;
                    path.push(i);
                    current++;
                    continue Global;
                }
            }
        }

        for (let k = path.length - 1; k >= 0; k--) {
            grid[zeroes[current][0]][zeroes[current][1]] = 0;
            if (path[k] != 9) {
                current--;
                continue Global;
            }
            path.pop();
            current--;
        }
    }
    redraw();
    document.getElementById("next").style.visibility = "visible";
}

function checkValidMove(grid, number, i, j) {
    let rowNums = new Array(10).fill(false);
    rowNums[number] = true;
    for (let a = 0; a < grid.length; a++) {
        if (grid[i][a] == 0) continue;
        if (rowNums[grid[i][a]] == true) return false;
        rowNums[grid[i][a]] = true;
    }

    let colNums = new Array(10).fill(false);
    colNums[number] = true;
    for (let b = 0; b < grid.length; b++) {
        if (grid[b][j] == 0) continue;
        if (colNums[grid[b][j]] == true) return false;
        colNums[grid[b][j]] = true;
    }

    let squareNums = new Array(10).fill(false);
    let squareCorner = getSquareNumber(i, j);
    squareNums[number] = true;
    for (let c = 0; c < 3; c++) {
        for (let d = 0; d < 3; d++) {
            if (grid[squareCorner[0] + c][squareCorner[1] + d] == 0) continue;
            if (squareNums[grid[squareCorner[0] + c][squareCorner[1] + d]] == true) return false;
            squareNums[grid[squareCorner[0] + c][squareCorner[1] + d]] = true
        }
    }
    return true;
}

function getSquareNumber(i, j) {
    if (i < 3 && j < 3) return [0, 0];
    if (i > 5 && j < 3) return [6, 0];
    if (i <= 5 && j < 3) return [3, 0];

    if (i < 3 && j >= 3 && j < 6) return [0, 3];
    if (i > 5 && j >= 3 && j < 6) return [6, 3];
    if (i <= 5 && j >= 3 && j < 6) return [3, 3];

    if (i < 3 && j > 5) return [0, 6];
    if (i > 5 && j > 5) return [6, 6];
    if (i <= 5 && j > 5) return [3, 6];
}

function createGrid(data) {
    let grid = [];
    data = data.split("\n");
    for (let i = 1; i < data.length; i++) {
        let row = data[i].split("");
        row = row.map(x => parseInt(x));
        grid.push(row);
    }
    return grid;
}

function logslider(pos) {
    var minp = 1;
    var maxp = 500;

    var minv = Math.log(50);
    var maxv = Math.log(0.01);
  
    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(pos-minp));
  }