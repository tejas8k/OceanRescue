var game;
var turret;
var timedEvent;
var isShoot = true;
var isShoot2 = true;
var isShoot3 = true;
var isTurretSpawn = true;
var turrets;
var bullets;
var bullet;
var bombs;
var scubaDiver;
var scubaDivers;
var specialScubaDiver;
var specialScubaDivers;
var isScubaSpawn = true;
var isScubaCollected = false;
var isSpecialScubaCollected = false;


var scubaDiver1X = 1300;
var scubaDiver2X = 1800;
var scubaDiver3X = 2500;
var scubaDiverY = 0;
var scubaDiverOffsetX = 0;
var scubaDiverOffsetY = 0;

var specialScubaDiver1X = 2800;
var specialScubaDiver2X = 4000;
var specialScubaDiver3X = 5200;
var sepcialScubaDiverOffsetX = 0;
var sepcialScubaDiverY = 0;

var turretX = 0;
var turretY = 0;
var ground1;
var ground2;
let value = 0;
var bg_1;
var bg_2;
var score = 0;
var highScore;
var text;
var posX;
var posY;
var bomb;
var size = 500;
var startScreenImg;
var gameOverScreenImg;
var startButton;
var isStartClicked = false;
var explosion;
var isGameOver = false;

var turretPosX = 0;
var turret1PosX = 970;
var turret2PosX = 1765;
var turret3PosX = 2340;
var turretPosY = 0;
var turret1;
var turret2;
var turret3;
var turret4;
var turret5;
var turret6;
var turret7;
var turret8;
var turret9;
var turret10;
var turret11;
var turret12;
var turret13;
var turret14;
var fuel = 1000;
var isBomb = true;


var block1;
var block2;
var block3;

var blocksGroup;

var obstacles;
var obstacle1X = 1600;
var obstacle2X = 3100;
var obstacle3X = 4800;
var obstacleXOffset = 0;


var blockGroup1X = 800;
var blockGroup2X = 1010;
var blockGroup3X = 1135;
var blockGroup4X = 1380;
var blockGroup5X = 1600;
var blockGroup6X = 1765;
var blockGroup7X = 1925;
var blockGroup8X = 2120;
var blockGroup9X = 2340;

var blockGroup1Y = 1000;
var blockGroup2Y = 1020;
var blockGroup3Y = 1000;
var blockGroup4Y = 1000;
var blockGroup5Y = 1000;
var blockGroup6Y = 1000;
var blockGroup7Y = 1000;
var blockGroup8Y = 1020;
var blockGroup9Y = 1060;

var blockGroupXOffset = 0;
var blockGroupYOffset = 0;
var turretGroupXOffset = 0;
var turretGroupYOffset = 0;

var bulletTimedEvent;
var isSpeedBoost = false;
var speedBoostCounter = 0;
var bullet1DelayTime = 2500;
var bullet2DelayTime = 5500;
var bullet3DelayTime = 50;

var themeMusic;
var bgMusic;
var destroySound;
var bombSound;
var bubbleSound;
var bgAnimated;

var shield;
var isInvincible = false;


// var randomX;
// var randomY;
 var shootKey = "shoot";
 var shootKeyCounter = 0;

 window.onload = function(){
   let gameConfig = {
     type: Phaser.CANVAS,
     width: 1920,
     height: 1080,
     pixelArt: true,
     useTicker: true,
     physics: {
       default: "arcade",
       arcade: {
           gravity: {
             y: 700,
           },
           debug: false
       }
     },
     scene: [preloadGame, startScreen, playGame, gameOverScreen]
   }
   game = new Phaser.Game(gameConfig);
 }
