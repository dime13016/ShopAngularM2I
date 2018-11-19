import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/Category';
import { CategoryService } from '../../category.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  category:Category = {name:"dazd", parent:null};
  categories:Category[] = new Array<Category>();

  constructor(private categoryService:CategoryService, private route:ActivatedRoute) { 
    console.log(this.category.name)
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(r => {
      let currentCatId = Number(r.get("id"));
      this.categoryService.getAllCategories().subscribe(
        categories => {
          categories.forEach(
            category => {
              if(category.id == currentCatId) {
                this.category = category;
              } else {
                this.categories.push(category);
              }
            }
          )
        }
      )
    });
  }

  updateCategory() {
    this.categoryService.update(this.category).subscribe(
      category => {
        console.log(category);
      }
    )
  }

  isParent(id:number) {
    if(this.category.parent != null) {
      if(this.category.parent.id == id) {
        return true;
      }
    }
    return false;
  }

  setNewCategoryParent(parent:Category) {
    this.category.parent = parent;
    console.log(this.category)
  }

}
