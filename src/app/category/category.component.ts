import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Category } from '../model/Category';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category:Category = {name: "", parent: null, products: []};
  
  constructor(private categoryService:CategoryService, private productService:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(r => {
      let currentCatId = Number(r.get("id"));
      this.categoryService.getById(currentCatId).subscribe(
        category => {
          if(category.id) {
            this.category.id = category.id;
            this.category.name = category.name;
            this.productService.getProductsbyCategory(category.id).subscribe(
              products => {
                if(products) {
                  this.category.products = products;
                }
                
              }
            );
          } 
          
        }
      )
    });
  }

}
