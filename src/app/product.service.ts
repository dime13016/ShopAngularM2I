import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './model/Product';
import { Category } from './model/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl:string = "http://localhost:8080";

  constructor(private http:HttpClient) { 
  }

  getAllProducts() {
    return this.http.get<Array<Product>>(this.apiUrl+"/products");
  }

  getProductsbyCategory(catId:number) {
    return this.http.get<Array<Product>>(this.apiUrl+"/categories/"+catId+"/products");
  }

  getProductById(id:number) {
    return this.http.get<Product>(this.apiUrl+"/products/"+id);
  }

  add(p:Product) {
    return this.http.post(this.apiUrl+"/product",p);
  }

  remove(id:number) {
    return this.http.delete(this.apiUrl+"/products/"+id);
  }

  update(p:Product) {
    return this.http.put(this.apiUrl+"/product",p);
  }

}
