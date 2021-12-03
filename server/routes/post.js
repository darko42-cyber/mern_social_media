const router = require('express').Router()
const Post = require('../models/Post.js')
const User = require('../models/User.js')

//? creation of a post 
router.post('/', async (req, res)=>{

    const post = new Post(req.body)

    try {
        const newPost = await post.save()
        res.status(200).json(newPost)
        
    } catch (error) {
        res.status(500).send(error)
    }
    
})


//todo updating a post 
router.put('/:id', async (req, res)=>{
   try {
       const post = await Post.findById(req.params.id)
       if(post.userId === req.body.userId){
           await post.updateOne({$set: req.body})
           res.status(200).json('post has been updated')
       }else{
           res.status(403).json('You can only update your post')
       }
       
   } catch (error) {
       res.status(500).json(error)
       
   }
})


router.delete('/:id', async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json('post has been deleted')
        }else{
            res.status(403).json('You can only delete your post')
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
 })


//!  Liking and disliking posts

 router.put('/:id/likes', async (req, res)=>{
     try {
         const post = await Post.findById(req.params.id)
         if(!post.likes.includes(req.body.userId)){
             await post.updateOne({$push: {likes: req.body.userId}})
             res.status(200).send('Post has been liked')
         }else{
             await post.updateOne({$pull: {likes: req.body.userId}})
             res.status(403).send("Post has been successfully disliked")
         }
         
     } catch (error) {
         res.status(500).send(error.message)
         
     }

 })

//todo  fetching a single post
 
 router.get('/:id', async (req, res)=>{
     const post = await Post.findById(req.params.id)
     !post && res.status(404).send('No post could be found')
     return res.status(200).send(post)
 })


//?  fetching timeline post


router.get('/timeline/:userId', async (req, res)=>{

    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=> {
               return Post.find({userId: friendId})
            })
        )
        
        res.json(userPosts.concat(...friendPosts))
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})


//? Get all single user's post

router.get('/profile/:username', async (req, res)=>{
    try {
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({userId: user._id})
        res.status(200).send(posts)
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})









module.exports = router