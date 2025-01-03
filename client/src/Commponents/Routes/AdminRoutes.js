import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from "../Spinner";


export default function AdminRoute() {
    const [ok, setok] = useState(false)
    const [auth, setauth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {


            const res = await axios.get(`${process.env.React_App_API}/api/v1/auth/admin-auth`,)
            if (res.data.ok) {
                setok(true)
            } else {
                setok(false)
            }
        }
        if (auth?.token) authCheck()

    }, [auth?.token])


    return ok ? <Outlet /> : <Spinner path="" />
}
// eslint-disable-next-line