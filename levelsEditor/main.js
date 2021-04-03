const LEVEL_WIDTH = 1600;
const LEVEL_HEIGHT = 400;

var setup = function() {
    let c = createCanvas(LEVEL_WIDTH, LEVEL_HEIGHT);
    c.elt.style.border = "5px solid";

    rectMode(CENTER);
};

var createBackground;

var createWin = function(x){
    return x;
}

// create a platform type object and return it
var createPlatform = function(img, x, y, w, h) {
    var p = {}; // object
    
    // save info on object
    p.img = img; 
    p.x = x;
    p.y = y;
    p.w = w;
    p.h = h;
    
    return p;
};

var createEnemy = function(x,y, leftBound, rightBound) {
    var e = {}; // object
    
    // save info on object
    e.x = x;
    e.y = y;
    e.leftBound = leftBound;
    e.rightBound = rightBound;

    return e;
};


var backgroundImage;
var nest = createWin(1632);
var platforms = [
    createPlatform("ground_floor", 0, 384, 64, 32),
    createPlatform("ground_floor", 64, 384, 64, 32),
    createPlatform("robot_platform", 232, 300, 64, 32),
    createPlatform("robot_platform", 296, 300, 64, 32),
    createPlatform("ground_floor", 452, 384, 64, 32),
    createPlatform("ground_floor", 516, 384, 64, 32),
    createPlatform("ground_floor", 580, 384, 64, 32),
    createPlatform("robot_platform", 680, 300, 64, 32),
    createPlatform("robot_platform", 744, 300, 64, 32),
    createPlatform("ground_floor", 1042, 384, 64, 32),
    createPlatform("ground_floor", 914, 384, 64, 32),
    createPlatform("ground_floor", 978, 384, 64, 32),
    createPlatform("robot_platform", 1042, 310, 64, 32),
    createPlatform("robot_platform", 1042, 234, 64, 32),
    createPlatform("robot_platform", 1074, 234, 64, 32),
    createPlatform("ground_floor", 1364, 384, 64, 32),
    createPlatform("ground_floor", 1428, 384, 64, 32),
    createPlatform("ground_floor", 1632, 384, 64, 32),
];

var enemies = [
    createEnemy(500,240,500,570),
    createEnemy(700,240,680,734),
    createEnemy(918,240,914,1034),
    //createEnemy(1038,240,914,1034),
    createEnemy(1038,320,1026,1058),
    createEnemy(1038,230,1058,1090),
];

var drawPlatformSkeleton = function(platform) {
    rect(platform.x, platform.y, platform.w, platform.h);
};

var draw = function() {
    // draw skeleton level
    platforms.forEach( drawPlatformSkeleton );
    rect(nest, 368 , 32,64)
};

var mouseClicked = function() {
    let level = {};
    level.backgroundImage = backgroundImage;
    level.nest = nest;
    level.platforms = platforms;
    level.enemies = enemies;
    
    console.log(JSON.stringify(level));
};
