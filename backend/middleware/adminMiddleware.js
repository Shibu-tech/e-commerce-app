exports.adminOnly = async (req,res,next) =>{
    if(req.user.role !== "admin"){
        res.status(400).json({
            success:false,
            message:"Access denied"
        });
    }

    next();
}