import express from 'express'
import { allorderscontroller, braintreePaymentController, braintreeTokenController, orderstatuscontroller, userorderControiller } from '../Controlers/PaymentController.js'
import { isadmin, requireSingin } from '../Middelwear/AuthMiddelwear.js'
const routes = express.Router()

// Token 
routes.get('/token', braintreeTokenController)

// Payment 
routes.post('/payments', requireSingin, braintreePaymentController)

// User Order 
routes.get('/order', requireSingin, userorderControiller)

// All Orders 
routes.get('/all-orders', requireSingin, isadmin, allorderscontroller)

// Order Status 
routes.put('/update-status/:pid', requireSingin, isadmin, orderstatuscontroller)

export default routes 