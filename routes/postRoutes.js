const {Router}=require('express');
const postsRouter=Router();
const PostsModel = require('../models/postsModel');


postsRouter.post('/create',async(req,res)=>{
    try {
        const posts=new PostsModel(req.body)
        await posts.save();
        res.status(200).send({'msg':'New post has been added !'})   
    } catch (error) {
        res.status(400).send({'err':error.message})
    }
})

    postsRouter.get('/',async(req,res)=>{
        try {
            const posts=await PostsModel.find({postID:req.body.postID});
            res.status(200).send(posts)
        } catch (error) {
            res.status(400).send({'err':error.message})
        }
        res.send('Welcome to Posts !')
    })

    postsRouter.patch('/update/:id',async(req,res)=>{
        const {id}=req.params
        const posts=await PostsModel.findOne({_id:id});
        try {
            if(req.body.postID!=posts.postID){
                res.status(200).send('Your not an authorized person !')
            }else{
                const upadtePosts=await PostsModel.findByIdAndUpdate({_id:id},req.body,{new:true});
                res.status(200).send(upadtePosts)
            }
        } catch(error) {
            res.status(400).send({'err':error.message})
        }
        res.send('Welcome to Posts !')
    })

    postsRouter.delete('/delete/:id',async(req,res)=>{
        const {id}=req.params
        const posts=await PostsModel.findOne({_id:id});
        try {
            if(req.body.postID!=posts.postID){
                res.status(200).send('Your not an authorized person !')
            }else{
                const deletedPosts=await PostsModel.findByIdAndDelete({_id:id});
                res.status(200).send(deletedPosts)
            }
        } catch(error) {
            res.status(400).send({'err':error.message})
        }
        res.send('Welcome to Posts !')
    })

   module.exports=postsRouter;