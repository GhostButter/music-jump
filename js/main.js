console.log(Phaser)

//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = 0;


var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/background.png');
  game.load.image("coin", 'assets/coin.png');
  game.load.image('player', 'assets/shrek.jpg');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.image('obstacle', 'assets/wallVertical.png');
  game.load.audio("jump","music/jump.mp3");
  game.load.audio("coin","music/coin.mp3");
  //If you'd like to load music files, the format would look like  game.load.audio('[name of music]', ['[location for music file]']);
};

function create(){
	music = game.add.audio("jump");
	music = game.add.audio("coin");
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = "#3468db";
	platforms = game.add.group();
	platforms.enableBody = true;
	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4,1)
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
	player = game.add.sprite(50,400, 'player');
	coin = game.add.sprite(500,500, 'coin');
	game.physics.arcade.enable(player);
	game.physics.arcade.enable(coin  );
//This creates the player character at the bottom left side of the screen
  //This creates the first obstacle on the right side of the screen.
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;
	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(1,0.2);
	obstacle.anchor.setTo(0,1);
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  //This sets up a group call platfroms. for future funtionalitywe can set all horizontial surface to this group
};

function update(){

game.physics.arcade.collide(player, ground);
game.physics.arcade.collide(player, obstacle);
game.physics.arcade.overlap(player, coin, collectCoin, null, this);
	if (spaceKey.isDown&& player.body.touching.down) {
	player.body.velocity.y = -300; 	
	music.play();

	};
	if (obstacle.x < 5 && player.x > 5) {
		score++;
		scoreText.text = "score " + score;
	};
	if (obstacle.x > 600) {
		obstacle.x -=0.5;

	};
	if (coin.x > 1) {
		console.log("coin")
		coin.x -=0.25;
	};

	if (obstacle.x < 0) {
		obstacle.kill();
		obstacle = game.add.sprite(900, GAME_HEIGHT, "obstacle");
		obstacle.scale.setTo(1,0.2);
		obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(obstacle);
		obstacle.body.immovable = true;
	};
	
	if (player.x < 0) {
		scoreText = game.add.text(350, 200, "You Lose!", {fill: "ff0000"});
	};
	function collectCoin (player, coin) {
		console.log("hi")
		// Removes the star from the screen
		coin.kill();
		createCoin( )
		music.play() 
	}
	function createCoin(){
		coin = game.add.sprite(700,800, "coin");
		coin.scale.setTo(1,1);
		coin.anchor.setTo(10,10);
		game.physics.arcade.enable(coin);
		coin.body.immovable = true;
	}
	if (coin.x < 0) {
		createCoin()
	}
 };
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();
