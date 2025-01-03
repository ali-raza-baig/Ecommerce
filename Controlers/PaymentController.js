import braintree from "braintree";
import OrderModal from "../Models/OrderModal.js";
import dotenv from "dotenv";
dotenv.config()
// Braintree GateWay 
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.Braintree_Merchant_ID,
    publicKey: process.env.Braintree_Public_Key,
    privateKey: process.env.Braintree_Private_Key,
});


// token controller 
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// Payment controller 
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map((i) => { total += i.price })
        gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (err, result) {
                if (result) {
                    const order = new OrderModal({
                        producte: cart,
                        payment: total,
                        buyer: req.user._id
                    }).save()
                    res.send({ ok: true })
                } else {
                    console.log(err)
                    res.status(500).send(err)
                }
            }
        )

    } catch (error) {
        console.log(error)
    }

}

// User Order 
export const userorderControiller = async (req, res) => {
    try {
        const orders = await OrderModal.find({ buyer: req.user._id }).populate("producte", "-photo").populate("buyer", "name")
        res.status(200).send({
            success: true,
            message: "User Orders",
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Getting User Order"
        })
    }
}

// allorderscontroller 
export const allorderscontroller = async (req, res) => {
    try {
        const orders = await OrderModal.find({}).populate("producte", "-photo").populate("buyer", "name")
        res.status(200).send({
            success: true,
            message: "User Orders",
            orders
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Getting User Order"
        })
    }
}

// orderstatuscontroller 
export const orderstatuscontroller = async (req, res) => {
    try {
        const { pid } = req.params;
        const { status } = req.body
        const order = await OrderModal.findByIdAndUpdate(pid, { status }, { new: true })
        res.status(200).send({
            success: true,
            message: "Order Update",
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating Order"
        })
    }
}