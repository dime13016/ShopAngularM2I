import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../product.service";
import {Product} from "../../model/Product";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../model/Category";
import {CategoryService} from "../../category.service";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  product:Product = {name:"", price:null, quantity:null, categories:[]};
  categories:Category[] = new Array<Category>();

  constructor(private productService:ProductService, private categoryService:CategoryService, private route:ActivatedRoute) {
    this.categoryService.getAllCategories().subscribe(
        categories => {
          this.categories = categories;
        }
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(r => {
      let currentProductId = Number(r.get("id"));
      this.productService.getProductById(currentProductId).subscribe(
          product => {
            this.product = product;
          }
      )
    });
  }

  updateProduct() {
    this.productService.update(this.product).subscribe(
        product => {
          console.log(product);
        }
    )
  }

  addCategoryToProduct(c:Category) {
    this.product.categories.push(c);
  }

}
