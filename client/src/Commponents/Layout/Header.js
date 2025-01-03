import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../Context/cart';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const Header = () => {
    const [auth, setauth] = useAuth()
    const [cart] = useCart([])
    const handelLogOut = () => {
        setauth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">React <span className='text-danger'>Shop</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><SearchInput /></li>
                            <li className="nav-item">
                                <NavLink to={"/"} className="nav-link active" aria-current="page">Home</NavLink>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to={"/register"} className="nav-link" >SignUp</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to={"/login"} className="nav-link" >Login</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown" style={{ border: "none" }}>
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ border: "none" }}>
                                            {auth?.user.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user.Role === 1 ? 'admin' : 'user'}`} className="dropdown-item">Dashboard</NavLink></li>
                                            <li className="nav-item">
                                                <hr />
                                                <NavLink
                                                    onClick={handelLogOut}
                                                    to={"/login"}
                                                    className="nav-link" >LogOut</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>)
                            }
                            <li className="nav-item">
                                <NavLink to={"/Catogories"} className="nav-link" >Catogories</NavLink>
                            </li>
                            <li className="nav-item">
                                <Badge count={cart.length} showZero>
                                    <NavLink to={"/cart"} className="nav-link" ><ShoppingCartOutlined style={{ fontSize: 23 }} /></NavLink>
                                </Badge>
                            </li>

                        </ul>

                    </div>
                </div >
            </nav >

        </div >
    )
}

export default Header