const { Schema, model }=require('mongoose')

const Liked=new Schema({
     userId:{type: String,required:true},
     productId:{type: String,required:true},
})

module.exports=model('Liked',Liked)