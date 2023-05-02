const {Router}=require('express');
const UserModel = require('../models/userModel');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userRouter=Router();

// userRouter.get('/',(req,res)=>{
//     res.send('Welcome to Login Page !')
// })

userRouter.post('/register',async(req,res)=>{
    const {name,email,gender,password} =req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
           const user=new UserModel({name,email,gender,password:hash})
           await user.save();
           res.status(200).send({'msg':'New uer registred !'})
        });
    }catch(error) {
        res.status(400).send({'err':error.message})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} =req.body;
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                var token = jwt.sign({postID:user._id}, 'social');
                res.status(200).send({'msg':'Login successful!',"token":token})
            });
        }else{
            res.status(400).send({'err':"Wrong Credentials"}) 
        }
    } catch (error) {
        res.status(400).send({'err':error.message}) 
    }
})


module.exports=userRouter