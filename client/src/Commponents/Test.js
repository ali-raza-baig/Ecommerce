import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"
import toast from 'react-hot-toast';
// import SearchInput from '../Form/SearchInput';
const Test = () => {
    const [auth, setauth] = useAuth()

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


        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <li className="nav-item">
                            <NavLink to={"/"} className="nav-link active" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/Catogories"} className="nav-link" >Catogories</NavLink>
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
                                        <li><NavLink to={`/dashboard/${auth?.user.Role === 1 ? 'admin' : 'user'}`} className="dropdown-item">Action</NavLink></li>
                                        <li><NavLink className="dropdown-item">Another action</NavLink></li>
                                        <li className="nav-item">
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
                            <NavLink to={"/cart"} className="nav-link" >Cart(0)</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>



        // {/* <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script> */ }
    )
}

export default Test













// < div className = 'register' >
//             <h1>Register Yourself</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <input type="text"
//                         required
//                         value={name}
//                         onChange={(e) => Setname(e.target.value)}
//                         placeholder='Enter Your Name' className="form-control" id="exampleInputPassword1" />
//                 </div>
//                 <div className="mb-4">
//                     <input type="email"
//                         required
//                         value={email}
//                         onChange={(e) => Setemail(e.target.value)}
//                         placeholder='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                 </div>

//                 <div className="mb-4">
//                     <input type="password"
//                         required
//                         value={password}
//                         onChange={(e) => Setpassword(e.target.value)}
//                         placeholder='password' className="form-control" id="exampleInputPassword1" />
//                 </div>

//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>



//         </ >