import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/Category";
import {Product} from "../../model/Product";
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  categories:Category[] = new Array<Category>();
  products:Product[] = new Array<Product>();
  newProduct:Product = {name:"", price:null, quantity:null, categories:[]};

  constructor(private categoryService:CategoryService, private productService:ProductService) {
    this.categoryService.getAllCategories().subscribe(
        categories => {
          this.categories = categories;
          console.log(categories)
        }
    );
    this.productService.getAllProducts().subscribe(
        products => {
          this.products = products;
          console.log(products)
        }
    );
  }

  ngOnInit() {
  }

  createProduct() {
    this.productService.add(this.newProduct).subscribe(
        product => {
          this.products.push(<Product>product)
          console.log(product);
        }
    )
  }

  removeProduct(id:number) {
    this.productService.remove(id).subscribe(
        res => {
          this.products.splice(this.getProductIndexById(id),1);
        }
    )
  }

  getProductIndexById(id:number) {
    return this.products.indexOf(this.products.find(x => x.id == id));
  }

  addCategoryToProduct(c:Category) {
    this.newProduct.categories.push(c);
  }

}
