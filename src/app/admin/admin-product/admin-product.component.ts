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

  addOrRemoveCategoryToProduct(e, c:Category) {
    if(e.target.checked) {
      this.product.categories.push(c);
    } else {
      this.product.categories.splice(this.getCategoryIndexById(c.id), 1);
    }
  }

  containsCategory(c:Category) {
    return this.product.categories.find(x => x.id == c.id) != null;
  }

  getCategoryIndexById(id:number) {
    return this.product.categories.indexOf(this.product.categories.find(x => x.id == id));
  }

}
