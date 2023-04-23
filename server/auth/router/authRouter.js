const Router=require('express')
const router=new Router()
const controller=require('../controller/authController')
const{check}=require("express-validator")

router.post('/registration',[
     check('firstname').isLength({min:3,max:20}),
     check('lastname').isLength({min:3,max:20}),
     check('email').isEmail(),
     check('password').isLength({min:4,max:10}),
],controller.registation)
router.post('/login',controller.login)


module.exports=router