const Product = require('../models/Product')
const User = require('../../auth/models/User')
const Bag = require('../models/Bag')

class productsController{
     async getAllProducts(req,res){
       
       try{
             
       }
       catch(e){
        console.log(e)
        res.status(400).json({message:'User is not registrated'})
       }
     }

     async getFavoritesProducts(req,res){
      //  try{
      //   const {username,password} =req.body
      //   const user =await User.findOne({username})
      //   if(!user){
      //    return res.status(400).json({message:'Такой пользователь не найден'})
      //   }
      //   const validPassword=bcrypt.compareSync(password,user.password)
      //   if(!validPassword){
      //     return res.status(400).json({message:'Введен неверный пороль'})
      //    }
        
      //   const token=generateAccesToken(user._id);
      //   return res.json({token:token})
      //  }  
      //  catch(e){
      //   console.log(e)
      //   res.status(400).json({message:'login error'})
      //  } 
     }

     async getBag(req,res){
       try{
        const {username,password} =req.body
        const user =await User.findOne({username})
        if(!user){
         return res.status(400).json({message:'Такой пользователь не найден'})
        }
        const validPassword=bcrypt.compareSync(password,user.password)
        if(!validPassword){
          return res.status(400).json({message:'Введен неверный пороль'})
         }
        
        const token=generateAccesToken(user._id);
        return res.json({token:token})
       }  
       catch(e){
        console.log(e)
        res.status(400).json({message:'login error'})
       } 
     }

     async setProducts(req,res){
    console.log('is active function')
    Product.insertMany(products)
}
}

module.exports=new productsController() 