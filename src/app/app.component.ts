import { Component } from '@angular/core';
import {User} from "./model/User";
import {AuthenticationService} from "./authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import { Cart } from './model/Cart';
import { CartService } from './cart.service';
import { Product } from './model/Product';
import { CartItem } from './model/CartItem';
import { CategoryService } from './category.service';
import { Category } from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userLogin:User = {userName: "", password:""};
  categories:Category[] = [];
  currentUser:User;
  cart:Cart;
  cartQty:number

  constructor(private authenticationService:AuthenticationService, private modalService:NgbModal,
              private router: Router, private cartService:CartService, private categoryService:CategoryService) {
    
    this.currentUser = authenticationService.getCurrentUser();
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    )
    this.cartService.getCart().subscribe(
      cart => {
        this.cartService.setCart(cart);
        this.cart = cart;
      }
    )

    this.cartService.cartQtyObservable.subscribe(
      cartQty => {
        this.cartQty = cartQty;
      }
    )
  }

  login() {
    this.authenticationService.login(this.userLogin).subscribe(
        user => {
          if (user) {
            this.currentUser = user;
            this.modalService.dismissAll();
          }
        }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  openModal(modal) {
    this.modalService.open(modal);
  }

}
