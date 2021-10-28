class gameOverScreen extends Phaser.Scene {
  constructor() {
    super("GameOverScreen");
  }

      create ()
      {
        // Add Start Screen
        gameOverScreenImg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "gameOverScreenImg");
        gameOverScreenImg.setOrigin(0, 0);
        gameOverScreenImg.setScrollFactor(0);
        // startScreenImg.scaleX = 0.8;
        // startScreenImg.scaleY = 0.8;
        gameOverScreenImg.scaleX = 1;
        gameOverScreenImg.scaleY = 1;


    text = this.add.text(860,750,'',{font: '40px Courier', fill: '#ffffff', });
    text.setText([
    'Score: ' + score
  ]);

    text.setScrollFactor(0);


        // Add Start Screen
        //startButton = this.add.tileSprite(650, 600, 250, 100, "startButton");
    //     startButton = this.add.tileSprite(850, 750, 250, 100, "startButton");
    //     startButton.setOrigin(0, 0);
    //     startButton.setScrollFactor(0);
    //       // allow key inputs to control the player
    //     //  this.cursors = this.input.mouse.createCursorKeys();

    //       startButton.setInteractive();

    //       startButton.on('pointerdown', function (pointer) {

    //        startButton.destroy();

    //       isStartClicked = true;


    // });
      }

      // update()
      // {
      //   if(isStartClicked)
      //   {
      //     this.scene.start("PlayGame");
      //   }
      // }
    }
