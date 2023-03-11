import getProduct from './db';

const getProductById = async productId => getProduct(productId);

export default getProductById;
