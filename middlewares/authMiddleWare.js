const jwt=require('jsonwebtoken')

const Authentication=(req,res,next)=>{
    const token=req.headers.authorization ;
    if(token){
        try {
            const decoded=jwt.verify(token.split(' ')[1], 'social');
            if(decoded){
                console.log('decoded:', decoded)
                req.body.postID=decoded.postID
                next();
            }else{
                res.status(400).send({'err':"Please login first !"}) 
            }
        } catch (error) {
            res.status(400).send({'err':error.message}) 
        }
    }
}

module.exports=Authentication ;