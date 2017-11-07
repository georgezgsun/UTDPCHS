
var grid = [];  // uses to store the grids
var input = []; // uses to store a new read line's grid
var T;
var indexOfFile = 0;
var offsetCol, offsetRow;
var area, numberDisjoint;
var File = ["2", "3", "Northeast quater of Section 201", "Northwest quater of Southeast quater Section 201", "Southwest quater of Southeast quater Section 201", "5", "Northwest quater of Northwest quater Section 101", "Northeast quater of Northeast quater Section 100", "Northeast quater of Northwest quater Section 101", "Northeast quater of Northeast quater Section 101", "Northwest quater of Northeast quater Section 101"];
var quaters = ["Northwest", "Northeast", "Southwest", "Southeast"];

for (var j = 0; j < 4; j ++) {
    input[j] = [];
}

for (var j = 0; j < 3*4; j ++) {
    grid[j] = [];
}

var T = parseInt(readFile());
console.log("T = " + T);
for (var i = 0; i < T; i++) {
    initGrid();
    solveGrid();
    outputResult();
}

function initGrid() {
    var P = parseInt(readFile());
    console.log("P = " + P);
    
    for(var i = 0; i < 3*4; i ++) {
        for (var j = 0; j < 3*4; j++) {
            grid[j][i] = 0;
        }
    }
    
    for (var i = 0; i < P; i++) {
        initInput();
        readLn();
        uploadToGrid();
    }
}

function solveGrid() {
    numberDisjoint = 0;
    var a = 0;
    
    for (var j = 0; j < 3*4; j++) {
        for (var i = 0; i < 3*4; i++) {
            if (grid[j][i] > 0) {
                a += 1;
                grid[j][i] = a;
            }
        }
        console.log(grid[j]);
    }
    area = a * 40;

    for (var j = 0; j< 3*4; j++) {
        for (var i = 0; i < 3*4; i++) {
            if (grid[j][i] > numberDisjoint) {
                numberDisjoint++;
                fillParcel(i,j,numberDisjoint);
            }
        }
        console.log(grid[j]);
    }
}

function fillParcel(x,y,n) {
    var cx = x, cy = y;
    var nx, ny;
    var stack = [];
    var completed = false;
    grid[y][x] = n;
    stack.push(cx);
    stack.push(cy);
    
    while (!completed) {
        var next = checkNeighbor(cx,cy,n);
        switch (next) {
            case 1:
                nx = cx - 1;
                ny = cy;
                break;
            case 2:
                nx = cx;
                ny = cy - 1;
                break;
            case 3:
                nx = cx + 1;
                ny = cy;
                break;
            case 4:
                nx = cx;
                ny = cy + 1;
                break;
        }
        if (next > 1) {
            grid[ny][nx] = n;
            stack.push(cx);
            stack.push(cy);
            cx = nx;
            cy = ny;
        } else {
            if (stack.length > 0) {
                cy = stack.pop();
                cx = stack.pop();
            } else {
                completed = true;
            }
        }
    }
}

function checkNeighbor(x,y,n) {
    if (x > 0 && grid[y][x-1] > n) {
        return 1;
        }
        
    if (y > 0 && grid[y-1][x] > n) {
        return 2;
    }
    
    if (x < 3*4-1 && grid[y][x+1] > n) {
        return 3;
    }
    
    if (y < 3*4-1 && grid[y+1][x] > n) {
        return 4;
    }
    
    return -1;
}

function initInput() {
    for (var j = 0; j < 4; j ++) {
        for (var i = 0; i < 4; i++) {
            input[j][i] = 0;
        }
    }
}

function readFile() {
    return(File[indexOfFile++]);
}

function readLn() {
    var stack = [];
    var lineS = readFile().split(" ");
    for (var i = 0; i < lineS.length; i ++) {
        if (isQuater(lineS[i])) {
            stack.push(lineS[i]);
        }
        var sectionID = Number(lineS[i]);
        if (sectionID >= 100) {
            offsetCol = (sectionID % 100) * 4;
            offsetRow = (Math.round(sectionID / 100) - 1)*4;
        }
    }
    
    var n = indexOfQuaters(stack.pop());
/*
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if ((Math.floor(j / 2) == Math.floor(n / 2)) && (Math.floor(i / 2) == n % 2)) {
                input[j][i] = 1;
            }
        }
    }
 */
 
    switch (n) {
        case 0:
            input[0][0] = 1;
            input[0][1] = 1;
            input[1][0] = 1;
            input[1][1] = 1;
            break;
        case 1:
            input[0][2] = 1;
            input[0][3] = 1;
            input[1][2] = 1;
            input[1][3] = 1;
            break;
        case 2:
            input[2][0] = 1;
            input[2][1] = 1;
            input[3][0] = 1;
            input[3][1] = 1;
            break;
        case 3:
            input[2][2] = 1;
            input[2][3] = 1;
            input[3][2] = 1;
            input[3][3] = 1;
            break;
    }

    if (stack.length == 0) {
        return;
    }
    n = indexOfQuaters(stack.pop());
    var sum = 0;
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (input[j][i] == 1) {
                input[j][i] = (sum == n) ? 1 : 0;
                sum += 1;
            }
        }
    }
}

function indexOfQuaters(s) {
    for (var i = 0; i < 4; i++) {
        if (s === quaters[i]) {
            return i;
        }
    }
}
    
function isQuater(s) {
    for (var i = 0; i < 4; i++) {
        if (quaters[i] == s) {
            return true;
        }
    }
    return false;
}
    
function uploadToGrid() {
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (input[j][i] > 0) {
                grid[j+offsetRow][i+offsetCol] = 1;
            }
        }
    }
}

function outputResult() {
    var s = "";
    s += area;
    s += " ";
    s += numberDisjoint;
    console.log(s);
}

