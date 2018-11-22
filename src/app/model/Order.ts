import { Cart } from "./Cart";

export interface Order {
    id?:number;
    date:string;
    cart:Cart
}