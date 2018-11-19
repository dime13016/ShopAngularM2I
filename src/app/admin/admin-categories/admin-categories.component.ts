import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/Category';
import { CategoryService } from '../../category.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories:Category[] = new Array<Category>();
  newCategory = {name:"", parent_id:null};

  constructor(private categoryService:CategoryService) {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log(categories)
      }
    )
  }

  ngOnInit() {
    //this.categoryService.getAllCategories();
  }

  setNewCategoryParent(parent:Category) {
    this.newCategory.parent_id = parent.id;
  }

  createCategory() {
    console.log(this.newCategory);
    this.categoryService.add(this.newCategory).subscribe(
      category => {
        this.categories.push(<Category>category)
        console.log(category);
      }
    )
  }

  removeCategory(id:number) {
    this.categoryService.remove(id).subscribe(
      res => {
        this.categories.splice(this.getCategoryIndexById(id),1);
      }
    )
  }

  getCategoryIndexById(id:number) {
    return this.categories.indexOf(this.categories.find(x => x.id == id));
  }

}
