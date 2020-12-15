require('./models/db');
const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');


const contactController=require('./controllers/contactController');
//call express function with variable app
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());//call it in json
//configure express module for express-handlebars
//set view directory by calling the set func
app.set('views', path.join(__dirname, '/views/'));
//configure express engine for handlebars
//first parameter-hbs, exphbs-function from express-handlebars
//extname-extension for view files-hbs
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));

//set view engine as hbs
app.set('view engine', 'hbs');


//start server, we call listen function from app variable,
// as 1 parameter default numb app, second parameter-callback func
app.listen(3000, ()=>{
    console.log('Express server stared at port: 3000');
});
//in order to run this app, we have in terminal write:
//install>>npm i nodemon
//automatic updates changes
// nodemon server.js

//route for contactController
app.use('/contact', contactController);
