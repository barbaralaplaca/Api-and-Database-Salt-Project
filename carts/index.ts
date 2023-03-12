import db from './db';
import { Cart, ProductForCart } from '../types';

const createCart = async ():Promise<Cart> => db.createNewCart();

const getCart = async (id:string):Promise<Cart> => db.getCartById(id);

const addProductToCart = async (product:ProductForCart, cart: Cart) => {
  const productTotalPrice = product.quantity * product.price;
  const updatedProductsList = cart.products;
  const checkProduct = updatedProductsList.find(item => item.productId === product.productId);
  if (checkProduct !== undefined) {
    const productIndex = updatedProductsList.findIndex(item => item.productId === product.productId);
    const updatedProduct = {
      ...checkProduct,
      quantity: Number(checkProduct.quantity) + Number(product.quantity),
      price: Number(checkProduct.price) + Number(productTotalPrice),
    };
    updatedProductsList.splice(productIndex, 1, updatedProduct);
    const updatedCart: Cart = {
      cartId: cart.cartId,
      products: updatedProductsList,
      totalNumberOfItems: Number(cart.totalNumberOfItems) + Number(product.quantity),
      totalPrice: cart.totalPrice + productTotalPrice,
    };
    return db.updateCart(updatedCart);
  }
  updatedProductsList.push(product);
  const updatedCart: Cart = {
    cartId: cart.cartId,
    products: updatedProductsList,
    totalNumberOfItems: Number(cart.totalNumberOfItems) + Number(product.quantity),
    totalPrice: cart.totalPrice + productTotalPrice,
  };
  return db.updateCart(updatedCart);
};

const deleteCart = async (cartId: string) => db.deleteCart(cartId);

export {
  createCart,
  getCart,
  addProductToCart,
  deleteCart,
};
