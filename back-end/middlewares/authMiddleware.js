import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js'


const isAuthencaticated = async (req, res, next) => {
    try {
        let token

        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Not authorized, no token' })
        }

        //Getting the Token from header -- Authorization
        token = req.headers.authorization.split(' ')[1]

        //Verify Token
        const decode = jwt.verify(token, 'JWT_SECRET')

        //Get user data
        req.user = await userModel.findById(decode.id).select('-password')

        next()

    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'Not authorized', error: error.message })
    }
}


export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "You are not Authorized to access this feature" })
        }
        next()
    }
}

export default isAuthencaticated