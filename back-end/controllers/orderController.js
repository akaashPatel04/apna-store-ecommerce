import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

//Create new order
export const createOrder = async (req, res) => {
    try {
        const {
            shipingDetail,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body

        const order = await orderModel.create({
            shipingDetail,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        })

        return res.status(201).send({ message: "Order Placed", order })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` })
    }
}

// get Single Order
export const getMySingleOrder = async (req, res) => {
    try {
        const { id } = req.params

        const order = await orderModel.findById(id)
        if (!order) {
            return res.status(400).send("Order not found")
        }

        res.status(200).json({
            order
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
};

// get logged in user  Orders
export const myOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id });
        res.status(200).json({
            orders,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}

// get all Orders -- Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();

        const count = orders.length
        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            totalAmount,
            orders,
            count
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
};

// get Single user Order --Admin
export const getSingleUserOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            return res.status(400).send("Order not found")
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
};

// update Order Status -- Admin
export const updateOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return res.status(400).send("Order not found")
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({ message: "You have already delivered this order" })
        }

        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (o) => {
                await updateStock(o.product, o.quantity);
            });
        }
        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.delieveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        const orders = await orderModel.find()

        res.status(200).json({
            message: "Order status updated",
            data: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
};

async function updateStock(id, quantity) {
    const product = await productModel.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
export const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(400).send("Order not found")
        }

        const orders = await orderModel.find()

        res.status(200).json({
            message: "Order Deleted",
            data: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
};
