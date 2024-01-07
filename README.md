# Overview
Burrito Shop is a full-stack application supporting a burrito shop's point of sales and ordering system. The app runs locally as a Docker container.

The backend set of APIs focuses on endpoints necessary to enable a front end client supporting customers ordering burritos. 
The following entities are created in the backend, with proper relationships:
- Burrito - has a name, size, and price (e.g. "Veggie Burrito", "regular, $2", "XL, $4")
- Order - has order items and total cost
- OrderItem - burrito and quantity

The following endpoints return a JSON response:
- /api/burrito - list of burrito products
- /api/orders - list of orders, submit an order
- /api/orders/id - details of an individual order

Additionally, a user frontend exercises the APIs and is accessed by customers or employees. 
A customer can view the list of burrito products and create an order. 
An employee can view the list of existing orders and view the details for a specific order.

**Technologies Used: React (frontend), NodeJS (backend), Docker** 

**Author: Isha Kabra**

# Build and Run Project
Run `docker-compose up --build` in the root directory of the project. Then navigate to http://localhost:3000 to see the home page of the application.

# Test Functionality
1. (Backend) Navigate to http://localhost:3001/api/burrito to view a list of all burritos on the menu in JSON format.
2. (Backend) Navigate to http://localhost:3001/api/orders to view a list of all orders currently in the system in JSON format.
3. (Backend) Navigate to http://localhost:3001/api/order/{id} to view details of a specific order in JSON format.
4. Click "I'm a customer" on the home page and then the "View Burrito Products" button to view the list of all burrito products at the shop.
5. Click "I'm a customer" on the home page and then the "Create an Order" button. Specify options and press "Submit Order" to place an order. If the customer tries to submit an empty order, they will see an error
message; otherwise, the order will be submitted. Choose to either create another order or return to home.
6. Click "I'm an employee" on the home page and then the "View Existing Orders" button to view a list of all orders at the shop.
7. On the Order List page, press the "+ View Details" button next to any order to see its details. Press "- Details" to hide the details.
8. Press "Home" in the top left at any time to return to the home page.
