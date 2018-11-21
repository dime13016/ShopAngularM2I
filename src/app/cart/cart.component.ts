import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../model/Cart';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Cart = {cartItems: null};
  totalPrice:number = 0;
  constructor(private cartService:CartService, private orderService:OrderService) { 
    this.cartService.getCart().subscribe(
      cart => {
        if(cart) {
          this.cart = cart;
          for(let i=0; i<this.cart.cartItems.length; i++) {
            this.totalPrice += this.cart.cartItems[i].price * this.cart.cartItems[i].quantity;
          }
        }
      }
    )
  }

  ngOnInit() {
  }

  makeOrder() {
    console.log("lala");
    this.orderService.makeOrder(this.cart.code).subscribe(
      order => {
        this.totalPrice = 0;
        this.cart = {cartItems: null};
        this.cartService.setCart(null);
        console.log(order);
      }
    )
  }

}
