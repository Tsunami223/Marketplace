import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/shop';
import Product from './pages/Product';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationForm from './pages/RegistrationForm';

const App =() => {

  return (
    <BrowserRouter>
    <ProductProvider>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/product/:id" element={<Product />}>
        </Route>
    </Routes>
    </ProductProvider>
</BrowserRouter>
  )
}

export default App;

