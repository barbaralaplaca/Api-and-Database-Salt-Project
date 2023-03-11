import db from './db';
import { Cart, ProductForCart } from '../types';

const createCart = async ():Promise<Cart> => db.createNewCart();

const getCart = async (id:string):Promise<Cart> => db.getCartById(id);

const addProductToCart = async (product:ProductForCart, cart: Cart) => {
  let updatedCart = {
    ...cart,
    products: [{ ...cart.products }, { ...product }],
  };
  const totalNumberOfItems = updatedCart.products
    .map((item: ProductForCart) => item.quantity)
    .reduce((cur, acc) => cur + acc);
  const totalPrice = updatedCart.products
    .map((item: ProductForCart) => item.price)
    .reduce((cur, acc) => cur + acc);
  updatedCart = {
    ...cart,
    totalNumberOfItems,
    totalPrice,
  };
  db.updateCart(updatedCart);
};

const deleteCart = async (cartId: string):Promise<Cart> => db.deleteCart(cartId);

export {
  createCart,
  getCart,
  addProductToCart,
  deleteCart,
};
