const Router=require('express')
const router=new Router()
const controller=require('../controller/productsController')


router.get('/',controller.getAllProducts)
router.post('/bag',controller.setBag)
router.get('/bag',controller.getBag)
router.post('/liked',controller.setLiked)
router.get('/liked',controller.getLiked)

module.exports=router 