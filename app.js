const express = require("express")
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res){
   // res.render("admin_login");
      res.render("admin-login");


});
app.get("/admin_login", function(req,res){
  res.render("admin-login");
});
app.get("/admin_in", function(req,res){ 
    var Name = req.query.name;
    var Password = req.query.pass;
if (Password =="123")
{ 
  console.log("Successfully logged in as admin");
  res.render("admin");
}
else{
    res.render("notfound.ejs");
}
});
module.exports.app = app;
app.listen(3000 , function(){
  console.log("App is running");
});