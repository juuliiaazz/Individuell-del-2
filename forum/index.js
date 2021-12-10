const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("publik"));
const fs = require("fs");
app.use(express.urlencoded({extended:true}));  
app.listen(4000); 
console.log("Kör servern på localhost:4000"); // bara dubbelkollar att servern körs



app.get("/",(req,res) => {  
  res.sendFile(__dirname + "/form.html");
});



app.get("/hamta-data", (req, res) => { 
    console.log("mottog förfrågan från klienten"); // bara dubbelkollar att allt fungerar som det ska
    fs.readFile("meddelanden.json", function(err, data) {
      if (err) throw err;
      
      res.send(data);
    });
  });
  

  app.get("/skriv-fran-mall", (req, res) => { 
    fs.readFile("form.html", function(err, data){
        fs.readFile("meddelanden.json", function(err, myJson) {
            res.send(data.toString());
        });
    });
  });
  
  
 
  app.post("/skriv-fran-mall", (req, res) => {
  
    
    fs.readFile("form.html", function(err, data){
    fs.readFile("meddelanden.json", function (err, myJson) {
      
        let json = JSON.parse(myJson);
        let newPost = {
          name: req.body.name,
          message: req.body.message ,
          email: req.body.email
        };

   
    json.push(newPost);
     
   
     fs.writeFile("meddelanden.json", JSON.stringify(json), function(err){
       if (err) throw err;
       
     });
    
            res.send(data.toString());
   });
 });
});
