'use strict'

const cnvHeight = 400, cnvWidth = 800;
const grassW = 142, grassH = 42;
const playerH = 110, playerW = 100, playerStep = 5;
const leftKey = 37, rightKey = 39, upKey = 38;

const monsterH = 110, monsterW = 100, defaultMonsterStep = 3;
let monsterX = cnvWidth - monsterW*2, monsterY = cnvHeight - grassH - monsterH + 10,
		monsterStep = 3, monsterLives = 100;

let time = performance.now();

let canvas, ctx;
let img, grass, playerLeft, playerRight, monsterLeft, monsterRight;

let walkY = cnvHeight - grassH - playerH, playerX = 0, playerY = walkY, playerDamage = 20,
		playerLives = 100;
let rightPressed = false, leftPressed = false, upPressed = false, toLeft = false, toRight = false;

window.addEventListener('load', () => {
	init();
	draw();

	document.addEventListener('keydown', (e) => {
		if (e.keyCode == rightKey)
		{
			rightPressed = true;
			toRight = true;
			toLeft = false;
		}
		if (e.keyCode == leftKey)
		{
			leftPressed = true;
			toLeft = true;
			toRight = false;
		}
		if (e.keyCode == upKey)
		{
			upPressed = true;
		}
	}, false);

	document.addEventListener('keyup', (e) => {
		if (e.keyCode == rightKey)
		{
			rightPressed = false;
		}
		if (e.keyCode == leftKey)
		{
			leftPressed = false;
		}
		if (e.keyCode == upKey)
		{
			upPressed = false;
		}
	}, false);

}, false);

function init() {
	canvas = document.getElementById("cnv");
	ctx = canvas.getContext('2d');

	img = new Image();
	img.src = "./img/bg.png";

	grass = new Image();
	grass.src = "./img/grass.png";

	playerLeft = new Image();
	playerLeft.src = "./img/playerL.png";

	playerRight = new Image();
	playerRight.src = "./img/playerR.png";
	
	monsterLeft = new Image();
	monsterLeft.src = "./img/monsterL.png";

	monsterRight = new Image();
	monsterRight.src = "./img/monsterR.png";
}

function draw() {
	if (playerLives <= 30) ctx.globalAlpha = 0.5;
	drawBackground();
	drawPlatform();
	drawPlayer();
	drawMonster();
	drawMonsterLives();
	drawPlayerLives();
	printTime();

	if (rightPressed && playerX + playerW < cnvWidth)
	{
		playerX += playerStep;
	}
	else if (leftPressed && playerX > 0)
	{
		playerX -= playerStep;
	} 

	if (upPressed)
	{
		playerY -= playerStep;
	}
	
	if (upPressed && rightPressed && playerX + playerW < cnvWidth && playerY < cnvHeight + playerH)
	{
		playerY -= playerStep;
		playerX += playerStep;
	}

	if (upPressed && leftPressed && playerX > 0 )
	{
		playerY -= playerStep;
		playerX -= playerStep;
	}

	if (!upPressed && walkY != playerY)
	{
		playerY = walkY;
	}

	if (monsterX > playerX)
	{
		monsterStep = -defaultMonsterStep;
	}
	else if (monsterX < playerX)
	{
		monsterStep = defaultMonsterStep;
	}

	if (monsterX + monsterW < cnvWidth && monsterX > 0) monsterX += monsterStep;
	
	if (playerLives > 0 && monsterLives > 0)
	{
		if (playerX >= monsterX && playerX <= monsterX + monsterW && playerY >= grassH + monsterH && playerY <= grassH + monsterH + 20)
		{
			monsterLives -= 10;
		} 
		else if (playerX + playerW >= monsterX && playerX <= monsterX + monsterW && playerY >= grassH + monsterH) 
		{
			playerLives -= 7;
			ctx.save();
			doRed();
			setTimeout(() => { ctx.reset(); }, 5000);
		}
	}
	else {
		if (monsterLives <= 0)
		{
			Win();
		} else {
			Loose();
		}
	}

	requestAnimationFrame(draw);
}

function drawBackground() {
	ctx.beginPath();
	ctx.drawImage(img, 0, 0);
	ctx.closePath();
}

function drawGrass(x, y) {
	ctx.beginPath();
	ctx.drawImage(grass, x, y);
	ctx.closePath();
}

function drawPlatform() {
	let x = 0;
	for (var i = 0; i < 6; i++) {
		drawGrass(x, cnvHeight - grassH);
		x += grassW;
	}

	x = 0;
}

function drawPlayer() {
	if (toLeft)
	{
		ctx.drawImage(playerLeft, playerX, playerY, playerW, playerH);
	}
	else
	{
		ctx.drawImage(playerRight, playerX, playerY, playerW, playerH);
	}
}

function drawMonster() {
	if (toRight && playerX > monsterX)
	{
		ctx.drawImage(monsterRight, monsterX, monsterY, monsterW, monsterH);
	} 
	else if (toLeft && playerX < monsterX)
	{
		ctx.drawImage(monsterLeft, monsterX, monsterY, monsterW, monsterH);
	} else {
		ctx.drawImage(monsterLeft, monsterX, monsterY, monsterW, monsterH);
	}
}

function drawMonsterLives() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "#4286f4";
	ctx.strokeText("Monster lives: " + monsterLives, 10, 50);
	ctx.fillText("Monster lives: " + monsterLives, 10, 50);
}

function drawPlayerLives() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	ctx.strokeText("Your lives: " + playerLives, cnvWidth / 1.35, 50);
	ctx.fillText("Your lives: " + playerLives, cnvWidth / 1.35, 50);
}

function doRed() {
	ctx.beginPath();
	ctx.rect(0, 0, cnvWidth, cnvHeight);
	ctx.fillStyle = "rgb(255, 0, 0, .4)";
	ctx.fill();
	ctx.closePath();
}

function Loose() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	ctx.strokeText("You LOOSER ", cnvWidth / 2 - 100, cnvHeight / 2);
	ctx.fillText("You LOOSER ", cnvWidth / 2 - 100, cnvHeight / 2);
}

function Win() 
{
	ctx.font = "30px Arial";
	ctx.fillStyle = "green";
	ctx.strokeText("You win!! ", cnvWidth / 2 - 100, cnvHeight / 2);
	ctx.fillText("You win!!", cnvWidth / 2 - 100, cnvHeight / 2);
}

function printTime() 
{
	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.strokeText((performance.now() - time) / 1000 + " s", cnvWidth / 2 - 60, 50);
	ctx.fillText((performance.now() - time) / 1000 + " s", cnvWidth / 2 - 60, 50);
}