function personaliseButton(){
   document.getElementById("topic_1").style.visibility= "visible" ;
   document.getElementById("topic_2").style.visibility= "hidden" ;
   document.getElementById("topic_3").style.visibility= "hidden" ;

   document.getElementById("personalise_btn").style.backgroundColor= "orange";
   document.getElementById("settings_btn").style.backgroundColor= "rgb(233, 173, 0)";
   document.getElementById("tutorials_btn").style.backgroundColor= "rgb(233, 173, 0)";
}

function settingsButton(){
   document.getElementById("topic_1").style.visibility= "hidden" ;
   document.getElementById("topic_2").style.visibility= "visible" ;
   document.getElementById("topic_3").style.visibility= "hidden" ;

   document.getElementById("personalise_btn").style.backgroundColor= "rgb(233, 173, 0)";
   document.getElementById("settings_btn").style.backgroundColor= "orange";
   document.getElementById("tutorials_btn").style.backgroundColor= "rgb(233, 173, 0)";
}

function tutorialsButton(){
   document.getElementById("topic_1").style.visibility= "hidden" ;
   document.getElementById("topic_2").style.visibility= "hidden" ;
   document.getElementById("topic_3").style.visibility= "visible" ;

   document.getElementById("personalise_btn").style.backgroundColor= "rgb(233, 173, 0)";
   document.getElementById("settings_btn").style.backgroundColor= "rgb(233, 173, 0)";
   document.getElementById("tutorials_btn").style.backgroundColor= "orange";
}
