const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;

let currentIndex = 0;

let grid = [ 
[ 0, 0, 3, 0, 2, 0, 6, 0, 0 ],
[ 9, 0, 0, 3, 0, 5, 0, 0, 1 ],
[ 0, 0, 1, 8, 0, 6, 4, 0, 0 ],
[ 0, 0, 8, 1, 0, 2, 9, 0, 0 ],
[ 7, 0, 0, 0, 0, 0, 0, 0, 8 ],
[ 0, 0, 6, 7, 0, 8, 2, 0, 0 ],
[ 0, 0, 2, 6, 0, 9, 5, 0, 0 ],
[ 8, 0, 0, 2, 0, 3, 0, 0, 9 ],
[ 0, 0, 5, 0, 1, 0, 3, 0, 0 ] ];

let ogrid = [];
for (let i = 0; i < grid.length; i++) ogrid[i] = [...grid[i]];

function setup() {
    let cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    cnv.parent("container");

    noLoop();
    solve(grid);
}

function draw() {
    background(255);

    let zeroesCount = 0;
    let filledCount = 0;
    textFont("Russo One");
    textSize(32);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            fill(0);
            if (grid[i][j] != ogrid[i][j]) {
                fill(0, 102, 153);
                filledCount++;
            }
            if (grid[i][j] != 0) {
                text(grid[i][j], j * 50 + 50, i * 50 + 50);
            }
            else zeroesCount++;
            noFill();
            rect(j * 50 + 50, i * 50 + 50, 50, 50);
        }
    }
    zeroesCount += filledCount;

    push();
    strokeWeight(6);
    rect(1 * 50 + 50, 1 * 50 + 50, 150, 150);
    rect(4 * 50 + 50, 1 * 50 + 50, 150, 150);
    rect(7 * 50 + 50, 1 * 50 + 50, 150, 150);
    rect(1 * 50 + 50, 4 * 50 + 50, 150, 150);
    rect(4 * 50 + 50, 4 * 50 + 50, 150, 150);
    rect(7 * 50 + 50, 4 * 50 + 50, 150, 150);
    rect(1 * 50 + 50, 7 * 50 + 50, 150, 150);
    rect(4 * 50 + 50, 7 * 50 + 50, 150, 150);
    rect(7 * 50 + 50, 7 * 50 + 50, 150, 150);
    pop();



    rectMode(CORNER);
    noFill();
    rect(25, 500, 450, 50);

    let length = filledCount / zeroesCount * 450;
    fill(0, 255, 0);
    rect(25, 500, length, 50);

}

function changeGrid(btn) {
    btn.style.visibility = "hidden";

    currentIndex = (currentIndex + 1) % 50;
    grid = createGrid(grids[currentIndex]);
    console.log(grid);
    for (let i = 0; i < grid.length; i++) ogrid[i] = [...grid[i]];
    solve(grid);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}