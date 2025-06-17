const express=require('express');
const { Register, loginController, authenticateUser } = require('../controllers/user.controller');
const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/login',loginController);
userRouter.post('/auth-user',authenticateUser);

module.exports=userRouter;