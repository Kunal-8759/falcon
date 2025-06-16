const mongoose=require('mongoose');

const { MONGO_URI } = require("./server.config");

async function connectToDB(){
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.log('unable to connect to the db server');
        console.log(error);
    }
}

module.exports={
    connectToDB
}