import React , { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/shop';
import Product from './pages/Product';
import About from './pages/About';
import Login from './pages/Login';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationForm from './pages/RegistrationForm';
import Spinner from './components/Spinner';


const App =() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <BrowserRouter>
        <Navbar/>
      {loading ? (
        <Spinner />
      ) : (
        <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/product/:id" element={<Product />}>
        </Route>
    </Routes>
    </>
      )}
    </BrowserRouter>
  );
};

export default App;

