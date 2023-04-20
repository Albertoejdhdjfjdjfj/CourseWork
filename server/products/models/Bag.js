const { Schema, model }=require('mongoose')

const Bag=new Schema({
     usernId:{type: String,required:true},
     productId:{type: String,required:true}
})

module.exports=model('Bag',Bag)