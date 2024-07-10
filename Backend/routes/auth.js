const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const JWT_SECRET='Harryisagoodboy';
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
//Route 1: create a user using:POST '/api/auth/'
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:4}),
    body('email','enter an email').isEmail(),
    body('password','invalid password ').isLength({min:5})
],async(req,res)=>{
    // const errors=validationResult(req);
    // if(!errors.isEmpty())
    // {
    //     return res.status(400).json({errors:errors.array()})
    // }
    //  console.log(req.body);
    // User.create({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password,

    // }).then(User=>res.json(User));
    // let user= await User.findOne({email:req.body.email});
    // console.log(user);
    // if(user){
    //     return res.status(400).json({error:"sorry a user with this email already exist"})
    // }
    // try{
        // user=User(req.body);
        // user.save(),
        // res.send(req.body);
    // }catch(error)
    // {
    //     if(error.code===11000)
    //     {
    //         return res.status(400).json({error:'error already exist'});
    //     }
    //   console.log(error); 
    // }
//    res.json(user);
// try {
//     console.log(req.body);

//     // Check if user with the given email already exists
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//         return res.status(400).json({ error: 'Email already in use' });
//     }

//     // Create a new user
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send(user);
// } catch (error) {
//     // Handle duplicate key error
//     if (error.code === 11000) {
//         return res.status(400).json({ error: 'Duplicate key error: email already in use' });
//     }
//     res.status(500).send(error);
// }

const errors=validationResult(req);
if(!errors.isEmpty())
{
    return res.status(400).json({errors:errors.array()});
}


try {
    console.log(req.body);

    // Check if user with the given email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: 'Email already in use' });
    }
   const salt=await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt);
    // Create a new user
    user=await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email,
    });
    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    // console.log(jwtData); 
    // res.status(201).json(user);
    res.json({authToken});
} catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate key error: email already in use' });
    }
    res.status(500).send(error);
}
})

//Route 2:create a login using:POST '/api/auth/login'
 router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','cannot be blank').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
   const {email,password}=req.body;
   console.log('Login attempt:', email);
   try{
        let user=await User.findOne({email});
        if(!user)
        {
            console.log('User not found:', email);
            return res.status(400).json({error:"login with correct credentials"});
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            console.log('Incorrect password for user:', email);
            return res.status(400).json({error:"login with correct credentials"});
        }
        const payLoad={
            id:user.id
        }
        const authToken=jwt.sign(payLoad,JWT_SECRET);
        res.json({authToken});
   }catch(error)
   {
    if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate key error: email already in use' });
    }
    res.status(500).send(error);
   }
})


//Route 3:loggedin user using:POST '/api/auth/getUser'
router.post('/getuser',fetchuser,async(req,res)=>{
  try{
    console.log('Request user:', req.user);
    const userId=req.user.id;
    const user=await User.findById(userId).select('-password');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  res.send(user);
  }catch(error)
   {
    console.error(error);
    if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate key error: email already in use' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
   }
})
module.exports =router;