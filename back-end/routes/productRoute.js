import express from "express";
import { createProduct, deleteProduct, deleteReview, getAllProducts, getAllReviews, getOneProduct, reviewHandler, searchedProducts, updateProduct } from "../controllers/productController.js";
import isAuthencaticated, { isAdmin } from "../middlewares/authMiddleware.js";
import { profileUpload } from "../middlewares/multer.js"


const router = express.Router()

//Every One
router.get('/search', searchedProducts)
router.get('/:id', getOneProduct)
router.get('/review/:id', getAllReviews)


//User Only
router.put('/review', isAuthencaticated, reviewHandler)
router.patch('/review', isAuthencaticated, deleteReview)


//Admin Only
router.get('/admin/all', isAuthencaticated, isAdmin('admin'), getAllProducts)
router.post('/create', isAuthencaticated, isAdmin('admin'), profileUpload, createProduct)
router.put('/:id', isAuthencaticated, isAdmin('admin'), profileUpload, updateProduct)
router.delete('/:id', isAuthencaticated, isAdmin('admin'), deleteProduct)

export default router