 type Product = {
   productId: string,
   name: string,
   price: number,
 };

 type PostgresProduct = {
   product_id: string,
   product_name: string,
   product_price: number,
 };

interface ProductForCart extends Product {
  quantity: number
}

 type Cart = {
   cartId : string,
   products: ProductForCart[],
   totalNumberOfItems : number,
   totalPrice : number
 };

export {
  Cart, Product, ProductForCart, PostgresProduct,
};
