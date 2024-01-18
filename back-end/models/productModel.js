import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true,
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'user'
    }
},
    { timestamps: true }
)

const productModel = mongoose.model('product', productSchema)

export default productModel