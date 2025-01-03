import React, { useEffect, useState } from 'react'
import Layout from '../Commponents/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const SingleProduct = () => {
    const [producte, setProducte] = useState()
    const params = useParams()
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [quantity, setquantity] = useState("")
    const [photo, setphoto] = useState("")
    const [shiping, setshiping] = useState()
    const [category, setCategory] = useState("")
    const [id, setId] = useState("");
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.React_App_API}/api/v1/product/single-products/${params.slug}`)

            setname(data.products.name);
            setphoto(data.products.photo);
            setId(data.products._id);
            setdescription(data.products.description);
            setprice(data.products.price);
            setquantity(data.products.quantity);
            setshiping(data.products.shipping);
            setCategory(data.products.category?._id);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <Layout>
            <div className="container mt-5 mb-5">
                {/* {producte?.map((p, i) => ( */}
                <div className="row mb-2 p-3 card flex-row">
                    <div className="col-md-4">
                        <img
                            src={`${process.env.React_App_API}/api/v1/product/product-photo/${id}`}
                            className="card-img-top"
                            alt={name}
                            width="100px"
                            height={"250px"}
                        />
                    </div>
                    <div className="col-md-8">
                        <p>Product Name: {name}</p>
                        <p>Price : {price}</p>
                        <p>Description : {description.substring(0, 30)}</p>
                    </div>
                </div>
                {/* ))} */}
            </div>
        </Layout>

    )
}

export default SingleProduct