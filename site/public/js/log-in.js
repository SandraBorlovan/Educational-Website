function enableLogIn(){
  document.getElementById('myLogInWindow').style.display = 'block';
}

function login(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var info = {}
  info['username'] = username;
  info['password'] = password;

  sendRequest('POST', '/login', true, message);
}

function exitLogin(){
  document.getElementById('myLogInWindow').style.display = 'none';
}
