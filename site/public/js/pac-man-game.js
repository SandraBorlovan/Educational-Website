var scl = 40;
var maze;
var button;
var maxNoParts = 4;

function setNoParts(no){
  maxNoParts = no;
}


function setup(){//has to be added as an event
  var width = document.getElementById("myPacmanGame").offsetWidth;
  var height = document.getElementById("myPacmanGame").offsetHeight;

  var myCanvas = createCanvas(width, height);
  myCanvas.parent("myPacmanGame");

  maze = new Maze();
  maze.initialize();

  // button = createButton('Start/Reset');
  // button.position(0, height+scl);
  // button.mousePressed(reset);

}

function draw() {
  background(0);
  maze.update();
  maze.show();
}

function reset() {
  maze.start();
}

function displayLostMessage(){
  push();
  fill(color(0, 0, 255));
  rect(4*scl, 3*scl, 9*scl, 5*scl);

  textSize(20);
  fill(255, 255, 255);
  text("Game over.", 7*scl, 4*scl);
  text("Try again by pressing any key to start", 4.5*scl, 5*scl);
  pop();
}

function displayWinMessage(){
  push();
  fill(color(0, 0, 255));
  rect(4*scl, 3*scl, 9*scl, 5*scl);

  textSize(20);
  fill(255, 255, 255);
  text("Game over.", 7*scl, 4*scl);
  text("Well done on collecting all parts.", 4.5*scl, 5*scl);
  pop();
}

function keyPressed() {
  var arrowKeyCodes = [37,38,39,40];

  if (arrowKeyCodes.includes(keyCode) && maze.status != "start") {
    maze.start();
  }

  if (keyCode == LEFT_ARROW) {
    maze.pacman.setDir(-1,0);
  } else if (keyCode == RIGHT_ARROW) {
    maze.pacman.setDir(1,0);
  } else if (keyCode == DOWN_ARROW) {
    maze.pacman.setDir(0,1);
  } else if (keyCode == UP_ARROW) {
    maze.pacman.setDir(0,-1);
  }
}
