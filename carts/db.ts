//
// Put all the database access code for mongoDB in this file.
// Remember separation of concerns!
//

import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../types';
import * as dotenv from 'dotenv';

dotenv.config();

// This could prove useful.
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
const mongoDatabase = process.env.MONGO_INITDB_DATABASE;

const connection = async () => {
  const uri = `mongodb://${mongoUser}:${mongoPassword}@localhost:27017`;
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(mongoDatabase);
  const col = db.collection('carts');
  return col;
};

const generateCartId = () => uuidv4();

const createNewCart = async ():Promise<Cart> => {
  try {
    const newCart:Cart = {
      cartId: generateCartId(),
      products: [],
      totalNumberOfItems: 0,
      totalPrice: 0,
    };
    const client = await connection();
    await client.insertOne(newCart);
    await client.close;
    return newCart;
  } catch (error) {
    throw new Error(error);
  }
};

const getCartById = async id => {
  try {
    const client = await connection();
    const data = await client.findOne({ cartId: id });
    await client.close;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateCart = async (cart: Cart) => {
  try {
    const client = await connection();
    await client.updateOne({ cartId: cart.cartId }, { $set: cart });
    await client.close;
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCart = async cartId => {
  try {
    const client = await connection();
    await client.deleteOne({ cartId });
    await client.close;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  createNewCart,
  getCartById,
  updateCart,
  deleteCart,
};
