const express=require("express");
var mysql = require('mysql');
const bodyParser=require("body-parser");
const app=express();

app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:'contact_db'
}); 
con.connect(function(err) {
    if (err) {
      console.error(err);
    }
    console.log('Database Connected to the MySQL server.');
});
app.get("/",function(req,res){
    res.render("index");
})
app.get("/contact",function(req,res){
    res.render("form");
}) 
app.post("/failure",function(req,res){
    res.render("form");
})
app.post("/submit",function(req,res){
    con.query(`create table if not exists contact( sno int primary key auto_increment, firstName varchar(50)not null, lastName varchar(50)not null, email varchar(50)not null,phone varchar(20)not null)` ,function(err,result){
    if(err){
        console.log(err);
    
    }else{
        console.log("Query Executed");
    }
});
    var sql = "INSERT INTO contact  VALUES (null,'"+req.body.fname +"','"+req.body.lname +"','"+ req.body.email+"',"+req.body.number+")";
    con.query(sql, function (err, result) {
      if (err){
        res.render("failure");
      };
      console.log("1 record inserted");
      res.render("success");
      
    })
    });   
app.listen(3000,function(){
    console.log("Server started successfully");
});
