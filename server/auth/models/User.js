const { Schema, model }=require('mongoose')

const User=new Schema({
     firstname:{type: String,required:true},
     lastname:{type: String,required:true},
     email:{type: String, uniquee:true,required:true},
     password:{type: String,required:true},
})

module.exports=model('User',User)