import React, { useEffect, useState } from 'react'
import Layout from '../Commponents/Layout/Layout'
import { useCart } from '../Context/cart'
import { Empty } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { useAuth } from '../Context/AuthContext'
const CartPage = () => {
    const [cart, setCart] = useCart([])
    const [auth, setauth] = useAuth()
    const [clienttoken, setclienttoken] = useState("")
    const [instance, setInstance] = useState("");
    const navigate = useNavigate()
    // Delete Item from Cart 
    const handleDelete = (pid) => {
        try {
            let mycart = [...cart]
            let index = mycart.findIndex(item => item._id === pid)
            mycart.splice(index, 1)
            setCart(mycart)
            localStorage.setItem("cart", JSON.stringify(mycart))

        } catch (error) {
            console.log(error)
        }
    }


    // Total Payment 
    const subtatalPayment = () => {
        try {
            let total = 0
            cart.map((item) => total = total + item.price)
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Payment Geteway Token 
    const paymentToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.React_App_API}/api/v1/payment/token`)
            setclienttoken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        paymentToken()
    }, [auth?.token])

    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.React_App_API}/api/v1/payment/payments`, { nonce, cart })
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            {/*  Cart Start  */}
            {cart.length === 0 ? (<div className='d-flex justify-content-center flex-column'>
                <Empty description={'Cart Empty'} />
                <Link to={'/'} className="m-3 font-weight-bold text-center text-decoration-none" ><h2>Go to Shop</h2></Link>

            </div>) : (<>

                <div>
                    <div className="container-fluid pt-5">
                        <div className="row px-xl-5">
                            <div className="col-lg-8 table-responsive mb-5">
                                <table className="table table-bordered text-center mb-0">
                                    <thead className="bg-secondary text-dark">
                                        <tr>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    {cart.map((item) => (
                                        <tbody className="align-middle">
                                            <tr>
                                                <td className=""><img src={`${process.env.React_App_API}/api/v1/product/product-photo/${item._id}`}
                                                    alt="" style={{ width: 50 }} /> {item.name}</td>
                                                <td className="align-middle">${item.price}</td>
                                                <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Remove</button></td>
                                            </tr>

                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            <div className="col-lg-4">

                                <div className="card border-secondary mb-5">
                                    <div className="card-header bg-secondary border-0">
                                        <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3 pt-1">
                                            <h6 className="font-weight-medium">Subtotal</h6>
                                            <h6 className="font-weight-medium">{subtatalPayment()}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h6 className="font-weight-medium">Shipping</h6>
                                            <h6 className="font-weight-medium">$0</h6>
                                        </div>
                                    </div>
                                    <div className="card-footer border-secondary bg-transparent">
                                        <div className="d-flex justify-content-between mt-2">
                                            <h5 className="font-weight-bold">Total</h5>
                                            <h5 className="font-weight-bold">{subtatalPayment()}</h5>
                                        </div>
                                    </div>
                                    {
                                        !clienttoken || !cart.length ? "" : <>
                                            <div>
                                                <DropIn
                                                    options={{
                                                        authorization: clienttoken,

                                                    }}
                                                    onInstance={instance => setInstance(instance)}
                                                />
                                                <button onClick={handlePayment} className="btn btn-block btn-primary m-3 py-3">Proceed To Checkout</button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
            {/* <!-- Cart End --> */}


        </Layout >
    )
}

export default CartPage