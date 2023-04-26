# A database-driven Cart API

Project made during bootcamp to practice database skills. Made using Docker, MongoDB and Postgres following the instructions below.

In this exercise, you will create storage for carts in MongoDb and read data from a product database in PostGres SQL. All of the application functionality will be exposed through an API with 4 endpoints.

Here are the endpoints you need to implement:

* POST `/api/carts/` - to create a new cart. To help you get a better understanding of the code structure this has been partially implemented but is still missing the connection to MongoDb.
When this endpoint is invoked you should:
  * Create a new cart in MongoDb
    * create it in a MongoDb database called `saltcarts`, in a collection called `carts` (these are set up in the container config)
  * return suitable status codes (implemented)
  * return the cart with the default cart structure initialised. (implemented)
  * return a location header `/api/cart/:cartId` where the id is the id of the cart. (implemented)
  * There is no request body in this request. An _empty_ cart is always created. (implemented)

* GET `/api/carts/:cartId` - returns the cart data
  * Return the data in the following format, with the appropriate content type. This cart has two example products, but there might be 0.

  ```json
  {
    "cartid" : "82479462-af95-4b88-bcef-4bf8f4261a4a",
    "products": [
      { "productId": "3a9f1a05-390e-4109-8072-ac7a1caa7001", "name": "A key ring", "price": 0.85, "quantity": 2},
      { "productId": "fe3e8d33-a0bc-4606-b1b3-eb59b645b94b", "name": "Playing cards", "price": 4.85, "quantity": 4}
    ],
    "totalNumberOfItems" : 6,
    "totalPrice" : 21.1
  }
  ```

  * use suitable status codes for success and failure
    * for failure - return a body like this `{ message: 'A description of the error'}`

* POST `/api/carts/:cartId/products/` - add a product to the given cart
  * Post the id of the product and the quantity to the endpoint:

  ```json
  { "productId": "fe3e8d33-a0bc-4606-b1b3-eb59b645b94b", "quantity": 123 }
  ```

  * Get the cart from MongoDb, using the `:cartId` parameter
  * Get the product information (name, description, price) from PostGres SQL using the product `id` in the posted body.
    * The valid product ids are initialized through a script (`./containerConfig/initSql.sql`), so you can pick up valid ids from that script. Or by opening the pgAdmin tool, and check the `public.salt_products` table.
  * Add the products to the cart products, with the quantity.
  * Re-calculate the `totalPrice` and `totalNumberOfItems`
  * Store the updated cart to MongoDb
  * Return the updated cart data, using correct REST principles

* DELETE `/api/carts/:cartId` - delete the cart
  * Use the cartId in the request to remove the cart.
  * Apply proper rest principles.

