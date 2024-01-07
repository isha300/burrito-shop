import React, { useState } from 'react';

const OrderList = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderId ? null : orderId
    );
  };

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              Order #{order.id} - Total: ${order.totalCost.toFixed(2)}
            
            <button
              type="button"
              onClick={() => toggleOrderDetails(order.id)}
              style={{
                padding: '5px',
                fontSize: '12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                marginLeft: '10px', // Adjust the margin as needed
              }}
            >
              {expandedOrder === order.id ? '- Details' : '+ View Details'}
            </button>
            </div>
            {expandedOrder === order.id && (
              <table style={{ marginTop: '10px', width: '100%' }}>
                <thead>
                  <tr>
                    <th>Burrito</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.map((item) => (
                    <tr key={item.burrito.id}>
                      <td>{item.burrito.name}, {item.burrito.size}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ${(item.burrito.price)
                          ? (item.burrito.price * item.quantity).toFixed(2)
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;