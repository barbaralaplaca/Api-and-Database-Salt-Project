import getProduct from './db';

const getProductById = async (productId: string) => {
  const product = await getProduct(productId);
  return product;
};

export default getProductById;
