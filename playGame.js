class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  create() {

    destroySound = this.sound.add('destroySound');
    bombSound = this.sound.add('bombSound');
    bubbleSound = this.sound.add('bubbleSound');

    // create an tiled sprite with the size of our game screen
    //bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
    // Set its pivot to the top left corner
    //bg_1.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    //bg_1.setScrollFactor(0);
    // Add a second background layer. Repeat as in bg_1

    // bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
    // bg_2.setOrigin(0, 0);
    // bg_2.setScrollFactor(0);

    //create an animation for the background
    bgAnimated = this.add.sprite(game.config.width, game.config.height, 'bgAnimated');
    bgAnimated.x = 960;
    bgAnimated.y = 540;
    bgAnimated.setScrollFactor(0);
    
    this.anims.create({
      key: "bgShine",
      frames: this.anims.generateFrameNumbers("bgAnimated"),
      frameRate: 3,
      repeat: -1
    });
    
    bgAnimated.play("bgShine");
    //end animation

    // // add the ground layer which is only 48 pixels tall
    // ground2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "ground2");
    // ground2.setOrigin(0, 0);
    // ground2.setScrollFactor(0);
    // // sinc this tile is shorter I positioned it at the bottom of he screen
    // ground2.y = 150;

    // ground1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "ground1");
    // ground1.setOrigin(0, 0);
    // ground1.setScrollFactor(0);
    // // // sinc this tile is shorter I positioned it at the bottom of he screen
    // ground1.y = -50;

    var fuelText = this.add.text(270, 70, 'Fuel', { font: '26px Courier', fill: '#000000' });
    fuelText.setScrollFactor(0);


    this.data.set('score', 0);
    this.data.set('fuel', 1000);
    text = this.add.text(1480,10,'',{font: '40px Courier', fill: '#000000', });
    text.setText([
    'Score: ' + this.data.get('score')
  ]);

    text.setScrollFactor(0);


    this.player = this.physics.add.sprite(600, 350, "player_animated");
    this.player.scaleX = 0.8;
    this.player.scaleY = 0.8;

    this.player.body.allowGravity = false;

    this.anims.create({
      key: "playerAnimation",
      frames: this.anims.generateFrameNumbers("player_animated"),
      frameRate: 10,
      repeat: -1
    });
    this.player.play("playerAnimation");


    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();
    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 10, game.config.height);
    // making the camera follow the player
    this.myCam.startFollow(this.player);

    this.debug = this.add.graphics();
    this.debug.setScrollFactor(0);

    //this.spawnBlockLevel();
    this.spawnBlockLevel();
    this.spawnNewTurrets();
    this.spawnNewScubaDivers();
    this.spawnSpecialScubaDivers();
    this.spawnObstacles();
  }

  onEvent ()
  {
      

      if(speedBoostCounter >= 300)
      {
        
        isSpeedBoost = false;
        isInvincible = false;
        speedBoostCounter = 0;
      }
      else
      {
        console.log("speedBoostCounter : " + speedBoostCounter);
        speedBoostCounter++;
      }
  }
   
    shootBulletEvent (turretPosX, turretPosY)
    {
      //console.log("bullet fired...");
  
      isShoot = false;
      bullet = this.physics.add.sprite(turretPosX , turretPosY, 'bullet');
      bullet.setVelocityY(-100);
      bullet.body.allowGravity = false;

      this.physics.add.collider(this.player, bullet, this.GameOver, null, this);      
    }

    shootBullet2Event (turretPosX, turretPosY)
    {
      //console.log("bullet fired...");
  
      isShoot2 = false;
      bullet = this.physics.add.sprite(turretPosX , turretPosY, 'bullet');
      bullet.setVelocityY(-100);
      bullet.body.allowGravity = false;
       
       this.physics.add.collider(this.player, bullet, this.GameOver, null, this);
    }

    shootBullet3Event (turretPosX, turretPosY)
    {
      //console.log("bullet fired...");
  
      isShoot3 = false;
      bullet = this.physics.add.sprite(turretPosX , turretPosY, 'bullet');
      bullet.setVelocityY(-400);
      bullet.body.allowGravity = false;

       this.physics.add.collider(this.player, bullet, this.GameOver, null, this);
    }

    shootDelayEvent1()
    {
      isShoot = true;
    }

    shootDelayEvent2()
    {
      isShoot2 = true;
    }

    shootDelayEvent3()
    {
      isShoot3 = true;
    }

    speedBoost()
    {
      isSpeedBoost = true;
    }


  randomNumber(min, max)
  {
    const r = Math.random()*(max-min) + min;
    return Math.floor(r);
  }



depleteFuel()
{
  if(fuel <= 0)
  {
    this.GameOver();
  }
  else{
fuel -= 0.2;

  this.data.set('fuel', fuel);

  text.setText([
  'Score: ' + this.data.get('score')
]);

  text.setScrollFactor(0);
}
}

 depleteFuelByBombs()
{
  if(fuel <= 0)
  {
    this.GameOver();
  }
  else{
fuel -= 50;

  this.data.set('fuel', fuel);

  text.setText([
  'Score: ' + this.data.get('score')
]);

  text.setScrollFactor(0);
}
}

addFuel()
{
  isScubaCollected =  true;

if(fuel < 1000)
{
fuel += 5;
}

  this.data.set('fuel', fuel);

  text.setText([
  'Score: ' + this.data.get('score')
]);

  text.setScrollFactor(0);
    isScubaCollected =  false;
}

addScore()
{
  score += 1;
  console.log("score : " + score);
  this.data.set('score', score);

    text.setText([
    'Score: ' + this.data.get('score')
  ]);

    text.setScrollFactor(0);
}

  spawnTurret(posX, posY)
  {
    var animKey = "";
    shootKeyCounter++;
    animKey = shootKey+shootKeyCounter;
    //add turret
    // turrets = this.physics.add.group({
    //   //  key: 'shoot'
    // });
    turretX += 700;
    turret = this.physics.add.sprite(posX , posY, 'turret');


    //turrets = this.physics.add.sprite(Phaser.Math.Between(2000, 5000), Phaser.Math.Between(600, 700), 'bullet');
    turret.scaleX = 2;
    turret.scaleY = 2;
    turret.body.allowGravity = false;

    //create an animation for the turret
    this.anims.create({
      key: "turret",
      frames: this.anims.generateFrameNumbers("turret"),
      frameRate: 25,
      repeat: -1
    });
    turret.play("turret");
    isTurretSpawn = true;
    return turret;
  }

  spawnScubaDivers()
  {
    //add turret
    scubaDivers = this.physics.add.group({
        //key: 'scuba'
    });
    scubaDiverX += 1100;
    scubaDivers = this.physics.add.sprite(scubaDiverX , Phaser.Math.Between(400, 600), 'scubaDiver');
    scubaDivers.scaleX = 0.5;
    scubaDivers.scaleY = 0.5;

    scubaDivers.body.allowGravity = false;

    this.anims.create({
      key: "scubaFloat",
      frames: this.anims.generateFrameNumbers("scubaDiver"),
      frameRate: 25,
      repeat: -1
    });
    //this.play("scubaFloat");

    this.physics.add.collider(this.player, scubaDivers);

   // this.physics.add.overlap(this.player, scubaDivers, this.CollectScubaDivers, null, this);

    isScubaSpawn = true;
  }


  spawnNewScubaDivers()
  {
    scubaDivers = this.physics.add.group({
    key:"scuba",
    allowGravity: false,
    scaleX: '2',
    scaleY: '2'
  });

  for(var i=0; i<= 10; i++){

       scubaDivers.create(scubaDiver1X + scubaDiverOffsetX, Phaser.Math.Between(400, 600), 'scubaDiver');
       scubaDivers.create(scubaDiver2X + scubaDiverOffsetX, Phaser.Math.Between(400, 600), 'scubaDiver');
       scubaDivers.create(scubaDiver3X + scubaDiverOffsetX, Phaser.Math.Between(400, 600), 'scubaDiver');
       scubaDiverOffsetX += 1800;
              //  Create an animation with 5 frames
              this.anims.create({ key: 'scuba', frames: this.anims.generateFrameNumbers('scubaDiver',{ frames: [0, 1, 2, 3, 4] }) , repeat: -1, frameRate :8} );
              scubaDivers.playAnimation('scuba');

    this.physics.add.collider(this.player, scubaDivers, this.CollectScubaDivers);
   }
  }

  spawnSpecialScubaDivers()
  {
    specialScubaDivers = this.physics.add.group({
    key:"specialScuba",
    allowGravity: false,
    scaleX: '2',
    scaleY: '2'
  });

  for(var i=0; i<= 10; i++){

    specialScubaDivers.create(specialScubaDiver1X + sepcialScubaDiverOffsetX, Phaser.Math.Between(400, 600), 'specialScubaDiver');
    //specialScubaDivers.create(specialScubaDiver2X + sepcialScubaDiverOffsetX, Phaser.Math.Between(400, 600), 'specialScubaDiver');
    //specialScubaDivers.create(specialScubaDiver3X + sepcialScubaDiverOffsetX, Phaser.Math.Between(400, 600), 'specialScubaDiver');
    sepcialScubaDiverOffsetX += 3000;
              //  Create an animation with 5 frames
              this.anims.create({ key: 'specialScuba', frames: this.anims.generateFrameNumbers('specialScubaDiver',{ frames: [0, 1, 2, 3, 4] }) , repeat: -1, frameRate :8} );
              specialScubaDivers.playAnimation('specialScuba');

    this.physics.add.collider(this.player, specialScubaDivers, this.CollectSpecialScubaDivers);
   }
  }

  spawnObstacles()
  {
      obstacles = this.physics.add.group({
      key:"obstacle",
      allowGravity: false,     
  });
     
  for(var i=0; i<= 10; i++){
    
  obstacles.create(obstacle1X + obstacleXOffset, Phaser.Math.Between(400, 600), 'obstacle');
  obstacles.create(obstacle2X + obstacleXOffset, Phaser.Math.Between(400, 600), 'obstacle');
  obstacles.create(obstacle3X + obstacleXOffset, Phaser.Math.Between(400, 600), 'obstacle');
  obstacleXOffset += 2500;

  this.physics.add.collider(this.player, obstacles, () => {if(!isInvincible){this.player.destroy(); isGameOver = true;
    this.CreateExplosion(this.player.x, this.player.y), fuel = 0, this.scene.start("GameOverScreen");}});

    //this.physics.add.collider(bombs, obstacles, this.DestroyObstacles());
  }
}


  spawnBlockLevel()
  {
    blocksGroup = this.physics.add.group({
    key:"block1",
    allowGravity: false
  });
      for(var i=0; i<= 10; i++){       

       blocksGroup.create(blockGroup1X + blockGroupXOffset, blockGroup1Y, 'block1');
       blocksGroup.create(blockGroup2X + blockGroupXOffset, blockGroup2Y, 'block2');
       blocksGroup.create(blockGroup3X + blockGroupXOffset, blockGroup3Y, 'block3');
       blocksGroup.create(blockGroup4X + blockGroupXOffset, blockGroup4Y, 'block4');
       blocksGroup.create(blockGroup5X + blockGroupXOffset, blockGroup5Y, 'block5');
       blocksGroup.create(blockGroup6X + blockGroupXOffset, blockGroup6Y, 'block6');
       blocksGroup.create(blockGroup7X + blockGroupXOffset, blockGroup7Y, 'block7');
       blocksGroup.create(blockGroup8X + blockGroupXOffset, blockGroup8Y, 'block8');
       blocksGroup.create(blockGroup9X + blockGroupXOffset, blockGroup9Y, 'block9');
       blockGroupXOffset  += 1760;

     this.physics.add.collider(this.player, blocksGroup, () => {if(!isInvincible) {this.player.destroy();
       isGameOver = true;
       this.CreateExplosion(this.player.x, this.player.y), fuel = 0, this.scene.start("GameOverScreen");}});
      }
  }

  spawnNewTurrets()
  {
    turrets = this.physics.add.group({
    key:"turretsNew",
    allowGravity: false,
  });

  for(var i=0; i<= 10; i++){
       //turretPosX += 1500;
       turrets.create(turret1PosX + turretGroupXOffset, blockGroup2Y - 130, 'turret');         
       turrets.create(turret2PosX + turretGroupXOffset, blockGroup6Y - 180, 'turret');      
       turrets.create(turret3PosX + turretGroupXOffset, blockGroup9Y - 70, 'turret');
    
       turretGroupXOffset += 1760;
              //  Create an animation with 5 frames
              this.anims.create({ key: 'turret', frames: this.anims.generateFrameNumbers('turret',{ frames: [0, 1, 2, 3, 4, 5, 6, 7] }) , repeat: -1, frameRate :25} );
              turrets.playAnimation('turret');

      this.physics.add.collider(this.player, turrets, () => {this.player.destroy(); isGameOver = true;
      this.CreateExplosion(this.player.x, this.player.y), fuel = 0, this.scene.start("GameOverScreen");});
    }
  }


  GameOver (player, bullet)
  { 
    if(!isInvincible)
    {
    fuel = 0;
    this.CreateExplosion(this.player.x, this.player.y);
     this.player.disableBody(true, true);
     isGameOver = true;
     this.scene.start("GameOverScreen");
    }
  }

  DestroyTurret(bomb, turret)
  {
    this.isShoot = false;
    bullet3DelayTime = 100000000;

    
    console.log("turret destroyed " + turret.x);
    console.log("bomb destroyed " + bomb);

    //console.log("this turret " + turret.name);
    turret.disableBody(true, true);
    this.CreateExplosion(turret.x, turret.y);
  }

  DestroyObstacles(bomb, obstacle)
  {
    fuel = 0;

    //console.log("this turret " + turret.name);
    obstacle.disableBody(true, true);
    this.CreateExplosion(obstacle.x, obstacle.y);
  }

  CollectScubaDivers(player, scubaDiver)
  {
    console.log("scuba diver collected : " + scubaDiver.x);
    isScubaCollected = true;
    fuel += 15;
    score += 10;

    console.log("fuel value : " + fuel);
     
    this.SetScore;

    scubaDiver.disableBody(true, true);
  }

  CollectSpecialScubaDivers(player, specialScubaDiver)
  {  
    isSpecialScubaCollected = true;
    isInvincible = true;
    fuel += 15;
    score += 10;

    console.log("sepcial scuab collected");
     
    this.SetScore;

    isSpeedBoost = true;

    specialScubaDiver.disableBody(true, true);

    //shield = shield.add.sprite(this.player.x , this.player.y, 'shield');
  }

  SetScore()
  {
    this.data.set('score', score);
    this.data.set('fuel', fuel);

    text.setText([
    'Score: ' + this.data.get('score')
  ]);

    text.setScrollFactor(0);
  }

  CreateExplosion(ExplosionPosX, ExplosionPosY)
  {
    destroySound.play();
    console.log("Explosion made !!!");

    explosion = this.add.sprite(ExplosionPosX , ExplosionPosY, 'explosion');

   // this.explosion.body.allowGravity = false;

    //create an animation for the turret
    this.anims.create({
      key: "explosionKey",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 25,
      repeat: 2
    });
    explosion.play("explosionKey");
    //isTurretSpawn = true;
    return explosion;
  }

  update() {
            size = fuel/2;
                       
            this.debug.fillStyle(0x2d2d2d);
            this.debug.fillRect(64, 30, 500, 32);

            if(fuel <= 700 && fuel >= 300)
            {
              this.debug.fillStyle(0xffff00);
            }
            else if(fuel <= 300)
            {
              this.debug.fillStyle(0xff0000);
            }
            else{
            this.debug.fillStyle(0x2dff2d);
            }
            this.debug.fillRect(64, 30, size, 32);

     if(!isGameOver && !isSpeedBoost){
     this.player.x += 1;
     }
     else
     {
      this.player.x += 8;
     }
    //this.player.scaleX = -1;
    // move the player when the arrow keys are pressed

   if (this.cursors.left.isDown && this.player.x > 0) {
     this.player.x -= 2;
      //this.player.scaleX = 1;
   } else if (this.cursors.right.isDown) {//&& this.player.x < game.config.width * 3) {
     this.player.x += 2;
     //this.player.scaleX = -1;
    }

     if (this.cursors.up.isDown && this.player.y > 0) {
      this.player.y -= 2;
      //this.player.scaleY = -1;
    }
    else if (this.cursors.down.isDown && this.player.y > 0) {
      this.player.y += 2;
    }

    if (this.input.keyboard.checkDown(this.cursors.space, 2500))
    {
       
       console.log("space pressed....");
       bombSound.play();
    //else if (this.cursors.space.isDown) {
      this.depleteFuelByBombs();
      bombs = this.physics.add.group({
          key: 'bomb'
      });
      let bomb = this.physics.add.sprite(this.player.x , this.player.y, 'bomb');
      bomb.scaleX = 1;
      bomb.scaleY = 1;
      bomb.setVelocityX(500);

      this.physics.add.collider(bomb, turrets,  this.DestroyTurret, null, this);
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
    //bg_1.tilePositionX = this.myCam.scrollX * .3;
    //bg_2.tilePositionX = this.myCam.scrollX * .6;
    //ground1.tilePositionX = this.myCam.scrollX;
    //ground2.tilePositionX = this.myCam.scrollX;

   if(isShoot)
   {
   timedEvent = this.time.delayedCall(500, this.shootBulletEvent(turret1PosX, blockGroup2Y - 100), [], this);

   //timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret3PosX, blockGroup9Y - 45), [], this);
   //timedEvent = this.time.delayedCall(1200, this.shootBulletEvent(turret1PosX + 1760, blockGroup9Y - 100), [], this);
   timedEvent = this.time.delayedCall(500, this.shootBulletEvent(turret2PosX + 1760, blockGroup9Y - 150), [], this);
   //timedEvent = this.time.delayedCall(3500, this.shootBulletEvent(turret3PosX + 1760, blockGroup9Y - 45), [], this);
   
   //timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret2PosX + 3520, blockGroup9Y - 150), [], this);
   //timedEvent = this.time.delayedCall(1800, this.shootBulletEvent(turret3PosX + 3520, blockGroup9Y - 45), [], this);
   timedEvent = this.time.delayedCall(1500, this.shootBulletEvent(turret1PosX + 5280, blockGroup9Y - 100), [], this);
   timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret2PosX + 5280, blockGroup9Y - 150), [], this);
   timedEvent = this.time.delayedCall(1800, this.shootBulletEvent(turret3PosX + 5280, blockGroup9Y - 45), [], this);
   timedEvent = this.time.delayedCall(1500, this.shootBulletEvent(turret1PosX + 7040, blockGroup9Y - 100), [], this);
   //timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret2PosX + 7040, blockGroup9Y - 150), [], this);
   //timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret3PosX + 7040, blockGroup9Y - 45), [], this);
  
   timedEvent = this.time.delayedCall(bullet1DelayTime, this.shootDelayEvent1, [], this);
   }

   if(isShoot2)
   {
   timedEvent = this.time.delayedCall(500, this.shootBullet2Event(turret2PosX, blockGroup6Y - 150), [], this);
   timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret3PosX, blockGroup9Y - 45), [], this);
   timedEvent = this.time.delayedCall(1200, this.shootBulletEvent(turret1PosX + 1760, blockGroup9Y - 100), [], this);
   timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret2PosX + 3520, blockGroup9Y - 150), [], this);
   timedEvent = this.time.delayedCall(1800, this.shootBulletEvent(turret3PosX + 3520, blockGroup9Y - 45), [], this);
   timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret2PosX + 7040, blockGroup9Y - 150), [], this);
   timedEvent = this.time.delayedCall(900, this.shootBulletEvent(turret3PosX + 7040, blockGroup9Y - 45), [], this);
   timedEvent = this.time.delayedCall(3500, this.shootBulletEvent(turret3PosX + 1760, blockGroup9Y - 45), [], this);
   
   
   
   
   
   timedEvent = this.time.delayedCall(bullet2DelayTime, this.shootDelayEvent2, [], this);
   }

   if(isShoot3)
   {
    timedEvent = this.time.delayedCall(1500, this.shootBullet3Event(turret1PosX + 3520, blockGroup9Y - 200), [], this);
    timedEvent = this.time.delayedCall(bullet3DelayTime, this.shootDelayEvent3, [], this);
   }

  //  if(isTurretSpawn)
  //  {
  //    isTurretSpawn = false;
  //    timedEvent = this.time.delayedCall(500, this.spawnTurret, [], this);
  //  }

  //  if(isScubaSpawn)
  //  {
  //    isScubaSpawn = false;
  //    timedEvent = this.time.delayedCall(800, this.spawnScubaDivers, [], this);
  //  }
  
   if(isScubaCollected)
   {
   timedEvent = this.time.delayedCall(500, this.addFuel, [], this);
   }

   if(!isGameOver)
   {
   timedEvent = this.time.delayedCall(500, this.addScore, [], this);
   }

   //timedEvent = this.time.delayedCall(500, this.spawnBlockLevel, [], this);

   //timedEvent = this.time.delayedCall(500, this.spawnNewTurrets, [], this);

   timedEvent = this.time.delayedCall(500, this.depleteFuel, [], this);

  if(isSpeedBoost){
    timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
  }

  }
}
