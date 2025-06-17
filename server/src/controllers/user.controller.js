const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const { getUser , Login} = require("../db/user.db");
const ApiError = require("../utils/api.error");
const { JWT_SECRET_KEY } = require("../config/server.config");

async function Register(req,res){
    try {
        const { email, password } = req.body;
        await getUser(email,password);
        return res.status(StatusCodes.CREATED).json({
            data :{},
            message:"User registered successfully",
            success : true
        });
    } catch (err) {
        if(err instanceof ApiError) {
            return res.status(err.statusCode).json({
                data: {},
                message: err.message,
                success: false
            });
        }
        else{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: "An unexpected error occurred",
                success: false
            });
        }
    }
} 


async function loginController(req,res){
    try {
        const { email, password } = req.body;

        console.log("Login request received with email:", req.body);
        const response = await Login(email, password);
        console.log("Login response:", response);
        return res.status(eval(response.statusCode)).json({
            data: response.data,
            message: response.message,
            success: true
        });
    } catch (err) {

        console.log(err);
        if(err instanceof ApiError) {
            return res.status(err.statusCode).json({
                data: {},
                message: err.message,
                success: false
            });
        }
        else{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: "Internal server error",
                success: false
            });
        }
    }
}

async function authenticateUser(req, res, next) {
    const jwtToken = req.headers["authorization"].split(" ")[1];

    if (!jwtToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {},
            message: "No token provided",
            success: false
        });
    }
    try {
        const verify = jwt.verify(jwtToken, JWT_SECRET_KEY);
        // req.user = verify;
        // next(); 
        return res.status(StatusCodes.OK).json({
            data: {},
            message: "Valid Token",
            success: true
        });
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {},
            message: "Invalid token",
            success: false
        });
    }

}

module.exports = {
    Register,
    loginController,
    authenticateUser
};