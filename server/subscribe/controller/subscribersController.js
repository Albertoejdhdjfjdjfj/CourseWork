const Subscriber = require('../models/Subscriber')
const secret=require('../secret/config')
const nodemailer=require('nodemailer')

class subscribersController { 
  async setSubscriber(req, res) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
    auth: {
        user: 'modnikky_shop@mail.ru',
        pass: '8QwrRERvrVrAnJyGfRNa'
    }
    });
    
    const mailOptions = {
      from: 'modnikky_shop@mail.ru',
      to: 'bairamukov.albert2003@gmail.com',
      subject: 'Test Email from Node.js', 
      text: 'Hello World!'
    };
    
    // Отправляем сообщение и ожидаем завершения
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    }
  }
  
}
     


module.exports=new subscribersController() 