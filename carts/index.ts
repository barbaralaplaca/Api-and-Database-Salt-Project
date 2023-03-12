import db from './db';
import { Cart, ProductForCart } from '../types';

const createCart = async ():Promise<Cart> => {
  const cart = await db.createNewCart();
  return cart;
};

const getCart = async (id:string):Promise<Cart> => {
  const cart = await db.getCartById(id);
  return cart;
};

const addProductToCart = async (product:ProductForCart, cart: Cart) => {
  const productTotalPrice = product.quantity * product.price;
  const updatedProductsList = cart.products;
  const checkProduct = updatedProductsList.find(item => item.productId === product.productId);
  if (checkProduct !== undefined) {
    const productInd = updatedProductsList.findIndex(item => item.productId === product.productId);
    const updatedProduct = {
      ...checkProduct,
      quantity: Number(checkProduct.quantity) + Number(product.quantity),
      price: Number(checkProduct.price) + Number(productTotalPrice),
    };
    updatedProductsList.splice(productInd, 1, updatedProduct);
    const updatedCart: Cart = {
      cartId: cart.cartId,
      products: updatedProductsList,
      totalNumberOfItems: Number(cart.totalNumberOfItems) + Number(product.quantity),
      totalPrice: cart.totalPrice + productTotalPrice,
    };
    const data = await db.updateCart(updatedCart);
    return data;
  }
  updatedProductsList.push(product);
  const updatedCart: Cart = {
    cartId: cart.cartId,
    products: updatedProductsList,
    totalNumberOfItems: Number(cart.totalNumberOfItems) + Number(product.quantity),
    totalPrice: cart.totalPrice + productTotalPrice,
  };
  const data = await db.updateCart(updatedCart);
  return data;
};

const deleteCart = async (cartId: string) => {
  const cart = await db.deleteCart(cartId);
  return cart;
};

export {
  createCart,
  getCart,
  addProductToCart,
  deleteCart,
};
