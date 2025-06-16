const { StatusCodes } = require("http-status-codes");

async function checkController(req,res){
    try {
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"routes is working perfectly",
            data:"Hello World",
            error:{}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:"something went wrong",
            data:{},
            error:error
        });
    }
}

module.exports=checkController;