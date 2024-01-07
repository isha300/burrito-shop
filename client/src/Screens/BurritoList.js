import React from 'react';

const BurritoList = ({ burritos }) => {
  return (
    <div>
      <h2>Burrito Products</h2>
      <ul>
        {burritos && burritos.map((burrito) => (
          <li key={burrito.id}>
            {burrito.name} - {burrito.size}, ${burrito.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurritoList;
