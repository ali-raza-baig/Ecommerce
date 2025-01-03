import React, { useEffect, useState } from 'react'
import Layout from '../../Commponents/Layout/Layout'
import AdminMenu from '../../Commponents/Layout/AdminMenu'
import { Select } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select
const UpdateProduct = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [Categories, setCategories] = useState([]);
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [quantity, setquantity] = useState("")
    const [photo, setphoto] = useState("")
    const [shiping, setshiping] = useState()
    const [category, setCategory] = useState("")
    const [id, setId] = useState("");


    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.React_App_API}/api/v1/product/single-products/${params.slug}`
            );
            setname(data.products.name);
            setphoto(data.products.photo);
            setId(data.products._id);
            setdescription(data.products.description);
            setprice(data.products.price);
            setquantity(data.products.quantity);
            setshiping(data.products.shipping);
            setCategory(data.products.category?._id);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    // get all category 
    const getallcategory = async () => {
        try {
            const res = await axios.get(`${process.env.React_App_API}/api/v1/category/all-categories`)

            if (res.data?.success) {
                setCategories(res.data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in getting categories")
        }

    }

    useEffect(() => {
        getallcategory()

    }, [])

    // Update products 
    const handleupdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            // productData.append("shiping", shiping);


            const res = await axios.put(`${process.env.React_App_API}/api/v1/product/update-product/${id}`, productData);
            // console.log(res)
            if (res.data?.success) {
                toast.error(res.data?.message);
                navigate("/dashboard/admin/products");

            }


        } catch (error) {
            console.log(error)
            toast.error("Error in updating Product")
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
                            <h1>Update Products</h1>
                        </div>
                        <div className='m-1 w-75'>
                            <Select bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3" onChange={(value) => { setCategory(value) }} value={category} >
                                {Categories.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            {/* photo code  */}
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setphoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${process.env.React_App_API}/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>

                        </div>
                        {/* name and other fields  */}
                        <div className="mb-3">
                            <input type="name" value={name}
                                placeholder='Enter Product Name.'
                                className="form-control" onChange={(e) => setname(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="write a Price"
                                className="form-control"
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="write a quantity"
                                className="form-control"
                                onChange={(e) => setquantity(e.target.value)}
                            />
                        </div>
                        {/* Shiping field  */}
                        <div className="mb-3">
                            <Select bordered={false}
                                placeholder="Select Shipping "
                                size="large"
                                showSearch
                                className="form-select mb-3 ms-3" onChange={(value) => setshiping(value)}
                                value={shiping ? "yes" : "No"}>
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>

                            </Select>
                        </div>
                        {/* Button field  */}
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={handleupdate}>
                                Update Product
                            </button>
                        </div>



                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct