function startGame(id){
  document.getElementById("myStartScreen").style.visibility= "hidden" ;

  switch(id) {
    case 1:
        displayStartMessage();
        document.getElementById("myPacmanGame").style.visibility= "visible" ;
        break;
    case 2:
        document.getElementById("myMemoryGame").style.visibility= "visible" ;
        newBoard();
        break;
    case 3:
        displayStartMessage();
        document.getElementById("myPacmanGame").style.visibility= "visible" ;
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
