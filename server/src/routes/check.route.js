const express=require('express');
const checkController = require('../controllers/check.controller');
const checkRouter=express.Router();

checkRouter.get('/',checkController);

module.exports=checkRouter;