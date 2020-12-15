const mongoose=require('mongoose');
//connected with hosted db, parser-true, callback function
mongoose.connect('mongodb+srv://jekaterinats:1596321kt@cluster0.nf8cq.mongodb.net/PhonebookDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(!err){ console.log('MongoDB Connection Succeeded.') }
    else{ console.log('Error in DB connection: ' + err) }
});
//connect to db, parser-true, callback function
/*mongoose.connect('mongodb://localhost:27017/PhonebookDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(!err){ console.log('MongoDB Connection Succeeded.') }
    else{ console.log('Error in DB connection: ' + err) }
});*/

require('./contact.model.js');//done connection with db

