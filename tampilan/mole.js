let currMoleTile;
let currFlowerTile;
let score = 0;
let gameOver = false;
const startingSeconds = 30;
let timer = startingSeconds;
let timerStarted = false;

window.onload = function() {
    setGame();
}

function setGame() {
    for(let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    const timerElement = document.getElementById('timer');
    timerElement.innerHTML = `${timer} seconds`;

    setInterval(setMole, 1000);
    setInterval(setFlower, 2000);

}

function updateTimer() {
    if (!timerStarted || gameOver) {
        return;
    }

    const timerElement = document.getElementById('timer');
    timerElement.innerHTML = `${timer} seconds`;
    timer--;

    if (timer <= 0) {
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {

    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML ="";
    }

    let mole = document.createElement("img");
    mole.src = "../img/mole.png";

    let num = getRandomTile();
    if (currFlowerTile && currFlowerTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setFlower() {

    if (gameOver) {
        return;
    }

    if (currFlowerTile) {
        currFlowerTile.innerHTML ="";
    }

    let flower = document.createElement("img");
    flower.src = "../img/flower.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currFlowerTile = document.getElementById(num);
    currFlowerTile.appendChild(flower);
}

function selectTile() {
    
    if (gameOver) {
        return;
    }

    if(!timerStarted) {
        timerStarted = true;
        setInterval(updateTimer, 1000);
    }

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();

        const clickMoleSound = document.getElementById('clickMoleSound');
        clickMoleSound.play();
    }
    else if(this == currFlowerTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;

        const gameOverSound = document.getElementById('gameOverSound');
        gameOverSound.play();
    }
}
