import { Injectable } from '@angular/core';
import { Category } from './model/Category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  getAllCategories() {
    return this.http.get<Array<Category>>(this.apiUrl+"/categories");
  }

  getById(id:number) {
    return this.http.get<Category>(this.apiUrl+"/categories/"+id);
  }

  add(c) {
    return this.http.post(this.apiUrl+"/category",c);
  }

  update(c:Category) {
    let parent_id:number = null;
    if(c.parent != null) {
      parent_id = c.parent.id;
    }
    return this.http.put(this.apiUrl+"/category",{ "id": c.id, "name":c.name, "parent_id":parent_id});
  }

  remove(id:number) {
    return this.http.delete(this.apiUrl+"/categories/"+id);
  }

}
