import { Product } from "./Product";
import { Cart } from "./Cart";

export interface CartItem {
    cart?:Cart;
    product:Product;
    quantity:number;
    price:number;
}