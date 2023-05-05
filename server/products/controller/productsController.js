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

     async addBag(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const {id,size} = req.body;

        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId;
        const newBag = new Bag({ userId: userId, productId: id, size:size });
        await newBag.save();
        return res.status(200).json();
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
        const bag = await Bag.find({userId: userId})
        const data = await Promise.all(bag.map(async (item) => {
          const element = await Product.findOne({ _id: item.productId }) 
          element.size=item.size
          return element
        }
        ));
        return res.status(200).json(data);
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
        await Bag.deleteOne({productId: id ,userId: userId})
         return res.status(200).json()
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
        const liked = await Liked.find({userId: userId})
        const likedIds=liked.map(item=>{return item.productId})
        const data = await Product.find({
          _id: { $in: likedIds }  
        });
        return res.status(200).json(data);  
      } catch (e) {
        console.log(e); 
        res.status(400).json({ message: 'Пользователь не авторизован' });
      } 
     } 

     async addLiked(req,res){
      try {
        const token = req.headers.authorization.split(' ')[1];
        const {id} = req.body;
       
        if (!token) {
          return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const userId = jwt.verify(token,secret.secret).userId; 
        const like = await Liked.find({ userId: userId,productId : id })

        if(like.length===0){
        const newLike = new Liked({ userId: userId, productId: id });  
        await newLike.save();
        }
      
         return res.status(200).json(); 
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
        await Liked.deleteOne({productId: id ,userId: userId})
         return res.status(200).json()
      } catch (e) {
        console.log(e); 
        res.status(400).json({ message: 'Пользователь не авторизован' }); 
      } 
     } 
}

module.exports=new productsController() 