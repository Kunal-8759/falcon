const express=require('express');
const serverConfig=require('./config/server.config');
const checkRouter = require('./routes/check.route');
const { connectToDB } = require('./config/db.config');
const userRouter = require('./routes/user.route');
const droneRouter = require('./routes/drone.route');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',checkRouter);
app.use('/',userRouter);
// app.use('/',droneRouter);

app.listen(serverConfig.PORT,async()=>{
    console.log(`server started at port ${serverConfig.PORT}`);
    await connectToDB();
    console.log("successfully connected to the DB");
});