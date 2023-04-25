const { Schema, model }=require('mongoose')

const Bag=new Schema({
     userId:{type: String,required:true},
     product:{type: Object,required:true}
})

module.exports=model('Bag',Bag)