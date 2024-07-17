import React , { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/shop';
import About from './pages/About';
import Login from './pages/Login';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationForm from './pages/RegistrationForm';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRout';
import { CartProvider } from './contexts/CartContext';
import Payment from './pages/Payment';
import ShippingForm from './pages/ShippingForm';
import SearchResults from './pages/SearchResults';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <RoutesWithAnimation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </CartProvider>
    </BrowserRouter>
  );
};
  const RoutesWithAnimation = ({ isAuthenticated, setIsAuthenticated }) => {
    const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames= 'page' timeout={400}>
    <Routes location={location}>
    <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/admin/dashboard" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ShippingForm />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;

