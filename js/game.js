var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var background;
var scoreboard;
var score;
var nextFire = 0;

//variables
var fireRate = 100;

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
	
	//bullets, you shoot these
	game.load.image('bullet1', 'assets/img/player/bullet1.png');
	
	//big boss metalgreymon
	game.load.spritesheet('metalgreymon', 'assets/img/metalgreymon.png',130,140,3,0,0);
}


function create() {

	//reset variables
	score = 0;
	
	//background-color
	game.stage.backgroundColor = "#E0E4F1";

	//background tilesprite (beginningxy, size xy, URL)
	background = game.add.tileSprite(0,0,800,600,'bgIce');
	
	//UI
	//score
	var textstyle = { font: "30px Arial", fill: "#00008B", align: "center"};
	scoreboard = game.add.text(600, 100, "Score: 0", textstyle);

	//create player
	player = game.add.sprite(250,450,'reimu');
	player.animations.add('stand'); //animations
	player.animations.play('stand',5,true);
	
	//bubble?
	bubble1 = game.add.sprite(90,180,'bubbleOrange');
	//animate sprite
	bubble1.animations.add('shine');
	//animation start (name,fps,looping)
	bubble1.animations.play('shine',5,true);
	bubble1.health = 10;
	
	//2nd bubble temporary
	bubble2 = game.add.sprite(350,180,'bubbleOrange');
	bubble2.animations.add('shine');
	bubble2.animations.play('shine',5,true);
	bubble2.health = 10;
	
	
	//add boss
	metalgreymon = game.add.sprite(200,10,'metalgreymon');
	metalgreymon.animations.add('stand');
	metalgreymon.animations.play('stand',5,true);
	metalgreymon.health = 60;
	
	//group all enemies
	baddies = game.add.group();
	baddies.add(bubble1);
	baddies.add(bubble2);
	baddies.add(metalgreymon);
	
	
	//create bullets
	bullets = game.add.group();
	bullets.createMultiple(50, 'bullet1');
	bullets.setAll('outOfBoundsKill', true);
	bullets.setAll('immovable',true);
	//bullets.body.immovable = true;
	
	keyboard = game.input.keyboard; //create keyboard
}

function update(){

	//move player
	playermove();
	
	//bullets fire
	if(game.input.activePointer.isDown) //click
	{
		fire();
	}
	
	//check for bullet hits
	game.physics.overlap(baddies, bullets, overlapEnemyVsBullets, null, this);
	
	
	//background tile update and speed
	background.tilePosition.y += .5;
	
	checkwin();
}

//fires bullets from player
function fire() {
	if(game.time.now > nextFire && bullets.countDead() > 0)
	{
		nextFire = game.time.now+fireRate;
		var bullet = bullets.getFirstDead();
		bullet.reset(player.x,player.y);
		bullet.rotation = game.physics.moveToPointer(bullet,300);
    }

}

//moves player with keyboard
function playermove(){
	var basemovespeed = 120;
	//keyboard control, directions
	if(keyboard.isDown(Phaser.Keyboard.S)) {
		player.body.velocity.y = basemovespeed; //brings sprite down
	} else if (keyboard.isDown(Phaser.Keyboard.W)){
		player.body.velocity.y = -basemovespeed; //brings sprite up
	} else {
	    player.body.velocity.y = 0; //no buttons pressed
	}
	if(keyboard.isDown(Phaser.Keyboard.A)) {
		player.body.velocity.x = -basemovespeed; //brings sprite left
	} else if (keyboard.isDown(Phaser.Keyboard.D)){
		player.body.velocity.x = basemovespeed; //brings sprite up
	} else {
	    player.body.velocity.x = 0; //no buttons pressed
	}
}
	
function addScore(number){
	
	score += number;
	scoreboard.setText("Score: " + score);
}

function overlapEnemyVsBullets(enemy, bullet){
	bullet.kill();
	enemy.damage(1);
	addScore(1);
}

function checkwin(){
	if(baddies.countLiving() === 0){
		var textstyle = { font: "70px Arial", fill: "#00008B", align: "center"};
	    var message = game.add.text(180, 300, "You win!", textstyle);
	}
}