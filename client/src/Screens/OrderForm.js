import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ burritos, onOrderSubmit }) => {
  const [selectedBurritos, setSelectedBurritos] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBurritoChange = (event, burrito) => {
    const quantity = parseInt(event.target.value, 10);
    const existingBurrito = selectedBurritos.find((b) => b.id === burrito.id);

    if (existingBurrito) {
      const updatedBurritos = selectedBurritos.map((b) =>
        b.id === burrito.id ? { ...b, quantity } : b
      );
      setSelectedBurritos(updatedBurritos);
    } else {
      setSelectedBurritos([...selectedBurritos, { ...burrito, quantity }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const orderItems = selectedBurritos.map((item) => ({
      burritoId: item.id,
      quantity: item.quantity,
    }));
  
    const orderTotal = selectedBurritos.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    setTotalCost(orderTotal);

    if (orderTotal === 0) {
      alert("Please select at least one burrito for the order.");
    } else {
      const order = {
        items: orderItems,
        totalCost: orderTotal,
      };
    
      // Call the onOrderSubmit callback to submit the order
      try {
        const response = await fetch('http://localhost:3001/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
    
        if (!response.ok) {
          throw new Error('Error submitting order');
        }
    
        const newOrder = await response.json();
        onOrderSubmit(newOrder);
    
        // Set the submission status to true
        setSubmitted(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleReturnToHome = () => {
    // Reset the form and navigate back to the Home page
    setSelectedBurritos([]);
    setTotalCost(0);
    setSubmitted(false);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {submitted ? (
        <div>
          <h2>Order Submitted Successfully!</h2>
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
          <button
            type="button"
            onClick={() => {
              // Reset the form and submission status
              setSelectedBurritos([]);
              setTotalCost(0);
              setSubmitted(false);
            }}
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Create Another Order
          </button>
          <button
            type="button"
            onClick={handleReturnToHome}
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Return to Home
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Create an Order</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Select Burritos:
              </label>
              {burritos.map((burrito) => (
                <div key={burrito.id} style={{ marginBottom: '10px' }}>
                  <label style={{ marginRight: '10px' }}>
                    {burrito.name} - {burrito.size}, ${burrito.price}:
                    <input
                      type="number"
                      min="0"
                      value={
                        selectedBurritos.find((b) => b.id === burrito.id)?.quantity ||
                        0
                      }
                      onChange={(e) => handleBurritoChange(e, burrito)}
                      style={{ marginLeft: '10px' }}
                    />
                  </label>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Submit Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
