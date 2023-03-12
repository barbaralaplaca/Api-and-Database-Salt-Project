import getProduct from './db';

const getProductById = async (productId: string) => {
  try {
    const product = await getProduct(productId);
    return product;
  } catch {
    return null;
  }
};

export default getProductById;
