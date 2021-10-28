class startScreen extends Phaser.Scene {
  constructor() {
    super("StartScreen");
  }

      create ()
      {
        themeMusic = this.sound.add('bgMusic');


        themeMusic.play();
        // Add Start Screen
        startScreenImg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "startScreen");
        startScreenImg.setOrigin(0, 0);
        startScreenImg.setScrollFactor(0);
        // startScreenImg.scaleX = 0.8;
        // startScreenImg.scaleY = 0.8;
        startScreenImg.scaleX = 1;
        startScreenImg.scaleY = 1;

        // Add Start Screen
        //startButton = this.add.tileSprite(650, 600, 250, 100, "startButton");
        startButton = this.add.tileSprite(850, 750, 250, 100, "startButton");
        startButton.setOrigin(0, 0);
        startButton.setScrollFactor(0);
          // allow key inputs to control the player
        //  this.cursors = this.input.mouse.createCursorKeys();

          startButton.setInteractive();

          startButton.on('pointerdown', function (pointer) {

           startButton.destroy();

          isStartClicked = true;


    });
      }

      update()
      {
        if(isStartClicked)
        {
          this.scene.start("PlayGame");          
        }
      }
    }
