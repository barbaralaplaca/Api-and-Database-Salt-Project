import express, { Request, Response, Application } from 'express';
import {
  createCart, getCart, addProductToCart, deleteCart,
} from './carts';
import getProductById from './products';
import { ProductForCart } from './types';

const app: Application = express();
const port = 3000;
app.use(express.json());

// Don't change the code above this line!

// MIDDLEWARES
// - check for quantity > 0
// - check for existing cart
// - check for existing product

// Write your enpoints here

app.route('/api/carts')
  .get((_req: Request, res: Response) => {
    res.json({ message: 'You have reached the Cart API' });
  })
  .post(async (req, res) => {
    try {
      const cart = await createCart();
      res
        .set('location', `/api/carts/${cart.cartId}`)
        .status(201)
        .json(cart);
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.route('/api/carts/:cartId')
  .get(async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await getCart(cartId);
      if (cart === null) {
        res
          .status(404)
          .send({ message: 'cart does not exist' });
      }
      res
        .status(200)
        .json(cart);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .delete((req, res) => {
    try {
      const { cartId } = req.params;
      deleteCart(cartId);
      res
        .status(204)
        .send();
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.post('/api/carts/:cartId/products/', async (req, res) => {
  try {
    const productId: string = req.body.product_id;
    const { quantity } = req.body;
    const { cartId } = req.params;
    const gettingProduct = await getProductById(productId);
    const gettingCart = await getCart(cartId);
    const productForCart: ProductForCart = { ...gettingProduct, quantity };
    // ARRUMAR ADDPRODUCT TO CART
    const cart = await addProductToCart(productForCart, gettingCart);
    console.log(cart, 'this is cart in MAIN index.ts');
    if (cart === null) {
      res
        .status(404)
        .send({ message: 'cart does not exist' });
    }
    res
      .status(201)
      .json(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Don't change the code below this line!
if (require.main === module) {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
}

export = { app };
