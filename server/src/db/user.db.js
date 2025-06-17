const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/api.error");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = require("../config/server.config");
const ApiResponse = require("../utils/api.response");

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

async function Login(email, password) {
    const user = await User.findOne({ email });
    if (!user){
        throw new ApiError({
            statusCode : eval(StatusCodes.UNAUTHORIZED),
            message : "User not found"
        })
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid){
        throw new ApiError({
            statusCode : eval(StatusCodes.UNAUTHORIZED),
            message : "Wrong Password"
        })
    };

    const token = jwt.sign(
      { userId: user._id, email: user.email },
        JWT_SECRET_KEY,
      {
        expiresIn: JWT_EXPIRATION_TIME || '5h',
      }
    );

    return new ApiResponse({
        statusCode : eval(StatusCodes.OK),
        data : {
            token: token
        },
        message : "User logged in successfully"
    });

}

module.exports={
    getUser,
    Login
}