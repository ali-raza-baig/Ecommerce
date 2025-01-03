import React from 'react'
import Layout from '../../Commponents/Layout/Layout'
import UserManu from '../../Commponents/Layout/UserManu'

const UserProfile = () => {
    return (
        <Layout>
            <div className="container-flui p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserManu />
                    </div>
                    <div className="col-md-9">
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UserProfile