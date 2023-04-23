const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {validationResult}=require('express-validator')
const jwt =require("jsonwebtoken")
const {secret}=require("../secret/config")

const generateAccesToken=(id)=>{
    const payload={userId:id}
    return jwt.sign(payload,secret,{expiresIn:"24h"})
}

class authController{
     async registation(req,res){
       try{
             console.log(req.body)
             const errors=validationResult(req)
             if(!errors.isEmpty()){
              return res.status(400).json({message:'Ошибка при регистрации'})
             }
             const {firstname,lastname,email,password} =req.body
             console.log(firstname,lastname,email,password)
             const condidate=await User.findOne({email})
             if(condidate){
              return res.status(400).json({message:'Registration error,Такой пользователь уже существует'})
             }
             const salt = bcrypt.genSaltSync(7); 
             const hashPassword=bcrypt.hashSync(password,salt)
             const user=new User({firstname,lastname,email,password: hashPassword})
             await user.save()
             return res.json({message:"Registration succesfully"})
       }
       catch(e){
        console.log(e)
        res.status(400).json({message:'Registration error'})
       }
     }

     async login(req,res){
       try{
        const {email,password} =req.body
        const user =await User.findOne({email})
        if(!user){
         return res.status(400).json({message:'Такой пользователь не найден'})
        }
        const validPassword=bcrypt.compareSync(password,user.password)
        if(!validPassword){
          return res.status(400).json({message:'Введен неверный пороль'})
         }
        
        const token=generateAccesToken(user._id);
        return res.json({token:token,firstname:user.firstname,lastname:user.lastname})
       }  
       catch(e){
        console.log(e)
        res.status(400).json({message:'login error'})
       } 
     }
}

module.exports=new authController()