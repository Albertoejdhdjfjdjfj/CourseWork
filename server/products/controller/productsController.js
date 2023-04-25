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
          const limitNumber = parseInt(limit);
          const skip = (pageNumber - 1) * limitNumber;
          const regex = new RegExp(sort, "i");
          const products = await Product.find(
            {
              $or: [
                { type: { $regex: regex } },
                { name: { $regex: regex } },
                { "price.currency": { $regex: regex } },
                { "color.name": { $regex: regex } },
                { availableSizes: { $regex: regex } }, 
                { description: { $regex: regex } },
              ]
            }
          )
          .skip(skip) 
          .limit(limitNumber)
          .exec();
          return res.status(200).json(products);
        } catch (e) {
          console.log(e);
          res.status(400).json({ message: 'Ошибка при получении продуктов' });
        }
      }

      async getProductById(req, res){
        try {

          const { id } = req.query;
          const product = await Product.findById(id);
          return res.status(200).json(product);
        } catch (e) {
          console.log(e);
          res.status(400).json({ message: 'Ошибка при получении продуктов' });
        } 
      }

     async setBag(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const obj = req.body;

        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const newBag = new Bag({ userId: userId, product: obj });
        await newBag.save();
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
         const result = data.map((item) => {
          return { ...item.toObject(), userId: undefined };
        });
        return res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 

     async deleteBag(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = req.body;
        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        await Bag.deleteOne({_id: id ,userId: userId})
         return res.status(200).json({message:"bag is del"})
      } catch (e) {
        console.log(e); 
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 
     
     async setLiked(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const obj = req.body;

        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const newBag = new Liked({ userId: userId, product: obj });
        await newBag.save();
         return res.status(200).json({message:"like is added"});
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
         const result = data.map((item) => {
          return { ...item.toObject(), userId: undefined };
        });
        return res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 

     async deleteLiked(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = req.body;
        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        await Liked.deleteOne({_id: id ,userId: userId})
         return res.status(200).json({message:"like is del"})
      } catch (e) {
        console.log(e); 
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 
}

module.exports=new productsController() 