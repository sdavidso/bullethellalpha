
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    //load with identifier and URL
    game.load.image('einstein', 'assets/img/einstein.jpg');

}


function create() {
    //create sprite
    game.add.sprite(0, 0, 'einstein');

}
