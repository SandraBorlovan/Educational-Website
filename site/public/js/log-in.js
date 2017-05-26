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

  var info = {}
  info["username"] = username;
  info["password"] = password;

  console.log("Log in with", info);

  sendRequest('POST', '/login', true, JSON.stringify(info));
}

function signin(){
  var name    = document.getElementById('sg_name').value;
  var username = document.getElementById('sg_username').value;
  var email    = document.getElementById('sg_email').value;
  var password = document.getElementById('sg_password').value;

  var info = {}
  info["username"] = username;
  info["password"] = password;
  info["email"]    = email;
  info["name"]     = name;

  console.log("Sign in with", info);

  sendRequest('POST', '/signin', true, JSON.stringify(info));
}

function sendRequest(method, section, syncValue, data){
  console.log("Received post request to", section);
  var q = new XMLHttpRequest();
  q.onreadystatechange = receive;
  q.open(method, section, syncValue);
  q.send(data);
  function receive(response){
    if(this.response != ""){
      var response = JSON.parse(this.response);
      console.log(response.loginResponse);
      // document.getElementById("loginResponse").innerHTML = response.loginResponse;
    }
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  }
}

function exitLogin(){
  document.getElementById('myLogInWindow').style.display = 'none';
}
