const Product = require('../models/Product')
const User = require('../../auth/models/User')
const Bag = require('../models/Bag')
const jwt=require('jsonwebtoken')
const secret=require('../../auth/secret/config')
class productsController{
    async getAllProducts(req, res) {
        try {
          const products = await Product.find();
          return res.status(200).json(products);
        } catch (e) {
          console.log(e);
          res.status(400).json({ message: 'Ошибка при получении продуктов' });
        }
      }
     async getFavoritesProducts(req,res){
        const token = req.headers.authorization.split(' ')[1];
      
          if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' });
          }
      
          const decodedData = jwt.verify(token, secret);
          console.log(decodedData);
      
          if (!decodedData.userId) {
            return res.status(403).json({ message: 'Пользователь не авторизован' });
          }
       
        const products = await Product.find();
        return res.status(200).json(products);
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Ошибка при получении продуктов' });
      
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

    async setProducts(req,res){
      console.log('is active function')
      Product.insertMany(products)
      }
}

module.exports=new productsController() 