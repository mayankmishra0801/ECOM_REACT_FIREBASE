// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home'
import Order from './pages/Order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import NoPage from './pages/nopage/NoPage'
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
     
    <MyState>




    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/productinfo/:id' element={<ProductInfo/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/updateproduct' element={<UpdateProduct/>}/>
        <Route path="/*" element={<NoPage/>} />

      </Routes>
      <ToastContainer/>
    </Router>

    </MyState>

  )
}

export default App