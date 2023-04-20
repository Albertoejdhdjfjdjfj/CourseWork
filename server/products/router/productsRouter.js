const Router=require('express')
const router=new Router()
const controller=require('../controller/productsController')


router.get('/',controller.setProducts)
router.get('/bag',controller.getBag)
router.get('/favorites',controller.getAllProducts)
 
module.exports=router