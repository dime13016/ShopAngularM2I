import { Injectable } from '@angular/core';
import { Cart } from './model/Cart';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './model/CartItem';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Product} from "./model/Product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart;
  cartQty:Subject<number>;
  cartQtyObservable:Observable<number>;

  apiUrl:string = "http://localhost:8080";

  constructor(private http:HttpClient) { 
    this.cartQty = new Subject<number>();
    this.cartQty.next(0);
    this.cartQtyObservable = this.cartQty.asObservable();
  }

  getCart() {
    let cartCode = localStorage.getItem("cartCode");
    return this.http.post<Cart>(this.apiUrl+"/cart/",{code: cartCode});
  }

  deleteProduct(cart:Cart, product:Product) {
    console.log("lala")
    return this.http.post(this.apiUrl+"/cartItem/delete",{
      cart_code: cart.code,
      product_id: product.id
    });
  }

  setCart(cart:Cart) {
    this.cart = cart;
    if(!cart) {
      localStorage.removeItem("cartCode");
      this.cartQty.next(0);
    } else {
      let qty = 0;
      for(let i=0; i<cart.cartItems.length; i++) {
        qty += cart.cartItems[i].quantity;
      }
      this.cartQty.next(qty);
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
    return this.http.post(this.apiUrl+"/cartItem",item).pipe(map(
        data => {
            localStorage.setItem('cartCode', data['cart_code']);
            return data;
        }
    ));
  }

}