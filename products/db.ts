// put the database access code for PGSQL in this file

import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { Product } from '../types';

dotenv.config();

/*
 return the product data in the following format.
 The initSQL file will give you enough information about the schema.
 {
    productId: (the product ID)
    name: (the product name),
    price: (the price)
}
*/
const postgresUser = process.env.POSTGRES_USER;
const postgresPassword = process.env.POSTGRES_PASSWORD;
const postgresDatabase = process.env.POSTGRES_DATABASE;
const QUERY = 'SELECT product_id, product_name, product_price FROM salt_products WHERE product_id = $1';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: postgresDatabase,
  user: postgresUser,
  password: postgresPassword,
});

const getProduct = async (productId: string):Promise<Product> => {
  try {
    const client = await pool.connect();
    const res = await client.query(QUERY, [productId]);
    if (res.rowCount !== 1) {
      throw new Error(`More than one product found for ${productId}`);
    }
    const data = await res.rows[0];

    const product: Product = {
      productId: data.product_id,
      name: data.product_name,
      price: data.product_price,
    };

    client.release();
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

export default getProduct;
