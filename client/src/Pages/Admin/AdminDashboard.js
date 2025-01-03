import React from 'react';
import Layout from ".././../Commponents/Layout/Layout"
import AdminMenu from '../../Commponents/Layout/AdminMenu';
import { useAuth } from '../../Context/AuthContext.js';

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout>
            <div class="container-fluid  p-3 dashboard">
                <div class="row">
                    <div class="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8">
                        <div className="card w-75 p-3">
                            <h3> Admin Name : {auth?.user?.name}</h3>
                            <h3> Admin Email : {auth?.user?.email}</h3>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard