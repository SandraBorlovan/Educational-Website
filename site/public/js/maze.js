function Maze(){
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

  this.initialise = function(){
    //Draw food
    for(var i=0; i < 17; i++){
      for(var j=0; j < 11; j++){
        if(!this.contains(i*scl, j*scl)){
          var food = new Food();
          this.food.push(food);
        }
      }
    }
  }

  this.contains = function(x ,y){
    var result = false;
    for(var i=0; i< this.grid.length; i++){
      var brick = this.grid[i];
      if(brick[0] == floor(x/scl) && brick[1] == floor(y/scl)){
        result = true;
      }
    }
    return result;
  }

  this.show = function(){
    push();
    fill(0);
    strokeWeight(4);
    stroke('blue');

    for(var i=0; i< this.grid.length; i++){
      rect(this.grid[i][0]*scl, this.grid[i][1]*scl, scl, scl);
    }
    pop();
  }
}
