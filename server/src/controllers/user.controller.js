const { StatusCodes } = require("http-status-codes");
const { getUser } = require("../db/user.db");

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
        return res.status(err.statusCode).json({
            data :{},
            message:err.message,
            success : false,
        })
    }
} 

module.exports = {
    Register
};