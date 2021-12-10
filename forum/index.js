const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("publik"));
const fs = require("fs");
app.use(express.urlencoded({extended:true}));  
app.listen(4000); 
console.log("Kör servern på localhost:4000"); // bara dubbelkollar att servern körs


// Skapar en route till startsidan
app.get("/",(req,res) => {  
  res.sendFile(__dirname + "/form.html");
});


// Hämtar data från meddelande.json-filen
app.get("/hamta-data", (req, res) => { 
  console.log("mottog förfrågan från klienten"); // bara dubbelkollar att allt fungerar som det ska
  fs.readFile("meddelanden.json", function(err, data) {
    if (err) throw err;
    
    res.send(data);
  });
});

// route för att ladda skriv-fran-mall-sidan
app.get("/skriv-fran-mall", (req, res) => { 
  fs.readFile("form.html", function(err, data){
      fs.readFile("meddelanden.json", function(err, myJson) {
          res.send(data.toString());
      });
  });
});



// använder en route för att kunna skriva till meddelande.json-filen och kunna presentera sidan
app.post("/skriv-fran-mall", (req, res) => {

  // läser in form.html i data och läser även in meddelanden.json i myJson
  fs.readFile("form.html", function(err, data){
  fs.readFile("meddelanden.json", function (err, myJson) {
    
      let json = JSON.parse(myJson);
      let newPost = {
        name: req.body.name,
        message: req.body.message ,
        email: req.body.email
      };
 
     // pushar in newPost till filen och därefter skriver tillbaka till filen och skickar form.html på nytt till klienten
     json.push(newPost);
     
     // Konverterar till JSON-format och skriver in i meddelanden.json-filen
      fs.writeFile("meddelanden.json", JSON.stringify(json), function(err){
        if (err) throw err;
        
      });
     
             res.send(data.toString());
    });
  });
});
