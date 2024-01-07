import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = ({ setRole, role }) => {
  return (
    <div>
      <h1>Welcome to Everyrealm Burrito Shop!</h1>
      <div>
        <button
          onClick={() => setRole('customer')}
          style={{
            marginRight: '10px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
          }}
        >
          I'm a customer
        </button>
        <button
          onClick={() => setRole('employee')}
          style={{
            marginRight: '10px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
          }}
        >
          I'm an employee
        </button>
      </div>

      {role === 'customer' && (
        <div>
          <h2>Customer Actions</h2>
          <NavLink to="/burrito-list">
            <button type="button">View Burrito Products</button>
          </NavLink>
          <br />
          <NavLink to="/order-form">
            <button type="button">Create an Order</button>
          </NavLink>
        </div>
      )}

      {role === 'employee' && (
        <div>
          <h2>Employee Actions</h2>
          <NavLink to="/order-list">
            <button type="button">View Existing Orders</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Home;