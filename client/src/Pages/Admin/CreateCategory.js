import React, { useEffect, useState } from 'react'
import Layout from '../../Commponents/Layout/Layout'
import AdminMenu from '../../Commponents/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../Commponents/Form/Categoryform'
import { Modal } from "antd"

const CreateCategory = () => {
    const [Categories, setCategories] = useState([]);
    const [name, setname] = useState('')
    const [visible, setvisible] = useState(false)
    const [updatename, setupdatename] = useState('')
    const [selected, setselected] = useState(null)

    // create new category 
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.React_App_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${name} is Created`)
                setname("")
                getallcategory()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Category Form")
        }
    }

    // Delete category 
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`${process.env.React_App_API}/api/v1/category/delete-category/${pid}`)
            if (data?.success) {
                toast.success("Category Deleted")
                getallcategory()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Deleting Category")
        }
    }

    // update category 
    const handleupdate = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.put(`${process.env.React_App_API}/api/v1/category/update-category/${selected._id}`, { name: updatename })
            if (data?.success) {
                toast.success(`${updatename} is update`)
                setvisible(false)
                setupdatename("")
                setselected(null)
                getallcategory()

            }
        } catch (error) {
            console.log(error)
            toast.error("Error in updating category")
        }
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
    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className=''>


                            <Categoryform handlesubmit={handlesubmit} value={name} setvalue={setname} />
                        </div>

                        <div className='w-70'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {Categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2'
                                                        onClick={() => { setvisible(true); setupdatename(c.name); setselected(c) }}            >Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => {
                                                        handleDelete(c._id)
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}




                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={() => { setvisible(false) }} footer={null} visible={visible}>
                            <Categoryform handlesubmit={handleupdate}
                                value={updatename} setvalue={setupdatename} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory