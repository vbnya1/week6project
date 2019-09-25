const express = require('express');

let app = express();

//Set up Router
let router = require('./router');

let bodyParser = require('body-parser');
let ejs = require('ejs');

var db = require('./db');



app.use(bodyParser.urlencoded({extended: false}));

app.engine('html',ejs.renderFile);
app.set('view html','html');

app.use(express.static('public'));

app.use('/',router);

//Set Up DB
const url = "mongodb://localhost:27017";

db.connect(url,function(err,result){
    if(err){
        console.log('Error');
    }else {
        //app.use('/',router);
        app.listen(8080);
        console.log('Listeninig on Port 8080');
    }
})
