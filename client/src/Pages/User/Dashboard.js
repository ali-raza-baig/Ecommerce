import React from 'react'
import Layout from '../../Commponents/Layout/Layout'
import UserManu from '../../Commponents/Layout/UserManu.js'
import { useAuth } from '../../Context/AuthContext.js'

const Dashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout>
            <div className="container-flui p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserManu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>{auth?.user?.name}</h3>
                            <h3>{auth?.user?.email}</h3>
                            <h3>{auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard