const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
   

var FirstName = req.body.FName;
var LastName = req.body.LName; 
var email = req.body.email;

var data = {
    members : [
        {email_address: email,
        status: "subscribed",
        merge_fields : {
            FNAME: FirstName,
            LNAME: LastName
        }
    }
        
    ]
};

var jsonData = JSON.stringify(data);

var options = {
    url: "https://us7.api.mailchimp.com/3.0/lists/aaedaece06", 
method : "POST",
headers : {
    "Authorization" : "johnsonayo 188cb4fbfd3f6082969d42f165ee3acc-us7"
},
body: jsonData

};

request(options, function(error, response, body ){
 if (error) {
    res.sendFile(__dirname + "/failure.html"); 
 } else {
     if (response.statusCode === 200) {
         res.sendFile(__dirname + "/success.html");
     } else {
        res.sendFile(__dirname + "/failure.html"); 
     }
 }
});

});

   
app.post("/failure.html", function(req, res){
    res.redirect("/"); 
});

 

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000");
});

// 188cb4fbfd3f6082969d42f165ee3acc-us7


// aaedaece06
 