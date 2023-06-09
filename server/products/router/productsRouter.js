const Router=require('express')
const router=new Router()
const controller=require('../controller/productsController')


router.get('/',controller.getAllProducts)
router.post('/bag',controller.addBag)
router.get('/bag',controller.getBag)
router.post('/bag/delete',controller.deleteBag)
router.post('/liked',controller.addLiked)
router.post('/liked/delete',controller.deleteLiked)
router.get('/liked',controller.getLiked)
router.get('/id',controller.getProductById) 
module.exports=router  