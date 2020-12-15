const express=require('express');
var router=express.Router();
//create an object for contactSchema
const mongoose=require('mongoose');
const Contact=mongoose.model('Contact');

//res.json('sample text');
    //returns here views
    //takes 1 folder from views and object from file
router.get('/', (req,res)=>{
    res.render("contact/addOrEdit", {
        viewTitle: "Insert New Contact"
    });
});

//datas from form will be inside req object body attribute
router.post('/', (req, res)=>{
    if(req.body._id=='')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

//insert datas in mongoDB
//create an object for contactSchema
//save and callback func with error and doc
//contact: req.body -update render
//'contact/list');//all recorded datas
function insertRecord(req,res){ 
    var contact=new Contact();
    contact.fullName=req.body.fullName;
    contact.mobile=req.body.mobile;
    contact.save((err, doc)=>{
        if(!err)
            res.redirect('contact/list');
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err, req.body);
                res.render("contact/addOrEdit", {
                    viewTitle: "Insert New Contact",
                    contact: req.body 
                });
            }   
            else
                console.log('Error during record insertion: ' + err);
        }
    });
}
//update mongodb
function updateRecord(req, res){
    Contact.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true}, (err,doc)=>{
        if(!err){ res.redirect('contact/list'); }
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err, req.body);
                res.render("contact/addOrEdit", {
                    viewTitle: 'Update Contact',
                    contact: req.body
                });
            }
            else
                console.log('Error during record update: ' + err);    
        }
    });
}

//res.json('from list');
    //from mongodb use find func from schema with callback func with 2 params
    //inside docs-we have all records from collection contacts
    //err-is coming from views-contact
    //second param is doc, returns docs inside the list property//returns from db
router.get('/list', (req, res)=>{
    Contact.find((err, docs)=>{
        if(!err){
            res.render("contact/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retrieving emloyee list :' + err);
        }
    });
});

//fields in contact.model.js-fullName, mobile...//err msg-This field is required.
function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError']=err.errors[field].message;
                break;
            case 'fullName':
                body['mobileError']=err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//get from mongodb id
router.get('/:id', (req, res)=>{
    Contact.findById(req.params.id, (err, doc)=>{
        if(!err){
            res.render("contact/addOrEdit", {
                viewTitle: "Update Contact",
                contact: doc
            });
        }
    });
});

//delete
router.get('/delete/:id', (req, res)=>{
    Contact.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            res.redirect('/contact/list');
        }
        else{ console.log('Error in contact delete :'+err); }
    });
});

module.exports=router;
//configure routing for contactController in server.js