window.onload = function(){ 

  
    let forfragan = new XMLHttpRequest();
    forfragan.open("GET", "/hamta-data");
    
    forfragan.onload = function(){
        
        data = JSON.parse(this.response);
       console.log(data);
     
    
       for (let i = data.length-1; i >=0; i--) { 
      
        document.getElementById("output").innerHTML += "<span style='font-weight:bold;'>Namn: </span>" + data[i].name + "<br>";
        document.getElementById("output").innerHTML += "<span style='font-weight:bold;'>E-post: </span>" + data[i].email + "<br>";
        document.getElementById("output").innerHTML += "<span style='white-space: pre-wrap;'>" + "<span style='font-weight:bold;'>Meddelande: </span>" + data[i].message + " </span>";
        document.getElementById("output").innerHTML += "<br><hr>";
    }
    
    }
    
    forfragan.send(); 
    
    
    }