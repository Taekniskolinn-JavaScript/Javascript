"use strict";

var ctx = null;
var tileW = 40, tileH = 40;
var mapW = 40, mapH = 10;

var currentSecond = 0, frameCount = 0, frameLastSecond = 0;
var lastFrameTime = 0;

var keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false
};
var player = new Character();
var gameMap = [
	0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,2,
	0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,2,
	0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,2,
	0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,
	0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,
	0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,2,
	0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,2,
	0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,2,
	0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,
	0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2

];

function Character()
{
	this.tileFrom = [1,1];
	this.tileTo = [1,1];
	this.timeMoved = 0;
	this.dimensions = [30,30];
	this.posistion = [45,45];
	this.delayMove = 700;
}
Character.prototype.placeAt = function(x, y)
{
	this,tileFrom = [x,y];
	this.tileTo = [x,y];
	this.posistion = [((tile.W*x) +
		((tileW-this.dimensions[0])/2)),
		((tileH*y) + ((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0] == this.tileTo[0]&&
		this.tileFrom[1] == this.tileTo[1])
	{
		return false;
	}
	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else
	{
		this.posistion[0] = (this.tileFrom[0]* tileW) +
			((tileW - this.dimensions[0])/2);
		this.posistion[1] = (this.tileFrom[1] * tileH) +
			((tileH - this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) *
				(t - this.timeMoved);
			this.posistion[0] += (this.tileTo[0]< this.tileFrom[0] ?
				0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) *
				(t - this.timeMoved);
			this.posistion[1] += (this.tileTo[1]< this.tileFrom[1] ?
				0 - diff : diff);
		}

		this.posistion[0] = Math.round(this.posistion[0]);
		this.posistion[1] = Math.round(this.posistion[1]);
	}
	return true;
};
function toIndex(x,y)
{
	return ((y * mapW) + x);
}

window.onload = function()
{
	ctx = document.getElementById("game").getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e)
	{
		if(e.keyCode>=37 && e.keyCode<=40)
		{
			keysDown[e.keyCode] = true;
		}
	});
	window.addEventListener("keyup", function(e)
	{
		if(e.keyCode>=37 && e.keyCode<=40)
		{
			keysDown[e.keyCode] = false;
		}
	});	
};
function drawGame()
{
		if(ctx==null) { return; }

		var currentFrameTime = Date.now();
		var timeElapsed = currentFrameTime - lastFrameTime;

		var sec = Math.floor(Date.now()/1000);
		if(sec!=currentSecond)
		{
			currentSecond = sec;
			frameLastSecond = frameCount;
			frameCount = 1;
		}
		else { frameCount++; }
		if(!player.processMovement(currentFrameTime))
		{
			if(keysDown[38] && player.tileFrom[1]>0&&
				gameMap[toIndex(player.tileFrom[0],
					player.tileFrom[1]-1)] == 1)
			{
				player.tileTo[1]-=1;
			}
			else if(keysDown[40] && player.tileFrom[1]<(mapH -1)&&
				gameMap[toIndex(player.tileFrom[0],
					player.tileFrom[1]+1)] == 1)
			{
				player.tileTo[1]+=1;
			}
			else if(keysDown[37] && player.tileFrom[1]>0&&
				gameMap[toIndex(player.tileFrom[0]-1,
					player.tileFrom[1])] == 1)
			{
				player.tileTo[0]-=1;
			}
			else if(keysDown[39] && player.tileFrom[0]<(mapW -1)&&
				gameMap[toIndex(player.tileFrom[0]+1,
					player.tileFrom[1])] == 1)
			{
				player.tileTo[0]+=1;
			}
			if(player.tileFrom[0]!=player.tileTo[0] ||
				player.tileFrom[1] !=player.tileTo[1])
			{
				player.timeMoved = currentFrameTime;
			}
		}

		for(var y = 0; y < mapH; y++)
		{
			for(var x = 0; x < mapW; x++)
			{
				switch(gameMap[((y*mapW)+x)])
				{
					case 0:
							ctx.fillStyle = "#f4d1ff";
							break;
					case 2:
							ctx.fillStyle = "#dcffdi";
							break;
					default:
							ctx.fillStyle ="#ffd1dc";
				}

				ctx.fillRect(x*tileW, y*tileH, tileW,tileH);
			}
		}
		ctx.fillStyle= "#d1fff4";;
		ctx.fillRect(player.posistion[0], player.posistion[1],
			player.dimensions[0], player.dimensions[1]);

		ctx.fillStyle = "#ff0000";
		ctx.fillText = ("FPS: " + frameLastSecond, 10, 20);

		lastFrameTime = currentFrameTime
		requestAnimationFrame(drawGame);


}
/*
var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
/*  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}*/
/*
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
var testBall = new Ball(70, 500, 4, 4, 'pink', 30);
testBall.x
testBall.size
testBall.color
testBall.draw()
/*<meta name="viewport" content="width=device-width, initial-scale=1.0">*/
