const express=require('express');
const checkController = require('../controllers/check.controller');
const checkRouter=express.Router();

checkRouter.get('/checkRoutes',checkController);

module.exports=checkRouter;