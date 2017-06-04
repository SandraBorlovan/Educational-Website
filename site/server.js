// Run a node.js web server for local development of a static web site.
// Start with "node server.js" and put pages in a "public" sub-folder.
// Visit the site at the address printed on the console.

// The server is configured to be platform independent.  URLs are made lower
// case, so the server is case insensitive even on Linux, and paths containing
// upper case letters are banned so that the file system is treated as case
// sensitive even on Windows.

// Load the library modules, and define the global constants.
// See http://en.wikipedia.org/wiki/List_of_HTTP_status_codes.
// Start the server: change the port to the default 80, if there are no
// privilege issues and port number 80 isn't already in use.

var express = require("express");
var session = require("express-session");
var http = require("http");
var fs = require("fs");
var path = require("path");
var sqlite3 = require('sqlite3').verbose();

var dbpath = path.resolve('public/db/', 'database.db');
var db = new sqlite3.Database(dbpath);
var app = express();

var options = { setHeaders: deliverXHTML };
app.use(express.static("public", options));


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 9000000 }
}));

var OK = 200, NotFound = 404, BadType = 415, Error = 500;
var types, banned;

app.get("/index.html", function(req, res){
  var sess = req.session;
  res.render("index", {
              session: sess
          });
});

app.get("/profile.html", function(req, res){
  var sess = req.session;
  res.render("profile", {
              session: sess
          });
});

app.get("/tutorials.html", function(req, res){
  var sess = req.session;
  res.render("tutorials",{
              session: sess
          });
});

app.get("/tutorial-structure.html/id=:id", function(req, res){
  var content = {};
  var requestId = req.params.id;
  var sess = req.session;

  db.all('select * from tutorials where id= ?', requestId, handler);

  function handler(err, row){
    content['id']    = row[0].id;
    content['title'] = row[0].title;
    content['task']  = row[0].task;
    content['q1']    = row[0].q1;
    content['q2']    = row[0].q2;
    content['hint']  = row[0].hint;
    content['init_code']  = row[0].init_code;
    content['code']  = row[0].code;
    if(sess.loggedIn === true){
      content['image']  = sess.image;
    }else{
      content['image'] = "../images/profile/profile.png";
    }

    res.render('tutorial-structure',{
      content : content,
      session: sess
    });
  }
});


app.post("/login", function(req, res){
  var sess = req.session;

  var body = "";
  req.on('data', add);
  req.on('end', end);
  var response = {};

  function add(chunk){
      body = body + chunk.toString();
  }
  function end(){;
        body = JSON.parse(body);
        db.get("select * from users where username= ?", body.username, handler);

        function handler(err, row){
            if (err)  throw err;
            if(row === undefined){
              response["loginResponse"] = "No such user";
              response["loggedIn"] = false;

              sess.loggedIn = false;
            }else if( row.password === body.password){
              response["loginResponse"] = "Log in succesfull";
              response["loggedIn"] = true;

              sess.loggedIn   = true;
              sess.username   = body.username;
              sess.name       = row.name;
              sess.email      = row.email;
              sess.password   = row.password;
              sess.education  = row.education;
              sess.tutorial_1 = row.tutorial_1;
              sess.tutorial_2 = row.tutorial_2;
              sess.tutorial_3 = row.tutorial_3;
              sess.image      = row.image;
            }else{
              response["loginResponse"] = "Incorrect password";
              response["loggedIn"] = false;

              sess.loggedIn = false;
            }
            res.send(JSON.stringify(response));
        }
    }
});

app.post("/signin", function(req, res){
  var sess = req.session;
  var body = "";
  req.on('data', add);
  req.on('end', end);
  var response = {};

  function add(chunk){
      body = body + chunk.toString();
  }
  function end(){
        body = JSON.parse(body);
        db.get("select * from users where username= ?", body.username, handler);


        function handler(err, row){
            if (err)  throw err;
            if(row === undefined){

              db.run("insert into users (username, password, name, email, tutorial_1, tutorial_2, tutorial_3, image) values (?, ?, ?, ?, ?, ?, ?, ?)", [body.username, body.password, body.name, body.email, "Not attempted", "Not attempted", "Not attempted", "../images/profile/profile.png"], insertHandler);
              function insertHandler(err){
                if (err) throw err;
              }
              response["loginResponse"] = "Sign in succesfull ";
              response["loggedIn"] = true;

              sess.loggedIn   = true;
              sess.username   = body.username;
              sess.name       = body.name;
              sess.email      = body.email;
              sess.password   = body.password;
              sess.education  = "";
              sess.tutorial_1 ="Not attempted";
              sess.tutorial_2 = "Not attempted";
              sess.tutorial_3 = "Not attempted";
              sess.image      = "../images/profile/profile.png";

            }else{
              response["loginResponse"] = "Username already exists";
              response["loggedIn"] = false;

              sess.loggedIn = false;
            }
            res.send(JSON.stringify(response));
        }
    }
});


app.post("/logout", function(req, res){

  var sess = req.session;

  sess.loggedIn = false;
  sess.username   = "";
  sess.name       = "";
  sess.email      = "";
  sess.password   = "";
  sess.education  = "";
  sess.tutorial_1 = "";
  sess.tutorial_2 = "";
  sess.tutorial_3 = "";
  sess.image      = "../images/profile/profile.png";

  var response = {};
  response["loginResponse"] = "Log out succesfull ";
  response["loggedIn"] = false;
  res.send(JSON.stringify(response));

});

app.post("/modif", function(req, res){
  var sess = req.session;
  var body = "";
  req.on('data', add);
  req.on('end', end);
  var response = {};

  function add(chunk){
      body = body + chunk.toString();
  }
  function end(){
        body = JSON.parse(body);
        db.get("select * from users where username= ?", body.username, handler);

        function handler(err, row){
          if (err)  throw err;
          if(row === undefined){

            response["loginResponse"] = "Username is undefined";
            response["loggedIn"] = true;

          }else{
            db.run("update users set username = ?, password = ?, email = ?, education = ? where id = ?", [body.username, body.password, body.email, body.education, row.id], insertHandler);
            function insertHandler(err){
              if (err) throw err;
              response["loginResponse"] = "Update failed ";
              response["loggedIn"] = true;
            }

            sess.loggedIn = true;
            sess.username  = body.username;
            sess.password  = body.password;
            sess.email     = body.email;
            sess.education = body.education;

            response["loginResponse"] = "Modification succesfull ";
            response["loggedIn"] = true;
          }

          res.send(JSON.stringify(response));
        }
    }
});

app.post("/changeImage", function(req, res){
  var sess = req.session;
  var body = "";
  req.on('data', add);
  req.on('end', end);
  var response = {};

  function add(chunk){
      body = body + chunk.toString();
  }
  function end(){
        body = JSON.parse(body);
        db.get("select * from users where username= ?", sess.username, handler);

        function handler(err, row){
          if (err)  throw err;
          if(row === undefined){

            response["loginResponse"] = "Username is undefined";
            response["loggedIn"] = true;

          }else{
            db.run("update users set image = ? where id = ?", [body.image, row.id], insertHandler);
            function insertHandler(err){
              if (err) throw err;
              response["loginResponse"] = "Update image failed ";
              response["loggedIn"] = true;
            }

            sess.loggedIn = true;
            sess.image     = body.image;

            response["loginResponse"] = "Modification succesfull ";
            response["loggedIn"] = true;
          }

          res.send(JSON.stringify(response));
        }
    }
});


start(8080);

// Start the http service.  Accept only requests from localhost, for security.
function start(port) {
    types = defineTypes();
    banned = [];
    banUpperCase("./public/", "");
    app.listen(port, "localhost" );
    var address = "http://localhost";
    if (port != 80) address = address + ":" + port;
    console.log("Server running at", address);
}

// Serve a request by delivering a file.
function handle(request, response) {
    var url = request.url.toLowerCase();
    if (url.endsWith("/")) url = url + "index.html";
    if (isBanned(url)) return fail(response, NotFound, "URL has been banned");
    var type = findType(url);
    if (type == null) return fail(response, BadType, "File type unsupported");
    var file = "./public" + url;
    fs.readFile(file, ready);
    function ready(err, content) { deliver(response, type, err, content); }
}

// Forbid any resources which shouldn't be delivered to the browser.
function isBanned(url) {
    for (var i=0; i<banned.length; i++) {
        var b = banned[i];
        if (url.startsWith(b)) return true;
    }
    return false;
}

// Find the content type to respond with, or undefined.
function findType(url) {
    var dot = url.lastIndexOf(".");
    var extension = url.substring(dot + 1);
    return types[extension];
}

// Deliver the file that has been read in to the browser.
function deliver(response, type, err, content) {
    if (err) return fail(response, NotFound, "File not found");
    var typeHeader = { "Content-Type": type };
    response.writeHead(OK, typeHeader);
    response.write(content);
    response.end();
}

// Give a minimal failure response to the browser
function fail(response, code, text) {
    var textTypeHeader = { "Content-Type": "text/plain" };
    response.writeHead(code, textTypeHeader);
    response.write(text, "utf8");
    response.end();
}

// Check a folder for files/subfolders with non-lowercase names.  Add them to
// the banned list so they don't get delivered, making the site case sensitive,
// so that it can be moved from Windows to Linux, for example. Synchronous I/O
// is used because this function is only called during startup.  This avoids
// expensive file system operations during normal execution.  A file with a
// non-lowercase name added while the server is running will get delivered, but
// it will be detected and banned when the server is next restarted.
function banUpperCase(root, folder) {
    var folderBit = 1 << 14;
    var names = fs.readdirSync(root + folder);
    for (var i=0; i<names.length; i++) {
        var name = names[i];
        var file = folder + "/" + name;
        if (name != name.toLowerCase()) banned.push(file.toLowerCase());
        var mode = fs.statSync(root + file).mode;
        if ((mode & folderBit) == 0) continue;
        banUpperCase(root, file);
    }
}

// Called by express.static.  Deliver response as XHTML.
function deliverXHTML(res, path, stat) {
    if (path.endsWith(".ejs")) {
        res.header("Content-Type", "application/xhtml+xml");
    }
}

// The most common standard file extensions are supported, and html is
// delivered as xhtml ("application/xhtml+xml").  Some common non-standard file
// extensions are explicitly excluded.  This table is defined using a function
// rather than just a global variable, because otherwise the table would have
// to appear before calling start().  NOTE: for a more complete list, install
// the mime module and adapt the list it provides.
function defineTypes() {
    var types = {
        html : "application/xhtml+xml",
        css  : "text/css",
        js   : "application/javascript",
        png  : "image/png",
        gif  : "image/gif",    // for images copied unchanged
        jpeg : "image/jpeg",   // for images copied unchanged
        jpg  : "image/jpeg",   // for images copied unchanged
        svg  : "image/svg+xml",
        json : "application/json",
        pdf  : "application/pdf",
        txt  : "text/plain",
        ttf  : "application/x-font-ttf",
        woff : "application/font-woff",
        aac  : "audio/aac",
        mp3  : "audio/mpeg",
        mp4  : "video/mp4",
        webm : "video/webm",
        ico  : "image/x-icon", // just for favicon.ico
        xhtml: undefined,      // non-standard, use .html
        htm  : undefined,      // non-standard, use .html
        rar  : undefined,      // non-standard, platform dependent, use .zip
        doc  : undefined,      // non-standard, platform dependent, use .pdf
        docx : undefined,      // non-standard, platform dependent, use .pdf
    }
    return types;
}
