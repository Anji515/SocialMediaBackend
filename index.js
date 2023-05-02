const express=require('express');
const connection = require('./config/db');
const userRouter = require('./routes/userRouter');
const Authentication = require('./middlewares/authMiddleWare');
const postsRouter = require('./routes/postRoutes');
require('dotenv').config();
const app=express();

app.use(express.json());
app.use('/users',userRouter)

app.use(Authentication)
app.use('/posts',postsRouter)

app.listen(process.env.port||4500 ,async()=>{
      try {
        await connection
        console.log('Connected to DB')
      } catch (error) {
        console.log(error.message)
      }
      console.log(`Server is running at Port ${process.env.port}`)
})

