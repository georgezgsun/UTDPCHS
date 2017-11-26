
var sticks = [];  // uses to store the stick length
var boxes = []; // uses to store the box current sum
var visit = []; //use to store current stick in which box
var N,p;
var sum, max, min, boxNum;
var indexOfFile = 0;
var File = ["9", "5 2 1 5 2 1 5 2 1", "4", "1 2 3 4", "0"];

P = parseInt(readFile());
while (P > 0) {
    console.log("P = " + P);

    init();
    var sLen = max+min;
    while ((sLen < sum) && !checkLen(sLen)) {
        sLen += min
    }
    console.log(sLen)
    P = parseInt(readFile());
}

function init() {
    var s = readFile().split(" ")
    sticks = []
    
    sum = 0;
    max = 0;
    min = 100;
    for(var i = 0; i < P; i ++) {
        var n = Number(s[i]);
        sum += n;
        max = (n > max) ? n : max;
        min = (n < min) ? n : min;
        sticks[i] = n;
    }
    console.log(sticks);
}

function checkLen(l) {
    if (sum % l) return false;
    
    boxNum = sum / l;
    for (var i = 0; i < boxNum; i++) {
        boxes[i] = 0;
        visit[i] = 0
    }
    var stick = 0;
    visit[stick] = 0; // stick in box 0
    visit[stick + 1] = 0;
    boxes[visit[stick]] = sticks[0]; // box 0 add the stick length
    boxes[1] = 0;

    while ((stick >= 0) && (stick < P-1)) {
        var nextBox = checkNeighbor(stick + 1,l);

        if (nextBox < boxNum) {
            stick++;
            if (stick = boxNum -1) {
                return true
            } else {
            visit[stick] = nextBox;
            visit[stick+1] = 0;
            boxes[visit[stick]] += sticks[stick];
                        console.log(boxes)
            }
        } else { /// there is no room for next stick,
            visit[stick]++; // so current stick has to try another box
            boxes[visit[stick]] -= sticks[stick];
            stick --
            if (stick < 0) {
                  return false
            }
        }
    }
}

function Radix() {
    this.radix = 10;
    this.digits = 3;
    this.d = [];
    var cvt = {
        "0" : 0,
        "1" : 1,
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "5" : 5,
        "6" : 6,
        "7" : 7,
        "8" : 8,
        "9" : 9,
        "A" : 10,
        "B" : 11,
        "C" : 12,
        "D" : 13,
        "E" : 14,
        "F" : 15
    }
    
    this.add
    
    }
}
function checkNeighbor(n,l) {
    while (visit[n] < boxNum) {
        if (boxes[visit[n]] + sticks[n] <= l) {
            return visit[n];
        }
        visit[n] ++
    }
    return boxNum
}

function readFile() {
    return File[indexOfFile++];
}

