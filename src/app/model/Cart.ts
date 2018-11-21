import { CartItem } from "./CartItem";

export interface Cart {
    id?:number;
    code?:string;
    cartItems?:CartItem[]
}