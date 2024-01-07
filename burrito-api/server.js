const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;

const corsOptions = {
    origin: 'http://localhost:3000', // frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Burrito entity
class Burrito {
  constructor(id, name, size, price) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.price = price;
  }
}

// OrderItem entity
class OrderItem {
  constructor(burrito, quantity) {
    this.burrito = burrito;
    this.quantity = quantity;
  }
}

// Order entity
class Order {
  constructor(id, items, totalCost) {
    this.id = id;
    this.items = items;
    this.totalCost = totalCost;
  }
}

// Burritos example data
let burritos = [
  new Burrito(1, 'Veggie Burrito', 'regular', 2),
  new Burrito(2, 'Veggie Burrito', 'XL', 4),
  new Burrito(3, 'Chicken Burrito', 'regular', 3),
  new Burrito(4, 'Chicken Burrito', 'XL', 5),
];

// Orders
let orders = [];

// Endpoints

app.get("/api/burrito", function(req, res) {
    res.json(burritos);
});

app.get("/api/orders", function(req, res) {
    res.json(orders);
});

app.get("/api/orders/:id", function(req, res) {
    const orderId = parseInt(req.params.id);
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
        res.status(404).json({ error: 'Order not found' });
    } else {
        res.json(order);
    }
});

// Create an order
app.post('/api/orders', function(req, res) {
    const { items, totalCost } = req.body;
  
    const orderItems = items.map(item => {
        const burrito = burritos.find(b => b.id === item.burritoId);
        return new OrderItem(burrito, item.quantity);
    });

    const newOrder = new Order(orders.length + 1, orderItems, totalCost);

    orders.push(newOrder);
    res.json(newOrder);
});

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);