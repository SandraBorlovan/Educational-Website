function startGame(id){
  document.getElementById("myStartScreen").style.visibility= "hidden" ;

  switch(id) {
    case 1:
        document.getElementById("mySnakeGame").style.visibility= "visible" ;
        break;
    case 2:
        document.getElementById("myMemoryGame").style.visibility= "visible" ;
        newBoard();
        break;
    case 3:
        document.getElementById("myGame").style.visibility= "visible" ;
        break;
    default:
        console.log("game.js/startGame(id): Page ID is not supported");
  }
}
var memory = ["cookies","prezels","candies","soda","apple","candies","bananas","apple", "cookies", "prezels","soda","bananas"];
var memory_values = []
var memory_tile_ids = []
var tilesFlipped = 0;

function newBoard(){
  tilesFlipped = 0;
  var output = '';
  for(var i=0; i<memory.length; i++){
    output += '<div id="tile_'+i+'"  onclick="memoryFlipTile(this, \'' + memory[i]+'\')"></div>';
  }
  console.log(output);
  document.getElementById('myMemoryGame').innerHTML = output;
}

function memoryFlipTile(tile, val){

  if(tile.innerHTML == "" && memory_values.length < 2){

    tile.style.background = '#FFF';
    tile.innerHTML = val;
    if(memory_values.length == 0){

      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    }else if(memory_values.length == 1){

      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      if(memory_values[0] == memory_values[1]){
        tilesFlipped += 2;

        memory_values = [];
        memory_tile_ids = [];

        if(tilesFlipped == memory.length){
          document.getElementById("myGameOver").style.visibility = "visible";
        }
      }else{
        function flipTilesBack(){
          var tile_1 = document.getElementById(memory_tile_ids[0]);
          var tile_2 = document.getElementById(memory_tile_ids[1]);
          console.log(tile_1);
          console.log(tile_2);
          tile_1.style.background = '#049246';
          tile_1.innerHTML = "";
          tile_2.style.background = '#049246';
          tile_2.innerHTML = "";

          memory_values = [];
          memory_tile_ids = [];
        }
        setTimeout(flipTilesBack, 700);
      }
    }
  }else{
    console.log("games.js/memoryFlipTile: Something went wrong");
  }
}
