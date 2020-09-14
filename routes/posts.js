const router = require('express').Router();
const Post = require('../models/post')


//GET ALL POSTS
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();   //add limit and offset
        res.json(posts);
    }catch(err){
        res.json({message: err.message});
    }
})

//GET ONE POST
router.get('/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const post = await Post.findById(id);
        res.json(post)
    }catch(err){
        res.json({message: err.message})
    }
})


//NEW POST
router.post('/', async(req, res) => {
    const { title, desc } = req.body;
    const post = new Post({
        title,
        desc
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost)
    }catch(err){
        res.json({ message: err.message })
    }    
});


//DELETE A POST
router.delete('/:id', async(req, res) => {
    const { id } = req.params; 
    try{
        const removedPost = await Post.remove({
            _id: id
        });
        res.json(removedPost)
    }catch(err){
        res.json({ message: err.message })
    }
})


//UPDATE A POST
router.patch('/:id', async(req, res) => {
    const { id } = req.params; 
    const { title, desc } = req.body;
    try{
        const updatedPost = await Post.updateOne({
            _id: id
        },{
            $set: { title }
        });
        res.json(updatedPost)
    }catch(err){
        res.json({ message: err.message })
    }
})

module.exports = router;