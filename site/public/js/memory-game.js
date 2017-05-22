// Memory Game
var memory = ["cookies","pretzels","candies","soda","apples","candies","oranges","apples", "cookies", "pretzels","soda","oranges"];
var memory_values = []
var memory_tile_ids = []
var tilesFlipped = 0;

function shuffleTiles(){
  var j;
  for(var i=0; i<memory.length; i++){
    var j = Math.floor((Math.random() * 11) + 1);
    var aux = memory[i];
    memory[i] = memory[j];
    memory[j] = aux;
  }
}

function newBoard(){
  tilesFlipped = 0;
  var output = '';
  shuffleTiles();
  for(var i=0; i<memory.length; i++){
    output += '<div id="tile_'+i+'"  onclick="memoryFlipTile(this, \'' + memory[i]+'\')"></div>';
  }
  document.getElementById('myMemoryGame').innerHTML = output;
}

function memoryFlipTile(tile, val){

  if(tile.innerHTML == "" && memory_values.length < 2){

    tile.style.background = '#FFF';
    tile.innerHTML = innerImage(val);
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
          setTimeout( function(){
             document.getElementById("myGameOver").style.visibility = "hidden";
             document.getElementById("myMemoryGame").style.visibility= "hidden" ;
             document.getElementById("myStartScreen").style.visibility= "visible" ;
             document.getElementById("myCode").style.visibility= "visible" ;
             document.getElementById("myInitCode").style.visibility= "hidden" ;
           }, 3000);
        }
      }else{
        function flipTilesBack(){
          var tile_1 = document.getElementById(memory_tile_ids[0]);
          var tile_2 = document.getElementById(memory_tile_ids[1]);
          tile_1.style.background = 'url(../images/tiles_background.jpg) no-repeat';
          tile_1.style.backgroundSize = "100%";
          tile_1.innerHTML = "";
          tile_2.style.background = 'url(../images/tiles_background.jpg) no-repeat';
          tile_2.style.backgroundSize = "100%";
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

function innerImage(val){
  var innnerHTML = "";
  switch(val) {
    case "cookies":
        innerHTML = '<img src="../images/cookies.png" style="backgroundSize: 100%; width:100%; height:100%;"></img>';
        break;
    case "pretzels":
        innerHTML = '<img src="../images/pretzels.jpg" style="backgroundSize: 100%;width:100%; height:100%;"></img>';
        break;
    case "candies":
        innerHTML = '<img src="../images/candies.jpg" style="backgroundSize: 100%;width:100%; height:100%;"></img>';
        break;
    case "soda":
        innerHTML = '<img src="../images/soda.png" style="backgroundSize: 100%;width:100%; height:100%;"></img>';
        break;
    case "apples":
        innerHTML = '<img src="../images/apples.png" style="backgroundSize: 100%;width:100%; height:100%;"></img>';
        break;
    case "oranges":
        innerHTML = '<img src="../images/oranges.jpg" style="backgroundSize: 100%;width:100%; height:100%;"></img>';
        break;
    default:
        console.log("game.js/innerImage(val): String is not supported");
  }
  console.log(innerHTML);
  return innerHTML;
}
