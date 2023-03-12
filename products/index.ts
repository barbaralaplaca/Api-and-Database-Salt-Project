import getProduct from './db';

const getProductById = async (productId: string) => {
  const product = await getProduct(productId);
  const newProduct = {
    productId: product.product_id,
    name: product.product_name,
    price: product.product_price,
  };
  return newProduct;
};

export default getProductById;
