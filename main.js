const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const GRAVITY = 1;
const JUMP_FORCE = 15;
const LEVEL_INFO = [

'{"nest":1632,"platforms":[{"img":"ground_floor","x":0,"y":384,"w":64,"h":32},{"img":"ground_floor","x":64,"y":384,"w":64,"h":32},{"img":"robot_platform","x":232,"y":300,"w":64,"h":32},{"img":"robot_platform","x":296,"y":300,"w":64,"h":32},{"img":"ground_floor","x":452,"y":384,"w":64,"h":32},{"img":"ground_floor","x":516,"y":384,"w":64,"h":32},{"img":"ground_floor","x":580,"y":384,"w":64,"h":32},{"img":"robot_platform","x":680,"y":300,"w":64,"h":32},{"img":"robot_platform","x":744,"y":300,"w":64,"h":32},{"img":"ground_floor","x":1042,"y":384,"w":64,"h":32},{"img":"ground_floor","x":914,"y":384,"w":64,"h":32},{"img":"ground_floor","x":978,"y":384,"w":64,"h":32},{"img":"robot_platform","x":1042,"y":310,"w":64,"h":32},{"img":"robot_platform","x":1042,"y":234,"w":64,"h":32},{"img":"robot_platform","x":1074,"y":234,"w":64,"h":32},{"img":"ground_floor","x":1364,"y":384,"w":64,"h":32},{"img":"ground_floor","x":1428,"y":384,"w":64,"h":32},{"img":"ground_floor","x":1632,"y":384,"w":64,"h":32}],"enemies":[{"x":500,"y":240,"leftBound":500,"rightBound":570},{"x":700,"y":240,"leftBound":680,"rightBound":734},{"x":918,"y":240,"leftBound":914,"rightBound":1034},{"x":1038,"y":320,"leftBound":1026,"rightBound":1058},{"x":1038,"y":230,"leftBound":1058,"rightBound":1090}]}',
'{"platforms":[{"img":"ground_floor","x":0,"y":384,"w":64,"h":32},{"img":"ground_floor","x":64,"y":384,"w":64,"h":32},{"img":"ground_floor","x":128,"y":384,"w":64,"h":32},{"img":"ground_floor","x":192,"y":384,"w":64,"h":32},{"img":"ground_floor","x":256,"y":384,"w":64,"h":32},{"img":"ground_floor","x":320,"y":384,"w":64,"h":32},{"img":"ground_floor","x":384,"y":384,"w":64,"h":32},{"img":"robot_platform","x":240,"y":350,"w":64,"h":32},{"img":"robot_platform","x":304,"y":300,"w":64,"h":32},{"img":"robot_platform","x":48,"y":300,"w":64,"h":32},{"img":"robot_platform","x":-16,"y":300,"w":64,"h":32}],"enemies":[{"x":240,"y":240,"leftBound":152,"rightBound":336}]}',
'{"platforms":[{"img":"ground_floor","x":0,"y":384,"w":64,"h":32},{"img":"ground_floor","x":64,"y":384,"w":64,"h":32},{"img":"ground_floor","x":128,"y":384,"w":64,"h":32},{"img":"ground_floor","x":192,"y":384,"w":64,"h":32},{"img":"ground_floor","x":256,"y":384,"w":64,"h":32},{"img":"ground_floor","x":320,"y":384,"w":64,"h":32},{"img":"ground_floor","x":384,"y":384,"w":64,"h":32},{"img":"robot_platform","x":240,"y":200,"w":64,"h":32},{"img":"robot_platform","x":304,"y":300,"w":64,"h":32},{"img":"robot_platform","x":48,"y":300,"w":64,"h":32},{"img":"robot_platform","x":-16,"y":300,"w":64,"h":32}],"enemies":[{"x":240,"y":240,"leftBound":0,"rightBound":400}]}',

]

var assets = {};
var keys = {};

var gameState = 0;

//0 - start
//1 - game
//2 - died

var currentLevelIndex = 0;
var level;

var cam = {
    x: 200,
    y: 200,
}
var enemies = [];

var loadNextLevel = function(){
    currentLevelIndex++
    level = JSON.parse(LEVEL_INFO[currentLevelIndex]);

    enemies = []  //clear the enemies when you load next level

    level.enemies.forEach((enemyInfo) => {
        enemies.push(Enemy(enemyInfo.x, enemyInfo.y, enemyInfo.leftBound, enemyInfo.rightBound));
    });
};

var preload = function() {
    level = JSON.parse(LEVEL_INFO[currentLevelIndex]);

    level.enemies.forEach((enemyInfo) => {
        enemies.push(Enemy(enemyInfo.x, enemyInfo.y, enemyInfo.leftBound, enemyInfo.rightBound));
    });

    // images
    assets["player"] = loadImage("assets/We_Bird.png");
    assets["enemyS"] = loadImage("assets/We_SDestroyer.png");
    assets["ground_floor"] = loadImage("assets/We_Ground.png");
    assets["robot_platform"] = loadImage("assets/We_Platform.png");
    assets["nest"] = loadImage("assets/We_Nest4Win.png");
    // sound
    assets["jump"] = loadSound("assets/J_ump.mp3");

    //load enemeies

};

// happens when the project starts
var setup = function() {
    let c = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    c.elt.style.border = "5px solid";
    c.elt.style.width = "700px";
    c.elt.style.height = "700px";
    c.elt.style.imageRendering = "pixelated";

    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
};


var keyPressed = function () {
    if (keyCode === UP_ARROW) {
        player.jump();

        keys["UP_ARROW"] = 1;
    }
    else if (keyCode === RIGHT_ARROW) {
        keys["RIGHT_ARROW"] = 1;
    }
    else if (keyCode === LEFT_ARROW) {
        keys["LEFT_ARROW"] = 1;
    }
};

var keyReleased = function() {
    if (keyCode === UP_ARROW) {
        keys["UP_ARROW"] = 0;
    }
    else if (keyCode === RIGHT_ARROW) {
        keys["RIGHT_ARROW"] = 0;
    }
    else if (keyCode === LEFT_ARROW) {
        keys["LEFT_ARROW"] = 0;
    }
    else if (key === 'n') {
        loadNextLevel();
    }
};

// draw the data from level object
var renderLevel = function() {
    for(var i = 0; i < level.platforms.length; i++) {
        image(assets[level.platforms[i].img],level.platforms[i].x, level.platforms[i].y, level.platforms[i].w, level.platforms[i].h)
        image(assets['nest'], level.nest, 350)
    }
};

var startScreen = function(){

//draw cool image

//start button
    rect(200, 250, 100, 30);
    text("START",200,250);
    if(mouseIsPressed) {
        if(mouseX > 150 && mouseX < 250 && mouseY > 235 && mouseY < 265){
            gameState=1;
        }
    }
};


var gameScreen = function (){
    
    translate(-cam.x, cam.y - 200); // move level
    cam.x = player.x -200; 

    renderLevel();

    enemies.forEach((enemy) => { 
        if(enemy.isDead) {
            enemies.splice(enemies.indexOf(enemy),1);
        }

        enemy.update();

        level.platforms.forEach((p) => {
            let offset = planarOverlapOffset(enemy.x, enemy.y, enemy.w, enemy.h, p.x, p.y, p.w, p.h);
            if (offset.y > 0 && offset.x > 0) {
                enemy.yVel = 0;
                enemy.y -= offset.y;
                enemy.isJumping = false;
            }
        });
    });

    player.update();
    // check player world collision
    level.platforms.forEach((p) => {
        let offset = planarOverlapOffset(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h);
        if (offset.y > 0 && offset.x > 0) {
            player.yVel = 0;
            player.y -= offset.y;
            player.isJumping = false;
        }
    });
};

var deathScreen = function(){
    background(0);

    fill(255);
    text("YOU DIDNT MAKE IT... \nGOOD LUCK NEXT TIME", 200, 200)
    
    //restart
    rect(200, 250, 100, 30);
    fill(0);
    text("RESTART", 200, 250);
    if(mouseIsPressed) {
        if(mouseX > 150 && mouseX < 250 && mouseY > 235 && mouseY < 265){
            //bad way to fix enemy prob
            currentLevelIndex--;
            loadNextLevel();

            gameState=1;
        }
    }
};

var draw = function() {
    background(120, 211, 250);

    if (gameState === 0){
        startScreen();
    }

    else if (gameState === 1){
        gameScreen();
    }

    else if (gameState === 2){
        deathScreen();
    }
};