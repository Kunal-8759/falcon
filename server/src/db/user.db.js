const User = require("../models/user.model");


const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/api.error");

const bcrypt = require("bcrypt");

async function getUser(email,password){
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ApiError({
                statusCode : eval(StatusCodes.BAD_REQUEST),
                message : "User already exists"
            }
        );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, passwordHash });
    await newUser.save();
}

module.exports={
    getUser,
}