const { Schema, model }=require('mongoose')

const Subscriber=new Schema(
  {
    email: {
      type: String,
      required: true
    }
  }
)

module.exports=model('Subscriber', Subscriber)