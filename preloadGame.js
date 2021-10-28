class preloadGame extends Phaser.Scene{
    constructor(){
      super("PreloadGame");
    }
    preload(){
      // load all assets tile sprites
      //this.load.image("bg_1", "assets/bg-1.png");
      //this.load.image("bg_2", "assets/bg-2.png");
      //this.load.image("ground", "assets/ground.png");
      this.load.image('startScreen', 'assets/startScreenImg.png');
      this.load.image('gameOverScreenImg', 'assets/gameOverScreenImg.png');
      this.load.image('startButton', 'assets/startButton.png');

      this.load.image("bg_1", "assets/background1.png");
      this.load.image("bg_2", "assets/background2.png");
      this.load.image("ground1", "assets/ground1.png");
      this.load.image("ground2", "assets/ground2.png");

      this.load.image('ship', 'assets/ship.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.image('obstacle', 'assets/obstacle.png');

      this.load.image('block1', 'assets/blocks/block1.png');
      this.load.image('block2', 'assets/blocks/block2.png');
      this.load.image('block3', 'assets/blocks/block3.png');
      this.load.image('block4', 'assets/blocks/block4.png');
      this.load.image('block5', 'assets/blocks/block5.png');
      this.load.image('block6', 'assets/blocks/block6.png');
      this.load.image('block7', 'assets/blocks/block7.png');
      this.load.image('block8', 'assets/blocks/block8.png');
      this.load.image('block9', 'assets/blocks/block9.png');

      this.load.image('shield', 'assets/shield.png');

      // load scuba diver spritesheet
      this.load.spritesheet("scubaDiver", "assets/scubaDiver.png",{
        frameWidth: 80,
        frameHeight: 80
      });

       // load special scuba diver spritesheet
      this.load.spritesheet("specialScubaDiver", "assets/specialScubaDiver.png",{
        frameWidth: 104,
        frameHeight: 104
      });

      // load turret spritesheet
      this.load.spritesheet("turret", "assets/turret.png",{
        frameWidth: 128,
        frameHeight: 128
      });

      // load explosion spritesheet
      this.load.spritesheet("explosion", "assets/explosion.png",{
        frameWidth: 64,
        frameHeight: 64
      });

      // load bg animation spritesheet
      this.load.spritesheet("bgAnimated", "assets/bgAnimated.png",{
        frameWidth: 1920,
        frameHeight: 1080
      });

      // load player animation spritesheet
      this.load.spritesheet("player_animated", "assets/player_animated.png",{
        frameWidth: 128,
        frameHeight: 76
      });

        this.load.image("player", "assets/spaceship.png");

        this.load.audio('theme', [
          'assets/audios/theme.mp3'
      ]);

      this.load.audio('bgMusic', [
        'assets/audios/bgMusic.mp3'
    ]);
    this.load.audio('bombSound', [
      'assets/audios/bomb.mp3'
  ]);
  this.load.audio('destroySound', [
    'assets/audios/destroy.mp3'
]);
this.load.audio('bubbleSound', [
  'assets/audios/bubbles.mp3'
]);
    }
    
    create(){
      this.scene.start("StartScreen");
    }
}
