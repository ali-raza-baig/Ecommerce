import React, { useState } from 'react'
import Layout from "../../Commponents/Layout/Layout.js";
import { useNavigate, Link } from 'react-router-dom';
import "../Style/AuthStyle.css";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Register = () => {
    const navigate = useNavigate()
    // const [name, Setname] = useState("")
    // const [email, Setemail] = useState("")
    // const [password, Setpassword] = useState("")

    const handleSubmit = async (values) => {
        try {
            const res = await axios.post(`${process.env.React_App_API}/api/v1/auth/register`, values)
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");

            } else {
                toast.error(res.data.message);

            }
        } catch (error) {
            console.log(error)
            toast.error("Something is went Wrong")
        }
    }

    return (
        <Layout>
            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="text-center  mb-3">
                                        <h1> Register Now</h1>
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                                    <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={values => handleSubmit(values)}   >

                                        <Form>
                                            <div className="row gy-2 overflow-hidden">
                                                <div className="col-12">
                                                    <div className="form-floating mb-3">
                                                        <Field type="text" name="name" className="form-control" id="firstName" placeholder="First Name" required />
                                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating mb-3">
                                                        <Field type="email" name="email" className="form-control" id="email" placeholder="name@example.com" required />
                                                        <label htmlFor="email" className="form-label">Email</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating mb-3">
                                                        <Field type="password" name="password" className="form-control" id="password" defaultValue placeholder="Password" required />
                                                        <label htmlFor="password" className="form-label">Password</label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="d-grid my-3">
                                                        <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <p className="m-0 text-secondary text-center">Already have an account? <Link to={"/login"} className="link-primary text-decoration-none">Sign in</Link></p>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>

    )
}

export default Register