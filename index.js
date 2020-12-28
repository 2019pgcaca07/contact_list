const express=require('express');
const path=require('path');
const port=8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app=express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));
 //this static function search in the directory for assets foldercd
 
// // //middleware 1 
//  app.use(function(req,res,next){
//      // console.log('middleware 1 is called');
//     req.name="raman";
//      next();
//  });
// // //middleware 2 
//  app.use(function(req,res,next){
//      // console.log('middleware 2 is called');
//      console.log('print from middleware 1',req.name);
//      next();
// });
var contactList = [
    {
        name:"Ranjeet",
        phone:"84664"
    },
    {
        name:"Rahul",
        phone:"20978"
    },
    {
        name:"Naresh",
        phone:"57432"
    }
]
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home',{title: "contact list",
        contact_list:contacts
    });
    
  
    });
});
//for deleting a contact
app.get('/delete-contact',function(req,res){
    //console.log(req.query.name);
    
    // get the query from url
    //get the id from the query in url
    let id=req.query.id;
    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    })
    
    
});
app.get('/practice',function(req,res){
    return res.render('practice',{title:"I'm flying"});
});
app.post('/create-contact',function(req,res){
    
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
   // contactList.push(req.body);
   Contact.create({
       name:req.body.name,
       phone:req.body.phone
   },function(err,newContact){
       if(err){
           console.log('error in creating contact');
           return;
       }
       console.log('********',newContact);
       return res.redirect('back');
   });
});

app.listen(port,function(err){
    if(err){
        console.log('error in running server',err);
    }
    console.log('yup!my express server is running on port:',port);
})

