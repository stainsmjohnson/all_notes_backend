const router = require('express').Router();
const User = require('../models/user')


router.post('/login', async(req, res) => {
    console.log('login')
})

router.post('/signin', async(req, res) => {
    const { name, email, password } = req.body;

    if(!( name && email && password )){
        console.log('field miss')
        
    }
    console.log('object')
    try{
        const user = await new User({
            name,
            email,
            password
        });
        res.json(user);
    }catch(err){
        res.json({ message: err.message })
    }
})


module.exports = router;