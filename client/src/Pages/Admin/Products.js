import React, { useEffect, useState } from 'react'
import Layout from '../../Commponents/Layout/Layout'
import AdminMenu from '../../Commponents/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from "react-router-dom"

const Products = () => {

    const [products, setproducts] = useState([])

    // Get all products 
    const getallproducts = async () => {
        try {
            const res = await axios.get(`${process.env.React_App_API}/api/v1/product/all-products`)
            if (res.data.success) {
                setproducts(res.data?.products)
            }

        } catch (error) {
            console.log(error)
            toast.error("Error in getting products")
        }
    }

    useEffect(() => {
        getallproducts()
        // eslint-disable-next-line
    }, [])

    // Delete products 
    const handledelete = async (pid) => {
        try {
            let answere = window.alert("Are You Sure want to delete this product ?")
            if (answere) return;
            const { data } = await axios.delete(`${process.env.React_App_API}/api/v1/product/delete-product/${pid}`)
            toast.success("Product Deleted Succfully");
            getallproducts()
        } catch (error) {
            console.log(error)
            toast.error("Error in Deleting Product")

        }
    }
    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div>
                            <h1>All Products</h1>
                        </div>
                        <div className="d-flex flex-wrap">
                            {products.map((p) => (
                                <div className="card m-2" key={p._id} style={{ width: '18rem' }}>
                                    <img src={`${process.env.React_App_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <div className="d-flex ">
                                            <Link to={`/dashboard/admin/product/${p.slug}`} className="m-2 btn btn-primary">Update</Link>
                                            <Link className="m-2 btn btn-danger" onClick={() => {
                                                handledelete(p._id)
                                            }}>Delete</Link>
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Products