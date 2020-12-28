const mongoose=require('mongoose');
const createSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
const Contact = mongoose.model('Contact',createSchema);
module.exports=Contact;