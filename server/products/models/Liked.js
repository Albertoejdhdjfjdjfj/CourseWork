const { Schema, model }=require('mongoose')

const Liked=new Schema({
     userId:{type: String,required:true},
     product:{type: Object,required:true}
})

module.exports=model('Liked',Liked)