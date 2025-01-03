import React, { useState } from 'react'
import Layout from "../../Commponents/Layout/Layout.js";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import "../Style/AuthStyle.css";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext.js';

const Login = () => {
    const navigate = useNavigate()
    const Location = useLocation()

    const [email, Setemail] = useState("")
    const [password, Setpassword] = useState("")

    const [auth, setauth] = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.React_App_API}/api/v1/auth/login`, { email, password })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setauth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))

                navigate(Location.state || "/");

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
            {/* <!-- Registration 13 - Bootstrap Brain Component --> */}
            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="text-center mb-3">
                                        <h1>Login Now</h1>
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to Log In</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-2 overflow-hidden">

                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => Setemail(e.target.value)}
                                                        className="form-control" id="email" placeholder="name@example.com" />
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="password"
                                                        required
                                                        value={password}
                                                        onChange={(e) => Setpassword(e.target.value)}
                                                        className="form-control" id="password" defaultValue placeholder="Password" />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-primary btn-lg" type="submit">Sign in</button>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <p className="m-0 text-secondary text-center">Not have an account? <Link to={"/register"} className="link-primary text-decoration-none">Sign up</Link></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </Layout>
    )
}

export default Login