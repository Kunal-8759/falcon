const express=require('express');
const { Register } = require('../controllers/user.controller');
const userRouter=express.Router();

userRouter.post('/register',Register);

module.exports=userRouter;