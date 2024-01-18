import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Register || POST || Public
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const avatar = req.file

        //verify existing User 
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(400).send({
                message: "This email is already used, try diffrent one"
            })
        }

        //Password Hash
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            avatar: avatar?.path,
        })

        return res.status(201).json({
            message: 'Account Created',
            token: generateToken(createdUser._id),
            user: {
                name: createdUser.name,
                email: createdUser.email,
                avatar: createdUser.avatar,
                _id: createdUser._id,
                role: createdUser.role
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error })
    }
}

//Login || POST || Public
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //User Exists -- Email checking
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).send({
                message: "Invalid email or password"
            })
        }

        //Password Comparing
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).send({
                message: "Invalid email or password"
            })
        }

        return res.status(200)
            .send({
                message: `Logged In as ${user.name}`,
                token: generateToken(user._id),
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    _id: user._id,
                    role: user.role
                }
            })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message })
    }
}

//Update user profile || UPDATE
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.user
        const avatar = req.file

        const user = await userModel.findByIdAndUpdate(id,
            {
                email: req.body.email || req.user.email,
                name: req.body.name || req.user.name,
                avatar: avatar?.path || req.user.avatar,
                password: req.user.password
            }
            , { new: true })

        if (!user) {
            return res.status(400).send({ message: "User not Found!" })
        }

        return res.status(200).send({
            message: 'Profile Updated',
            user: { name: user.name, email: user.email, avatar: user.avatar, _id: user._id }
        })

    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error.message })
    }
}

//Delete user profile || DELETE
export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.user

        const user = await userModel.findByIdAndDelete(id)

        if (!user) {
            return res.status(401).send({ message: "User not Found!" })
        }

        return res.status(200).send({ message: 'Account deleted Successfully' })

    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error })
    }
}


// ------------------------------------------------------------------
//ADMIN -- ()

//Getting all users (--Admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        const count = users.length

        return res.status(200).send({ count, data: users })
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error })
    }
}

//Getting a single user Info (--Admin)
export const getUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userModel.findById(id)

        if (!user) {
            return res.status(400).send({ message: "User not Found!" })
        }

        return res.status(200).send({ data: user })
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error })
    }
}

//Update user profile || UPDATE
export const updateUserRole = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params

        const user = await userModel.findByIdAndUpdate(id, data, { new: true })

        if (!user) {
            return res.status(400).send({ message: "User not Found!" })
        }

        const users = await userModel.find()
        return res.status(200).send({ message: 'User Role updated', data: users })

    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error })
    }
}

//Delete user profile || DELETE
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findByIdAndDelete(id)

        if (!user) {
            return res.status(400).send({ message: "User not Found!" })
        }

        const users = await userModel.find()

        return res.status(200).send({ message: 'User deleted!', data: users })

    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error })
    }
}


const generateToken = (id) => {
    return jwt.sign({ id }, 'JWT_SECRET', {
        expiresIn: '7d'
    })
}