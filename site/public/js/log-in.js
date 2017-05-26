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
  var name    = document.getElementById('name').value;
  var username = document.getElementById('username').value;
  var email    = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  var info = {}
  info["username"] = username;
  info["password"] = password;
  info["email"]    = email;
  info["name"]     = name;

  console.log("Sign in with", info);

  // sendRequest('POST', '/login', true, JSON.stringify(info));
}

function sendRequest(method, section, syncValue, data){
  var q = new XMLHttpRequest();
   q.onreadystatechange = receive;
   q.open(method, section, syncValue);
   q.send(data);
   function receive(){
       if (this.readyState == 4 && this.status == 200) {
           location.reload();
       }
   }
}

function exitLogin(){
  document.getElementById('myLogInWindow').style.display = 'none';
}
