import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = "http://localhost:8080/JerseyMaven/webapi/personnes/"

  constructor(private http:HttpClient) { 
  }

  getAllProducts() {
    return this.http.get<Array<Product>>(this.url);
  }

  getProductById(id:number) {
    return this.http.get<Product>(this.url+id);
  }

  add(p:Product) {
    return this.http.post(this.url+"product",p);
  }

  remove(id:number) {
    return this.http.delete(this.url+id);
  }

  update(id:number, p:Product) {
    return this.http.put(this.url+id,p);
  }

}
