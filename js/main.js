'use strict'

const cnvHeight = 400, cnvWidth = 800;
const grassW = 142, grassH = 42;
const playerH = 110, playerW = 100, playerStep = 5;
const leftKey = 37, rightKey = 39, upKey = 38;

const monsterH = 110, monsterW = 100;
let monsterX = cnvWidth - monsterW*2, monsterY = cnvHeight - grassH - monsterH + 10,
		monsterStep = 3, monsterLives = 100;

let canvas, ctx;
let img, grass, playerLeft, playerRight, monsterLeft, monsterRight;

let walkY = cnvHeight - grassH - playerH, playerX = 0, playerY = walkY, playerDamage = 20;
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
	drawBackground();
	drawPlatform();
	drawPlayer();
	drawMonster();
	drawMonsterLives();

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
	
	if (upPressed && rightPressed && playerX + playerW < cnvWidth)
	{
		playerY -= playerStep;
		playerX += playerStep;
	}

	if (upPressed && leftPressed && playerX > 0)
	{
		playerY -= playerStep;
		playerX -= playerStep;
	}

	if (!upPressed && walkY != playerY)
	{
		playerY = walkY;
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
	if (toLeft)
	{
		ctx.drawImage(monsterRight, monsterX, monsterY, monsterW, monsterH);
	} 
	else 
	{
		ctx.drawImage(monsterLeft, monsterX, monsterY, monsterW, monsterH);
	}
}

function drawMonsterLives() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "#4286f4";
	ctx.fillText("Monster lives: " + monsterLives, 10, 50);
}