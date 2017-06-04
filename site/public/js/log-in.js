var imageSelected = "";

function selectImage(newImage){
  if( imageSelected != ""){
      document.getElementById(imageSelected).style.boxShadow = "5px 10px 15px grey";
  }
  document.getElementById(newImage).style.boxShadow = "5px 10px 15px green";
  imageSelected = newImage;
}

function changeImage(){

  var image = document.getElementById(imageSelected).src;

  var info = {}
  info["image"]  = image;

  sendRequest('POST', '/changeImage', true, JSON.stringify(info));
}

function enableLogIn(){
  document.getElementById('myLogInWindow').style.display = 'block';
  document.getElementById('logIn').style.display = 'block';
  document.getElementById('signIn').style.display = 'none';
}

function enableSignIn(){
  document.getElementById('myLogInWindow').style.display = 'block';
  document.getElementById('logIn').style.display = 'none';
  document.getElementById('signIn').style.display = 'block';
}

function login(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if(username == ""){
    alert("Username field cannot be empty");
  }else if(password == ""){
    alert("Password field cannot be empty");
  }else{

    var info = {}
    info["username"] = username;
    info["password"] = password;

    sendRequest('POST', '/login', true, JSON.stringify(info));
  }
}

function signin(){
  var name    = document.getElementById('sg_name').value;
  var username = document.getElementById('sg_username').value;
  var email    = document.getElementById('sg_email').value;
  var password = document.getElementById('sg_password').value;

  if(username == ""){
    alert("Username field cannot be empty");
  }else if(password == ""){
    alert("Password field cannot be empty");
  }else if(email == ""){
    alert("Email field cannot be empty");
  }else if(name == ""){
    alert("Name field cannot be empty");
  }else{

    var info = {}
    info["username"] = username;
    info["password"] = password;
    info["email"]    = email;
    info["name"]     = name;

    sendRequest('POST', '/signin', true, JSON.stringify(info));
  }
}

function logout(){
  var info = {}
  sendRequest('POST', '/logout', true, JSON.stringify(info));
}

function modifyDetails(){

  var name      = document.getElementById('dsp_name').value;
  var username  = document.getElementById('dsp_username').value;
  var password  = document.getElementById('dsp_password').value;
  var email     = document.getElementById('dsp_email').value;
  var education = document.getElementById('dsp_education').value;

  var info = {}
  info["username"]  = username;
  info["education"] = education;
  info["password"]  = password;
  info["email"]     = email;
  info["name"]      = name;

  sendRequest('POST', '/modif', true, JSON.stringify(info));

}

function sendRequest(method, section, syncValue, data){

  var displayedResponse = false;
  var q = new XMLHttpRequest();
  q.onreadystatechange = receive;
  q.open(method, section, syncValue);
  q.send(data);
  function receive(response){
    if(this.response != "" && displayedResponse==false){
      var response = JSON.parse(this.response);
      alert(response.loginResponse);
      displayedResponse = true;
    }
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  }
}

function exitLogin(){
  document.getElementById('myLogInWindow').style.display = 'none';
}
