import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import Test from '../Test';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {/* <Test /> */}
            {/* style={{ height: "80vh" }} */}

            <main >
                <Toaster />
                {children}
            </main>

            <Footer />
        </div>

    )
}

export default Layout