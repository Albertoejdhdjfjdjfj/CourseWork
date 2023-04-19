const Router=require('express')
const router=new Router()
const controller=require('../controller/authController')
const{check}=require("express-validator")

router.post('/registration',[
     check('username','Username can not be empty').notEmpty(),
     check('username','Password can not be more 4 and less 10 symbols').isLength({min:4,max:10}),
],controller.registation)
router.post('/login',controller.login)


module.exports=router