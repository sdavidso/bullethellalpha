
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    //load with identifier and URL
    game.load.image('einstein', 'assets/img/einstein.jpg');

}


function create() {

	//background
	game.stage.backgroundColor = "#E0E4F1";
	
	//create sprite
    testSprite = game.add.sprite(0, 0, 'einstein');
	//sprite velocity 
	testSprite.body.velocity.y = -10;

	keyboard = game.input.keyboard; //create keyboard
}

function update(){
    //keyboard control, press down button
	if(keyboard.isDown(Phaser.Keyboard.DOWN)) {
		testSprite.body.velocity.y = 20; //brings sprite down
	} else {
		testSprite.body.velocity.y = -10; //but only when pressing down
	}
}