import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';
import { CartService } from '../cart.service';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product:Product = {name:"", price:null, quantity:null, categories:null};
  cart:Cart;

  constructor(private productService:ProductService, private route:ActivatedRoute , 
              private cartService:CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(r => {
      let prodId = Number(r.get("id"));
      this.productService.getProductById(prodId).subscribe(
        product => {
          if(product.id) {
            this.product = product;
            this.cartService.getCart().subscribe(
              cart => {
                this.cart = cart;
              }
            )
          }
        }
      )
    });
  }

  addToCart(quantity?:number) {
    let cartItem:CartItem = {cart: null, product:null, quantity:null, price:null};
    let present:boolean = false;
    let qty:number = 0;
    cartItem.product = this.product;
    cartItem.price = this.product.price;
    if(this.cart) {
      cartItem.cart = this.cart;
      for(let i=0; i<this.cart.cartItems.length; i++) {
        if(this.cart.cartItems[i].product.id == this.product.id) {
          qty = this.cart.cartItems[i].quantity;
        }
      }
    }
    
    cartItem.quantity = qty+1;

    this.cartService.addCartItem(cartItem).subscribe(
      data => {
        this.cartService.getCart().subscribe(
          cart => {
            this.cart = cart;
            this.cartService.setCart(cart);
          }
        )
      }
    )
  }

}