function Maze(){
  this.status = "ready";
  this.pacman = new Pacman();
  this.ghosts = [];
  this.food = [];
  this.megaFood = [];
  this.grid = [
     [0, 0],[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0],[10, 0],[11, 0],[12, 0],[13, 0],[14, 0],[15, 0],[16, 0]
    ,[0, 1]                                          ,[7, 1]                                                              ,[16, 1]
    ,[0, 2]       ,[2, 2]       ,[4, 2],[5, 2]       ,[7, 2]       ,[9, 2],[10, 2]        ,[12, 2]        ,[14, 2]        ,[16, 2]
    ,[0, 3]                                                                                               ,[14, 3]        ,[16, 3]
    ,[0, 4]       ,[2, 4]       ,[4, 4]       ,[6, 4],[7, 4],[8, 4]       ,[10, 4]        ,[12, 4]        ,[14, 4]        ,[16, 4]
    ,[0, 5]                     ,[4, 5]              ,[7, 5]              ,[10, 5]                        ,[14, 5]        ,[16, 5]
    ,[0, 6],[1, 6],[2, 6]       ,[4, 6],[5, 6]       ,[7, 6]       ,[9, 6],[10, 6]        ,[12, 6]        ,[14, 6]        ,[16, 6]
    ,[0, 7]                     ,[4, 7]                                   ,[10, 7]        ,[14, 7]                        ,[16, 7]
    ,[0, 8]       ,[2, 8]       ,[4, 8]       ,[6, 8]       ,[8, 8]       ,[10, 8]        ,[12, 8],[13, 8],[14, 8]        ,[16, 8]
    ,[0, 9]                                   ,[6, 9]       ,[8, 9]                                                       ,[16, 9]
    ,[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10],[16,10]
  ];

  this.initialize = function () {
   this.initializeGhosts();
   this.initializeFood();
 }

 this.initializeGhosts = function () {
   this.ghosts = [];
   this.ghosts[0] = new Ghost(7, 8);
   this.ghosts[1] = new Ghost(6, 9);
   this.ghosts[2] = new Ghost(7, 9);
   this.ghosts[3] = new Ghost(8, 9);

   this.ghosts[0].color = "red";
   this.ghosts[1].color = "cyan";
   this.ghosts[2].color = "pink";
   this.ghosts[3].color = "orange";
 }

 this.initializeFood = function () {
   this.food = [];
   for (var i = 0; i < 17; i++) {
     for (var j = 0; j < 11; j++) {

       // set mega food
       var mega = false;
       mega = mega || (i == 1 && j == 2);
       mega = mega || (i == 1 && j == 15);
       mega = mega || (i == 13 && j == 2);
       mega = mega || (i == 13 && j == 15);
       if (mega) {
         var food = new Food(i,j);
         food.mega();
         this.megaFood.push(food);
         continue;
       }

       if (!this.contains(i,j)) {
         var food = new Food(i,j);
         this.food.push(food);
       }
     }
   }
 }

 this.start = function () {
   this.status = "ready";
   this.pacman = new Pacman();
   this.initialize();
 }

 this.stop = function () {
   this.initialize();
   this.status = "stop";
   var style = window.getComputedStyle(document.getElementById("myStartScreen"));

   if(style.display == "none"){
     if(this.food.length == 0){

       document.getElementById("myTitle").innerHTML = "Game Over!";
       document.getElementById("myMessage").innerHTML = "Well done!";
       document.getElementById("myGameOver").style.visibility = "visible";


     }else{
       document.getElementById("myTitle").innerHTML = "Game Over!";
       document.getElementById("myMessage").innerHTML = "You can always try again!";
       document.getElementById("myGameOver").style.visibility = "visible";

     }

     setTimeout( function(){
        document.getElementById("myGameOver").style.visibility = "hidden";
        document.getElementById("myPacmanGame").style.visibility= "hidden" ;
        document.getElementById("myStartScreen").style.display= "block" ;
        document.getElementById("myCode").style.visibility= "visible" ;
        document.getElementById("myInitCode").style.visibility= "hidden" ;
      }, 3000);
    }

 }

 this.setGhostsConsumable = function () {
   for (var i = 0; i < this.ghosts.length; i++) {
     this.ghosts[i].setConsumable();
   }
 }

 this.consumeMegaFood = function (x, y) {
   for (var i = 0; i < this.megaFood.length; i++) {
     if (this.megaFood[i].x == x && this.megaFood[i].y == y) {
       this.megaFood.splice(i, 1);
       this.setGhostsConsumable();
     }
   }
 }

 this.consumeFood = function (x,y) {
   for (var i = 0; i < this.food.length; i++) {
     if (this.food[i].x == x && this.food[i].y == y) {
       this.food.splice(i, 1);
     }
   }
 }

 this.contains = function (x,y) {
   var result = false;
   for (var i = 0; i < this.grid.length; i++) {
     var brick = this.grid[i];
     if (brick[0] == x && brick[1] == y) {
       result = true;
     }
   }
   return result;
 }

 this.showFood = function () {
   for (var i = 0; i < this.food.length; i++) {
     this.food[i].show();
   }
 }

 this.showMegaFood = function () {
   for (var i = 0; i < this.megaFood.length; i++) {
     this.megaFood[i].show();
   }
 }

 this.showBricks = function () {
   push();
   fill(0);
   strokeWeight(1/10*scl);
   stroke('blue');
   for (var i = 0; i < this.grid.length; i++) {
     rect(this.grid[i][0]*scl, this.grid[i][1]*scl, scl, scl);
   }
   pop();
 }

 this.showGhosts = function () {
   for (var i = 0; i < this.ghosts.length; i++) {
     this.ghosts[i].show();
   }
 }

 this.update = function () {
   if (this.status == "stop") {
     return;
   }

   if (this.food.length == 0) {
     this.stop();
   }

   if (frameCount % 12 == 0) {
     this.pacman.update();
     for (var i = 0; i < this.ghosts.length; i++) {
       var ghost = this.ghosts[i];
       ghost.update();
       if (ghost.consumable) {

       } else if (ghost.pos.x == this.pacman.pos.x && ghost.pos.y == this.pacman.pos.y) {
         this.stop();
       }
     }
   }

   this.consumeFood(this.pacman.pos.x, this.pacman.pos.y);
   this.consumeMegaFood(this.pacman.pos.x, this.pacman.pos.y);
 }

 this.show = function () {
   this.showFood();
   this.showMegaFood();
   this.showBricks();
   this.showGhosts();
   this.pacman.show();

   if (this.status != "start") {
     fill("yellow");
     textSize(13/15*scl);
     text("Ready!", 6*scl, 11*scl, 8*scl, 12*scl);
   }
 }
}
