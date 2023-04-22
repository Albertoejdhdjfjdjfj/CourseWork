const Product = require('../models/Product')
const Bag = require('../models/Bag')
const Liked = require('../models/Liked')
const jwt=require('jsonwebtoken')
const secret=require('../../auth/secret/config')

class productsController{
    async getAllProducts(req, res) {
        try {
          const { sort,page,limit } = req.query;
          const pageNumber = parseInt(page) || 1;
          const limitNumber = parseInt(limit) || 10;
          const skip = (pageNumber - 1) * limitNumber;
          const products = await Product.find(sort?{type:sort}:{})
          .skip(skip)
          .limit(limitNumber)
          .exec();
          return res.status(200).json(products);
        } catch (e) {
          console.log(e);
          res.status(400).json({ message: 'Ошибка при получении продуктов' });
        }
      }

     async setBag(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const array = req.body;

        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const data = await Bag.findOne({ userId: userId });
        
        if (!data) {
          // Если корзина для пользователя не найдена, создаем новую корзину
          const newBag = new Bag({ userId: userId, products: array });
          await newBag.save();
        } else {
          // Если корзина для пользователя найдена, обновляем ее продукты
          data.products = array;
          await data.save();
        }
         return res.status(200).json({message:"bag is added"});
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 

     async getBag(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const data = await Bag.find({userId: userId})
        if(data.length===0){
          return res.status(200).json([]);
         }
         return res.status(200).json(data[0].products);
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 
     
     async setLiked(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const array = req.body;

        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const data = await Liked.findOne({ userId: userId });
        
        if (!data) {
          // Если корзина для пользователя не найдена, создаем новую корзину
          const newLiked = new Liked({ userId: userId, products: array });
          await newLiked.save();
        } else {
          // Если корзина для пользователя найдена, обновляем ее продукты
          data.products = array;
          await data.save();
        }
         return res.status(200).json({message:"bag is added"});
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 

     async getLiked(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const data = await Liked.find({userId: userId})
         if(data.length===0){
          return res.status(200).json([]);
         }
         return res.status(200).json(data[0].products);
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 
}

module.exports=new productsController() 