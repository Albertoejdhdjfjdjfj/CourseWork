const { Schema, model }=require('mongoose')

const Bag=new Schema({
     userId:{type: String,required:true},
     products:{type: Array,required:true}
})

module.exports=model('Bag',Bag)