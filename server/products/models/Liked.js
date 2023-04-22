const { Schema, model }=require('mongoose')

const Liked=new Schema({
     userId:{type: String,required:true},
     products:{type: Array,required:true}
})

module.exports=model('Liked',Liked)