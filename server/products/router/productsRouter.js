const Router=require('express')
const router=new Router()
const controller=require('../controller/productsController')


router.get('/',controller.getAllProducts)
router.get('/bag',controller.getBag)
router.get('/favorites',controller.getFavoritesProducts)

module.exports=router