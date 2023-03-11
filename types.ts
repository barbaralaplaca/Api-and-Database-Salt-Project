 type Product = {
   productId: string,
   name: string,
   price: number,
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

export { Cart, Product, ProductForCart };
