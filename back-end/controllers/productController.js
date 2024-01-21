import productModel from "../models/productModel.js";
import getDataUri from "../middlewares/dataUri.js"
import { v2 as cloudinary } from "cloudinary";


//Create a Products --Admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        const image = getDataUri(req.file)

        const myCloud = await cloudinary.uploader.upload(image.content,
            { folder: "products" })

        const { _id } = req.user

        await productModel.create({
            name,
            description,
            price,
            category,
            user: _id,
            stock,
            image: myCloud?.secure_url,
        })

        const products = await productModel.find()

        return res.status(201).send({ message: "Product Created", data: products })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}

//Get all Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        const count = products.length
        return res.status(200).send({ data: products, count })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}

//Get a Product
export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await productModel.findById(id)

        if (!product) {
            return res.status(400).send({ message: "No products found" })
        }

        return res.status(200).send({ data: product })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Serve Error : ${error}` })
    }
}

//Update a Product --Admin
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body

        const avatar = getDataUri(req.file)

        const myCloud = await cloudinary.uploader.upload(avatar.content,
            { folder: "products" })


        const { id } = req.params

        const updatedProduct = await productModel.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            user: req.user._id,
            stock,
            image: myCloud?.secure_url,
        }, { new: true })

        if (!updatedProduct) {
            return res.status(400).send({ message: "No products found" })
        }
        return res.status(200).send({ message: "Product Updated", data: updatedProduct })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}

//Delete a Product --Admin
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await productModel.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(400).send({ message: "No products found" })
        }

        const products = await productModel.find()

        return res.status(200).send({ message: "Product Deleted", data: products })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}

//Products by Search, Filter and Pagination 
export const searchedProducts = async (req, res) => {

    const limit = parseInt(req.query.limit) || 6;

    const startIndex = parseInt(req.query.startIndex) || 0;

    let category = req.query.category
    if (category === undefined || category === 'all') {
        category = {
            $in: ["Electronics",
                "Footwear",
                "Clothes",
                "Games",
                "Property",
                "Camera",
                "Books",
                "SmartPhones",
                "Groccery",
                "Sports",
                "Furniture",
                "Fashion",]
        }
    }

    const searchTerm = req.query.searchTerm || ''
    const searchedProducts = await productModel.find({
        name: { $regex: searchTerm, $options: 'i' },
        category,
    }).limit(limit)
        .skip(startIndex)

    return res.status(200).json({ data: searchedProducts })
}


//Creating or Updating Product Review
export const reviewHandler = async (req, res) => {
    try {
        const { productId, comment, rating } = req.body

        const review = {
            user: req.user._id,
            name: req.user.name,
            avatar: req.user.avatar,
            rating: parseInt(rating),
            comment
        }

        const product = await productModel.findById(productId)

        const isReviwed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

        if (isReviwed) {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString()) (
                    rev.rating = rating, rev.comment = comment
                )
            })
        }
        else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }

        let avg = 0
        product.reviews.forEach((rev) => {
            avg += rev.rating
        })

        product.ratings = avg / product.reviews.length

        await product.save({ validateBeforeSave: false })

        return res.status(200).json({ message: `Review Added` })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}


//Getting all Product Reviews
export const getAllReviews = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findById(id)

        if (!product) {
            return res.status(400).send({ message: "No products found" })
        }

        return res.status(200).json({ data: product.reviews })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}


//Deleting  Product Review 
export const deleteReview = async (req, res) => {
    try {

        const { id } = req.body
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(400).send({ message: "No products found" })
        }

        const reviews = product.reviews.filter((rev) => rev.user.toString() !== req.user._id.toString())

        let avg = 0
        reviews.forEach((rev) => {
            avg += rev.rating
        })

        const ratings = avg / reviews.length
        const numOfReviews = reviews.length

        await productModel.findByIdAndUpdate(id, {
            ratings: ratings || 0,
            numOfReviews: numOfReviews || 0,
            reviews
        }, {
            new: true,
            runValidators: false,
            useFindAndModify: false
        })
        return res.status(200).json({ message: `Review Deleted` })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Serve Error : ${error.message}` })
    }
}