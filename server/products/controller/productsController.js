const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {validationResult}=require('express-validator')
const jwt =require("jsonwebtoken")
const {secret}=require("../secret/config")

const generateAccesToken=(id)=>{
    return jwt.sign({id},secret,{expiresIn:"24h"})
}

class authController{
     async getAllProducts(req,res){
      //  try{
      //        const errors=validationResult(req)
      //        if(!errors.isEmpty()){
      //         return res.status(400).json({message:'Ошибка при регистрации'})
      //        }
      //        const {username,password} =req.body
      //        const condidate=await User.findOne({username})
      //        if(condidate){
      //         return res.status(400).json({message:'Registration error,Такой пользователь уже существует'})
      //        }
      //        const salt = bcrypt.genSaltSync(7); 
      //        const hashPassword=bcrypt.hashSync(password,salt)
      //        const user=new User({username,password: hashPassword})
      //        await user.save()
      //        return res.json({message:"Registration succesfully"})
      //  }
      //  catch(e){
      //   console.log(e)
      //   res.status(400).json({message:'Registration error'})
      //  }
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
}

module.exports=new authController()