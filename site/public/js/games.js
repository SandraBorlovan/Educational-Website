var id;

window.addEventListener("keydown", function(e) {
  var style = window.getComputedStyle(document.getElementById("myStartScreen"));
  // space and arrow keys
  if(  style.display === "none" && [37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);

function startGame(id){
  id = id;
  console.log("Id is:", id);
  document.getElementById("myStartScreen").style.display= "none" ;

  switch(id) {
    case 1:
        displayStartMessage();
        document.getElementById("myPacmanGame").style.visibility= "visible" ;
        reset();
        break;
    case 2:
        document.getElementById("myMemoryGame").style.visibility= "visible" ;
        newBoard();
        break;
    case 3:
        displayStartMessage();
        document.getElementById("myPacmanGame").style.visibility= "visible" ;
        reset();
        break;
    default:
        console.log("game.js/startGame(id): Page ID is not supported");
  }
}

function displayStartMessage(){
  document.getElementById("myTitle").innerHTML = "Start playing by pressing the arrows";
  document.getElementById("myMessage").innerHTML = "Try and gather all the shraded parts";
  document.getElementById("myGameOver").style.visibility = "visible";
  setTimeout( function(){
     document.getElementById("myGameOver").style.visibility = "hidden";
   }, 3000);
}
