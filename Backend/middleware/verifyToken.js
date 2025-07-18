import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import { ERROR } from '../utils/HttpStatus.js';
export const verifyToken=(req,res,next) => {
const token =req.cookies.token
if(!token)
{
    const error = AppError.create("unauthorized -no token provided", 401, ERROR)
    return next(error);
}

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        const error = AppError.create("unauthorized -invalid token", 401, ERROR)
        return next(error);
    }
    req.userId=decoded.userId;
    next();
}catch(err){
    console.log("erorr in verifyToken",err);
    return res.status(500).json({success:false,message:"server error"})

}
}