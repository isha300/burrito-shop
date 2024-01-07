import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import BurritoList from './Screens/BurritoList.js';
import OrderList from './Screens/OrderList';
import OrderForm from './Screens/OrderForm';
import Navigation from './Screens/Navigation';

const App = () => {
  const [burritos, setBurritos] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch burrito products and orders on component mount
    fetch('http://localhost:3001/api/burrito')
      .then((res) => res.json())
      .then((data) => setBurritos(data));

    fetch('http://localhost:3001/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  
  const handleOrderSubmit = (newOrder) => {
    // Handle the submission of the order
    setOrders([...orders, newOrder]);
  };

  const [role, setRole] = useState(null);
  return (
    <BrowserRouter>
      <div>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home setRole={setRole} role={role}/>} />
          <Route path="/burrito-list" element={<BurritoList burritos={burritos}/>} />
          <Route path="/order-list" element={<OrderList orders={orders}/>} />
          <Route path="/order-form" element={<OrderForm burritos={burritos} onOrderSubmit={handleOrderSubmit}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
