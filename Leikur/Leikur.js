"use strict";
var tileAtlas = new Array();
imgArray[1] = new Image();
imgArray[1].src = 'pink.jpg';

context.drawImage(atlasImage, 192, 0, 64, 64, 128, 320, 64, 64);
var index = row * map.cols + column;
var map = {
  cols: 8,
  rows: 8,
  tsize: 64,
  tiles: [
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 
    0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 
    0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,
    0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
    0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0
  ],
  getTile: function(col, row) {
    return this.tiles[row * map.cols + col]
  }
};
for (var c = 0; c < map.cols; c++) {
  for (var r = 0; r < map.rows; r++) {
    var tile = map.getTile(c, r);
    if (tile !== 0) { // 0 => empty tile
      context.drawImage(
        tileAtlas, // image
        (tile - 1) * map.tsize, // source x
        0, // source y
        map.tsize, // source width
        map.tsize, // source height
        c * map.tsize, // target x
        r * map.tsize, // target y
        map.tsize, // target width
        map.tsize // target height
      );
    }
  }
}
var startCol = Math.floor(this.camera.x / map.tsize);
    var endCol = startCol + (this.camera.width / map.tsize);
    var startRow = Math.floor(this.camera.y / map.tsize);
    var endRow = startRow + (this.camera.height / map.tsize);
var offsetX = -this.camera.x + startCol * map.tsize;
    var offsetY = -this.camera.y + startRow * map.tsize;
for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(c, r);
            var x = (c - startCol) * map.tsize + offsetX;
            var y = (r - startRow) * map.tsize + offsetY;
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
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
