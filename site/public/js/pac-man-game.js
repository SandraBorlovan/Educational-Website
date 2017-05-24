var scl = 40;
var pacman;
var maze;

function setup(){
  var width = document.getElementById("myPacmanGame").offsetWidth;
  var height = document.getElementById("myPacmanGame").offsetHeight;

  var myCanvas = createCanvas(width, height);
  myCanvas.parent("myPacmanGame");
  pacman = new Pacman();
  maze = new Maze();
}

function draw(){
  background(0);
  
  maze.show();
  if(frameCount % 8 == 0){
    pacman.update();
  }
  pacman.show();
}

function keyPressed(){
  if(keyCode == LEFT_ARROW){
    pacman.setDir(-1, 0);
  }
  if(keyCode == RIGHT_ARROW){
    pacman.setDir(1, 0);
  }
  if(keyCode == DOWN_ARROW){
    pacman.setDir(0, 1);
  }
  if(keyCode == UP_ARROW){
    pacman.setDir(0, -1);
  }
}
