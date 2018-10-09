var scl = 40;
var maze;
var button;


function setup(){

  var width = document.getElementById("myPacmanGame").offsetWidth;
  var height = document.getElementById("myPacmanGame").offsetHeight;

  var myCanvas = createCanvas(width, height);
  myCanvas.parent("myPacmanGame");

  maze = new Maze();
  maze.initialize();

}

function draw() {
  background(0);
  maze.update();
  maze.show();
}

function reset() {

  // var arrowKeyCodes = [37,38,39,40];
  // var style = window.getComputedStyle(document.getElementById("myStartScreen"));
  //
  // window.addEventListener("keydown", function(e) {
  //   // space and arrow keys
  //   if([37, 38, 39, 40].indexOf(e.keyCode) > -1 && style.display == "none" &&  maze.status =="stop") {
        maze.start();
  //   }
  // });
}

function keyPressed() {
  var arrowKeyCodes = [37,38,39,40];
  var style = window.getComputedStyle(document.getElementById("myStartScreen"));

  if(maze.status == "ready" ){
    maze.status = "start"
  }

  if(style.display === "none" && maze.status == "start"){


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
}
