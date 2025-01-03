import React, { useEffect, useState } from 'react'
import Layout from '../../Commponents/Layout/Layout'
import AdminMenu from '../../Commponents/Layout/AdminMenu'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { Select } from 'antd';
const Orders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.React_App_API}/api/v1/payment/all-orders`);
            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };
    const handlechange = async (pid, value) => {
        try {
            await axios.put(`${process.env.React_App_API}/api/v1/payment/update-status/${pid}`, { status: value })
            getOrders()

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (auth.token) getOrders()
    }, [auth.token]);
    return (
        <Layout>
            <div className="container-fluid  p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>Manage Orders</h1>
                        {orders.map((order, i) => {
                            return (
                                <div className='border shadow'>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        {orders.length > 0 ? (
                                            <tbody>
                                                <tr key={order._id}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <Select bordered={false} onChange={(value) => handlechange(order._id, value)} defaultValue={order.status}>
                                                            {status.map((s, i) => (
                                                                <Select.Option key={i} value={s}>{s}</Select.Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{order.payment}</td>
                                                    <td>{order.producte.length}</td>
                                                </tr>
                                            </tbody>


                                        ) : (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="5" className="text-center">No orders found</td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                    <div className="container">
                                        {order?.producte?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={`${process.env.React_App_API}/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price : {p.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders