window.onload = function(){ 

    // hämtar hämta-data-sidan
    let forfragan = new XMLHttpRequest();
    forfragan.open("GET", "/hamta-data");
    
    forfragan.onload = function(){
        
        data = JSON.parse(this.response);
       console.log(data);
     
     
    
    }
    
    forfragan.send(); 
    
    
    }