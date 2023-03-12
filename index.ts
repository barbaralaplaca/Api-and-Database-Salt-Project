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

const checkCart = async (req: Request, res: Response, next: any) => {
  const { cartId } = req.params;
  const cart = await getCart(cartId);
  if (!cart) {
    return res
      .status(404)
      .send({ message: 'cart does not exist' });
  } return next();
};

const checkBody = (req, res, next) => {
  if (!req.body.productId || !req.body.quantity) {
    return res
      .status(400)
      .send({ message: 'product not found' });
  } return next();
};

const checkQuantity = (req, res, next) => {
  if (req.body.quantity < 1) {
    return res
      .status(400)
      .send({ message: 'add a product' });
  } return next();
};

const middleware = [checkCart, checkBody, checkQuantity];

// Write your enpoints here

app.route('/api/carts')
  .get((_req: Request, res: Response) => {
    try {
      res.json({ message: 'You have reached the Cart API' });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (_req, res) => {
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
  .get(checkCart, async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await getCart(cartId);
      res
        .status(200)
        .json(cart);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { cartId } = req.params;
      await deleteCart(cartId);
      res
        .status(204)
        .send();
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.post('/api/carts/:cartId/products/', middleware, async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.body;
    const { quantity } = req.body;

    const gettingCart = await getCart(cartId);
    const gettingProduct = await getProductById(productId);
    if (gettingProduct === null) {
      return res
        .status(400)
        .send({ message: 'product not found in the database' });
    }
    const productForCart: ProductForCart = { ...gettingProduct, quantity };
    const cart = await addProductToCart(productForCart, gettingCart);
    return res
      .set('location', `/api/carts/${cart.cartId}/products`)
      .status(201)
      .json(cart);
  } catch {
    res
      .status(500)
      .send({ message: 'There is an error. We are sorry for the incovenient. We are trying to fix it as soon as possible and we hope to provide you a great user experience' });
  }
});

// Don't change the code below this line!
if (require.main === module) {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
}

export = { app };
