import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Notfound from './Pages/Notfound';
import Register from './Pages/AuthPages/Register';
import Login from './Pages/AuthPages/Login';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoutes from './Commponents/Routes/PrivateRoutes';
import AdminRoute from "./Commponents/Routes/AdminRoutes"
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateProducts from './Pages/Admin/CreateProducts';
import CreateCategory from './Pages/Admin/CreateCategory';
import Orders from './Pages/Admin/Orders';
import Users from './Pages/Admin/Users';
import OrderUser from './Pages/User/OrderUser';
import UserProfile from './Pages/User/UserProfile';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import CartPage from './Pages/CartPage';
import SingleProduct from './Pages/SingleProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoutes />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<OrderUser />} />
          <Route path="user/profile" element={< UserProfile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProducts />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-product/:slug" element={<SingleProduct />} />
      </Routes>
    </>

  );
}

export default App;
