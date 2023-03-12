import db from './db';
import { Cart, ProductForCart } from '../types';

const createCart = async ():Promise<Cart> => db.createNewCart();

const getCart = async (id:string):Promise<Cart> => db.getCartById(id);

const addProductToCart = async (product:ProductForCart, cart: Cart) => {
  const productTotalPrice = product.quantity * product.price;
  const updatedProductsList = cart.products;
  updatedProductsList.push(product);

  const updatedCart: Cart = {
    cartId: cart.cartId,
    products: updatedProductsList,
    totalNumberOfItems: cart.totalNumberOfItems + product.quantity,
    totalPrice: cart.totalPrice + productTotalPrice,
  };
  return db.updateCart(updatedCart);
};

const deleteCart = async (cartId: string):Promise<Cart> => db.deleteCart(cartId);

export {
  createCart,
  getCart,
  addProductToCart,
  deleteCart,
};
