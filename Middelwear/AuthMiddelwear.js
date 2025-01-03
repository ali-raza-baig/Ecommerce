import jwt from 'jsonwebtoken';
import UserModel from '../Models/UserModel.js';

export const requireSingin = (req, res, next) => {
    try {
        const decode = jwt.verify(req.header("authorization"), process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }

}


// Check Admin 


export const isadmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.Role !== 1) {
            return res.status(200).send({
                sucess: false,
                message: "User not Authorized"
            })
        } else {
            next()


        }
    } catch (error) {
        console.log(error)
    }
}