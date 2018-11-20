import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product:Product = {name:"", price:null, quantity:null, categories:null};

  constructor(private productService:ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(r => {
      let prodId = Number(r.get("id"));
      this.productService.getProductById(prodId).subscribe(
        product => {
          if(product.id) {
            this.product = product;
          }
        }
      )
    });
  }

  addToCart() {
    console.log("Add to cart");
    console.log(this.product);
  }

}