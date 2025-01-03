import React, { useEffect, useState } from 'react'
import Layout from '../Commponents/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Checkbox, Radio, Card, Button, Image, } from 'antd'
import { prices } from '../Commponents/prices';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../Context/cart'
import { Link } from 'react-router-dom';

const { Meta } = Card;
const HomePage = () => {
    const [products, setproducts] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [checked, setchecked] = useState([])
    const [radio, setradio] = useState([])
    const [cart, setCart] = useCart()

    // Add Item To Cart 
    const AddItem = (p) => {
        setCart([...cart, p])
        localStorage.setItem("cart", JSON.stringify([...cart, p]))
    }


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



    // handle Filter
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setchecked(all)
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getallproducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterproduct();
    }, []);

    // Filter products 
    const filterproduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.React_App_API}/api/vi/product/filter-product`, { checked, radio })
            setproducts(data?.products)
            console.log(data.products)


        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Layout>
            <div className='mb-5'>
                <img
                    alt=''
                    // width={1000} height={200}
                    src="/Images/homepage.jfif"
                    className='homepageimg'
                />
            </div>
            <div className="container-fluid row mt-3 home-page">
                <div className="d-flex flex-wrap">
                    {products.map((p) => (
                        <Card
                            style={{
                                width: 280,
                                margin: 10,
                            }}
                            cover={
                                <img width={250} height={200}
                                    alt={p.name}
                                    src={`${process.env.React_App_API}/api/v1/product/product-photo/${p._id}`}
                                />
                            }
                            actions={[
                                <Button type="primary" size="large" icon={< ShoppingCartOutlined />} onClick={() => { AddItem(p) }}>Add Cart</Button>,
                                <Button type="primary" href={`/view-product/${p.slug}`} size="large" icon={< EditOutlined />} danger>View More</Button>,
                            ]}
                        >
                            <Meta
                                title={p.name}
                                description={p.price}
                            />
                        </Card>

                    ))}
                </div>
            </div>





        </Layout >

    )
}

export default HomePage