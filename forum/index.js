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
