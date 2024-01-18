import express from "express"
import { Login, Register, deleteProfile, deleteUser, getAllUsers, getUser, updateProfile, updateUserRole } from "../controllers/userController.js"
import isAuthencaticated, { isAdmin } from "../middlewares/authMiddleware.js"
import { profileUpload } from "../middlewares/multer.js"
const router = express.Router()


//Public
router.post('/register', profileUpload, Register)
router.post('/login', Login)


//Private
router.put('/update', profileUpload, isAuthencaticated, updateProfile)
router.delete('/delete', isAuthencaticated, deleteProfile)


//Admin --user configuration
router.get('/admin/all', isAuthencaticated, isAdmin('admin'), getAllUsers)
router.get('/admin/:id', isAuthencaticated, isAdmin('admin'), getUser)
router.put('/admin/:id', isAuthencaticated, isAdmin('admin'), updateUserRole)
router.delete('/admin/:id', isAuthencaticated, isAdmin('admin'), deleteUser)


export default router