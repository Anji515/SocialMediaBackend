const mongoose=require('mongoose');

const postsSchema=mongoose.Schema(
{
title :{type:String,required:true},
body :{type:String,required:true},
device :{type:String,required:true},
postID:{type:String,required:true}
},{
    versionKey:false
})

const PostsModel=mongoose.model('post',postsSchema);

module.exports=PostsModel ;