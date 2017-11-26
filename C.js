var solutions = [];
var grid = [];
var indexOfFile = 0;
var R,C;
var pX,pY,kX,kY;
var File = ["2", "3 4", ".*p", ".K.", "*..", "...", "6 6",".*....", "...K..", ".*...*", "..*P*.", "......", "......"]
var Output = "";

var N = parseInt(readFile());

for (var n = 0; n < N; n++) {
    initGrid();
    solveGrid();
    outputResult();
}
console.log(Output);

function initGrid() {
    R = parseInt(readFile());
    C = parseInt(readFile());
    grid = [];
    solutions = [];
    
    for (var i = 0; i < R; i++) {
        for (var j = 0; j < C; j++) {
            var ch = readFile();
            if (ch === "P") {
                pX = j;
                pY = i;
            }
            if (ch === "K") {
                kX = j;
                kY = i;
            }
            grid.push(ch);
        }
    }
}

function solveGrid() {
    var current = {x:kX, y:kY}, next = {x:0, y:0}, princess = {x:pX, y:py};
    var stack = [];
    var completed = false;
    
    stack.push(current);
    while (!completed) {
        mark(current.x, current.y);
        next = checkNext(current.x, current.y);
        
        if (next) {
            if (next == princess) {
                solutions.push(stack.length);
                current = stack.pop();
            } else  {
            stack.push(current);
            current = next;
            } else if (stack.length > 0) {
                current = stack.pop();
                unMark(current.x, current.y);
            } else {
                completed = true
            }
        }
    }
}

function checkNext(i,j) {
    var next = {x:0, y:0},ch;
    next.x = i + 1;
    next.y = j + 2;
    ch = grid[next.x + next.y * C];
    if (next.x < C && next.y < R && (ch == "." || ch == "P") {
        return next;
        }
        
    next.x = i + 1;
    next.y = j - 2;
    ch = grid[next.x + next.y * C];
    if (x < C && y > 0 && (ch == "." || ch == "P") {
        return next;
        }
        
    next.x = i - 1;
    next.y = j + 2;
    ch = grid[next.x + next.y * C];
    if (x > 0 && y < R && (ch == "." || ch == "P") {
        return next;
        }
            
    next.x = i - 1;
    next.y = j - 2;
    ch = grid[next.x + next.y * C];
    if (x > 0 && y > 0 && (ch == "." || ch == "P") {
        return next;
        }
        
    next.x = i + 2;
    next.y = j + 1;
    ch = grid[next.x + next.y * C];
    if (x < C && y < R && (ch == "." || ch == "P") {
        return next;
        }
            
    next.x = i + 2;
    next.y = j - 1;
    ch = grid[next.x + next.y * C];
    if (x < C && y > 0 && (ch == "." || ch == "P") {
        return next;
        }
                
    next.x = i - 1;
    next.y = j + 2;
    ch = grid[next.x + next.y * C];
    if (x > 0 && y < R && (ch == "." || ch == "P") {
        return next;
        }
                    
    next.x = i - 1;
    next.y = j - 2;
    ch = grid[next.x + next.y * C];
    if (x > 0 && y > 0 && (ch == "." || ch == "P") {
        return next;
        }
        
    return undefined;

}
    
function mark(x,y) {
    grid[x + y * C] = "K";
}

function mark(x,y) {
    grid[x + y * C] = ".";
    }
        
function outputResult() {
    if (solutions.length < 1) {
        Output += "The Princess cannot be reached.";
        return;
    }
    
    var n = 999;
    for (var i = 0; i < solutions.length; i++) {
        if ( solutions[i] < n) {
            n = solutions[i];
        }
    }
    Output += n;
}

function readFile() {
    return File[indexOfFile++];
}
