import express from "express";
import isAuthencaticated, { isAdmin } from "../middlewares/authMiddleware.js";
import { createOrder, deleteOrder, getMySingleOrder, getAllOrders, myOrders, getSingleUserOrder, updateOrder, } from "../controllers/orderController.js";
import { profileUpload } from "../middlewares/multer.js"

const router = express.Router()

//For Users
router.post('/create', isAuthencaticated, profileUpload, createOrder)
router.get('/my', isAuthencaticated, myOrders)
router.get('/my/:id', isAuthencaticated, getMySingleOrder)

//Admin Only
router.get('/admin/allOrders', isAuthencaticated, isAdmin('admin'), getAllOrders)
router.get('/admin/order/:id', isAuthencaticated, isAdmin('admin'), getSingleUserOrder)
router.put('/admin/update/:id', isAuthencaticated, isAdmin('admin'), updateOrder)
router.delete('/admin/delete/:id', isAuthencaticated, isAdmin('admin'), deleteOrder)

export default router

