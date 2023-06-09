const Subscriber = require('../models/Subscriber')
const secretEmail=require('../secret/rootEmail')
const secretPassword =require('../secret/rootPassword')
const nodemailer=require('nodemailer')

class subscribersController { 
  async setSubscriber(req, res) {
    const {email}=req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
    auth: {
        user: secretEmail.email,
        pass: secretPassword.pass
    }
    });
    
    const mailOptions = {
      from: secretEmail.email,
      to: email,
      subject: 'modnikky_shop', 
      text: 'Thank you for choosing us!'
    };
    
    try {
      await transporter.sendMail(mailOptions);
      const subscriber=await Subscriber.findOne({email})
      if(!subscriber){
        const user=new Subscriber({email: email })
        await user.save()
      }
      res.status(200).json('Email sent successfully');
    } catch (error) {
      console.log(error);
      res.status(500).json('Error sending email');
    }
  }
  
}
     


module.exports=new subscribersController() 