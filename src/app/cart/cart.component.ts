import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../model/Cart';
import { OrderService } from '../order.service';
import {CartItem} from "../model/CartItem";
import {AuthenticationService} from "../authentication.service";
import {User} from "../model/User";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cart:Cart = {cartItems: []};
    totalPrice:number = 0;
    user:User;
    constructor(private cartService:CartService, private orderService:OrderService,
                private authenticationService:AuthenticationService) {
        this.cartService.getCart().subscribe(
            cart => {
                if(cart) {
                    this.cart = cart;
                    this.updateTotalPrice();
                }
            }
        )
        this.user = this.authenticationService.getCurrentUser();
    }

    ngOnInit() {
    }

    makeOrder() {
        this.orderService.makeOrder(this.cart.code).subscribe(
          order => {
            this.totalPrice = 0;
            this.cart = {cartItems: []};
            this.cartService.setCart(null);
            console.log(order);
          }
        );
    }

    updateItem(item:CartItem) {
        if(item.quantity>0 && item.quantity <= item.product.quantity) {
            let cartItem:CartItem = {cart: this.cart, product:item.product, quantity:item.quantity, price:item.price};
            console.log(cartItem)

            this.cartService.addCartItem(cartItem).subscribe(
                data => {
                    this.cartService.getCart().subscribe(
                        cart => {
                            this.cart = cart;
                            this.cartService.setCart(cart);
                        }
                    );
                }
            );
        }
    }

    removeProductItem(item:CartItem) {
        console.log(item);
        let itemIndex = this.getCartItemIndexByItem(item);
        this.cart.cartItems.splice(itemIndex,1);
        this.cartService.deleteProduct(this.cart, item.product).subscribe();
        this.cartService.setCart(this.cart);
        this.updateTotalPrice();
    }

    checkQty(item:CartItem) {
        if(item.quantity < 1) {
            item.quantity = 1;
        }
        this.updateTotalPrice();
    }

    getCartItemIndexByItem(item) {
        return this.cart.cartItems.indexOf(item);
    }

    updateTotalPrice() {
        let totalPrice:number = 0;
        for(let i=0; i<this.cart.cartItems.length; i++) {
            totalPrice += this.cart.cartItems[i].price * this.cart.cartItems[i].quantity;
        }
        this.totalPrice = totalPrice;
    }

}
