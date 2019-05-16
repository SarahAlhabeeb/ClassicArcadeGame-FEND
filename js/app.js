'use strict';

//Text displayed when player collides with enemy
const LOSETEXT = "Oops";

//Text displayed when player wins the game
const WINTEXT = "YOU WON!";

//Enemy class for all enemies in the game
class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > 505) {
            this.x = -50;
            // updating the speed randomly 
            this.speed = 100 + Math.floor(Math.random() * 5);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

//Player entity that could move one block
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // if the player overlap an enemy, a text will apear
        if (checkCollision()) {
            ctx.fillStyle = 'black';
            ctx.font = "30px Arial";
            ctx.fillText(LOSETEXT, 505 / 3, this.y - 90 / 5.5);
        }

        // if the player wins, a text will apear
        if (this.win()) {
            ctx.fillStyle = 'black';
            ctx.font = "30px Arial";
            ctx.fillText(WINTEXT, 505 / 3, this.y + 200);
        }
    }

    // Handles key presses by calling the proper function
    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'left': this.moveLeft(); break;
            case 'up': this.moveUp(); break;
            case 'right': this.moveRight(); break;
            case 'down': this.moveDown(); break;
        }
    }

    moveRight() {
        if (this.x < 405)
            this.x += 102;
    }

    moveLeft() {
        if (this.x > 0)
            this.x -= 102;
    }

    moveUp() {
        if (this.y > 0)
            this.y -= 83;

        if (this.y < 70) {
            this.reset();
        }
    }

    moveDown() {
        if (this.y != 402)
            this.y += 83;
    }

    // Checks if the player reaches the water
    win() {
        if (this.y < 70) {
            return true;
        }
        else
            return false;
    }

    reset() {
        setTimeout(() => {
            this.x = 202;
            this.y = 402;
        }, 300);
    }
}


//Creates a player and enemies
let player;
let allEnemies = [];

function newGame() {
    player = new Player(202, 402);
    allEnemies = [
        new Enemy(10, 50, 183),
        new Enemy(300, 140, 183),
        new Enemy(40, 230, 183),
        new Enemy(200, 310, 183)
    ];
}

// Start the game
newGame();

// Checks for collisions between the player and the enemies
// Returns true if the player overlaps an enemy
function checkCollision() {
    let enemy;
    for (enemy of allEnemies) {
        if (player.x < enemy.x + 80 &&
            player.x + 80 > enemy.x &&
            player.y < enemy.y + 60 &&
            60 + player.y > enemy.y) {
            // Resetting the player's location after collision
            player.reset();
            return true;
        }

    }

}

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

