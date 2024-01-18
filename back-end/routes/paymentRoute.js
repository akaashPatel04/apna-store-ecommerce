import express from "express"
import isAuthencaticated from "../middlewares/authMiddleware.js"
const router = express.Router()


import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OXLM2SI05OwvX4jFOgEnmlX6RgJFb0C4h8z5GjWbAJjr4zCB8WTSfNynHE5I29aUQYA1zwfn94K0OFs8y28QnyI00qcZtqF8e');


router.post('/process', isAuthencaticated, async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).send({ message: 'Please enter Ammount' })
    }
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "inr",
        });

        return res.status(200).json({ client_secret: myPayment.client_secret });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error })
    }
})

export default router