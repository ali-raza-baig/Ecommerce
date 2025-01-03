import React from 'react'
import Layout from '../../Commponents/Layout/Layout'
import AdminMenu from '../../Commponents/Layout/AdminMenu'
const Users = () => {
    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users