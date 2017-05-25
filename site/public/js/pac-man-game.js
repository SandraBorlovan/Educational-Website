var scl = 40;
var pacman;
var maze;
var food1, food2, food3, food4;
var food = []

function setup(){
  var width = document.getElementById("myPacmanGame").offsetWidth;
  var height = document.getElementById("myPacmanGame").offsetHeight;

  var myCanvas = createCanvas(width, height);
  myCanvas.parent("myPacmanGame");
  pacman = new Pacman();

  food.push(new Food( 3, 4));
  food.push(new Food( 5, 7));
  food.push(new Food(13, 1));
  food.push(new Food(11, 9));

  maze = new Maze();

}

function draw(){
  background(0);

  maze.show();
  if(frameCount % 8 == 0){
    pacman.update();
  }

  for(var i=0; i<food.length; i++){
    food[i].show();
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
