import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    shipingDetail: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true,
            default: 'India'
        },
        country: {
            type: String,
            required: true,
            default: 'India'
        },
        pinCode: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'product',
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'user'
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Proccessing"
    },
    delieveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const orderModel = mongoose.model('order', orderSchema)

export default orderModel