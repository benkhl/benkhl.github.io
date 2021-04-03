// AABB collision system

const FLEX = 1;

/*
    check the amount of overlap between 2 lines in 1D

    a
    -------------------
                 ---------------
                 b

    would return 6px
*/
var linearOverlap = function(a, al, b, bl) {
    let aAdjusted = a - al/2;
    let bAdjusted = b - bl/2;
    let overlapSize = max(0, min(aAdjusted+al, bAdjusted+bl) - max(aAdjusted, bAdjusted));
    return overlapSize;
};

// check the amount two boxes are overlapping
var planarOverlap = function(ax, ay, aw, ah, bx, by, bw, bh) {
    let horz = linearOverlap(ax, aw, bx, bw);
    let vert = linearOverlap(ay, ah, by, bh);

    let resolution = 0;
    if (horz != 0 && vert != 0) {
        resolution = horz > vert ? 1 : -1;
    }
    return resolution;
};

var planarOverlapOffset = function(ax, ay, aw, ah, bx, by, bw, bh) {
    let horz = linearOverlap(ax, aw, bx, bw);
    let vert = linearOverlap(ay, ah, by, bh);

    return {x:horz, y:vert};
};