//structure for contact document
const mongoose=require('mongoose');
//create an object for contactSchema
//here constructor is mongoose.Schema
//inside object we have specify structor of contact document{}
// in doc we have 2 fields: fullname, mobile
var contactSchema=new mongoose.Schema({
    fullName:{ 
        type: String,
        required: 'This field is required.'//error msg
     },
    mobile: {
        type: String,
        required: 'This field is required.'//error msg
    }
});
//for register contactSchema inside mongoose,  we call model
mongoose.model('Contact', contactSchema);
//name of the schema is Employee, contactSchema is schema object
//then add request statement for contacts in db.js