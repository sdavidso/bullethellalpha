var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var background;

function preload() {
    //load with identifier and URL
    game.load.image('einstein', 'assets/img/einstein.jpg');

	//spritesheet: name,url,width,height,margin,spacing
	game.load.spritesheet('bubbleOrange', 'assets/img/bubbleOrange.png',32,32,6,0,0);
	
	//game.load.atlasJSONArray('bubbleA','assets/img/ssBubble.png','assets/img/sprite2a.json');
	
	//load background tile
	game.load.image('bgIce', 'assets/img/bg/bgIceSquareMd.png');

	//load player
	//game.load.image('reimu', 'assets/img/player/reimu1.png');
	game.load.spritesheet('reimu', 'assets/img/player/reimu1.png',32,50,4,0,0);
}


function create() {

	//background-color
	game.stage.backgroundColor = "#E0E4F1";

	//background tilesprite (beginningxy, size xy, URL)
	background = game.add.tileSprite(0,0,800,600,'bgIce');



	//create player
	player = game.add.sprite(250,400,'reimu');
	player.animations.add('stand'); //animations
	player.animations.play('stand',5,true);
	
	//bubble?
	bubble1 = game.add.sprite(250,10,'bubbleOrange');
	//animate sprite
	bubble1.animations.add('shine');
	//animation start (name,fps,looping)
	bubble1.animations.play('shine',5,true);
	
	keyboard = game.input.keyboard; //create keyboard
}

function update(){
    //keyboard control, press down button
	if(keyboard.isDown(Phaser.Keyboard.DOWN)) {
		bubble1.body.velocity.y = 20; //brings sprite down
	} else {
		bubble1.body.velocity.y = 0; //but only when pressing down
	}
	
	//background tile update and speed
	background.tilePosition.y -= .5;
}
