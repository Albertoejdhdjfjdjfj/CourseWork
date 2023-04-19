const express=require('express')
const mongoose=require('mongoose')
const authRouter=require('./auth/router/authRouter')
const PORT=process.env.PORT || 5000

const app=express()

app.use(express.json())
app.use("/auth",authRouter)


const start=async()=>{
     try{
  mongoose.connect('mongodb+srv://albert:albert26102003@cluster0.3pvs9xw.mongodb.net/?retryWrites=true&w=majority').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
          app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
     }
     catch(e){
          console.log(e)
     }

}

start()