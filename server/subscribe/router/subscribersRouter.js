const Router=require('express')
const router=new Router()
const controller=require('../controller/subscribersController')


router.post('/',controller.setSubscriber)
module.exports=router  