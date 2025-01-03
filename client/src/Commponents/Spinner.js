import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
    const Navigate = useNavigate()
    const Location = useLocation()

    const [count, setcount] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            setcount((prevalue) => --prevalue)
        }, 1000)
        count === 0 && Navigate(`/${path}`, {
            state: Location.pathname,
        })

        return () => clearInterval(interval);
    }, [count, Navigate, Location.pathname, path])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}>
            <h3>You are Rediracted in {count} seconds</h3>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner