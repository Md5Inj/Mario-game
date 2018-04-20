'use strict'

const cnvHeight = 400, cnvWidth = 800;
const grassW = 142, grassH = 42;
const playerH = 110, playerW = 100, playerStep = 5;
const leftKey = 37, rightKey = 39, upKey = 38;


let canvas, ctx;
let img, grass, playerLeft, playerRight;

let walkY = cnvHeight - grassH - playerH, playerX = 0, playerY = walkY;
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
		else if (e.keyCode == leftKey)
		{
			leftPressed = false;
		}
		else if (e.keyCode == upKey)
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
}

function draw() {
	drawBackground();
	drawPlatform();
	drawPlayer();

	if (rightPressed && playerX + playerW < cnvWidth)
	{
		playerX += playerStep;
	}
	else if (leftPressed && playerX > 0)
	{
		playerX -= playerStep;
	} 
	else if (upPressed)
	{
		playerY += 10;
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
		ctx.drawImage(playerLeft, playerX, walkY, playerW, playerH);
	}
	else
	{
		ctx.drawImage(playerRight, playerX, walkY, playerW, playerH);
	}
}