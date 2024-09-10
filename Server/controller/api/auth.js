const express = require('express')

const LoginRouter = express.Router()
const { loginSchema } = require('../../lib/yup-utils')

LoginRouter.post('/login',async (req,res)=>{
    //login logic goes here ===================================
    const {user,password} = req.body;

    await loginSchema.validate({email:user,password:password})
          .then(()=>{
            
            if(user === "admin555@gmail.com" && password === "HeeHee1234!!") return res.sendStatus(200);
            return res.status(403).json({"msg":"Invalid Email or Password"});

          })


          .catch((err)=>{
            //console.log(err.errors[0])
            //console.log("not passed")
            return res.status(403).json({"msg":err.errors[0]});
          });

    

  
    // ========================================================================
  
  });


  LoginRouter.post('/register',async (req,res)=>{
    //login logic goes here ===================================
    const {user,password} = req.body;
  

    if(user === "admin" && password === "1234") return res.sendStatus(200);
    return res.sendStatus(403);
  
    // ========================================================================
  
  });







module.exports = LoginRouter
