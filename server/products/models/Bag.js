const { Schema, model }=require('mongoose')

const Bag=new Schema({
     userId:{type: String,required:true},
     productId:{type: String,required:true},
})

module.exports=model('Bag',Bag)