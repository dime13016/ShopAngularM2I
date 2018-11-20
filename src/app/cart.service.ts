import { Injectable } from '@angular/core';
import { Cart } from './model/Cart';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  getCart() {
    if(localStorage.getItem("cart_code")) {
      let cartId = localStorage.getItem("cart_code");
      return this.http.get<Cart>(this.apiUrl+"/cart/"+cartId);
    } else {
      return null;
    }
  }

  addCartItem(cartItem:CartItem) {
    let cartCode:string = null;
    if(cartItem.cart) {
      cartCode = cartItem.cart.code;
    }
    let item = {
      product_id : cartItem.product.id,
      cart_code : cartCode,
      quantity : cartItem.quantity,
      price : cartItem.price
    };
    return this.http.post(this.apiUrl+"/cartItem",item);
  }
}