const { Schema, model }=require('mongoose')

const Product=new Schema(
  {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      currency: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    },
    color: {
      name: {
        type: String,
        required: true
      },
      hex: {
        type: String,
        required: true
      }
    },
    availableSizes: {
      type: [String],
      required: true
    },
    size: {
      type: String,
    },
    description: {
      type: String
    },
    images: {
      type: [String],
      required: true
    }
  }
)

module.exports=model('Product', Product)