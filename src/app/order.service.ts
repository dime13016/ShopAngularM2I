import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './model/Order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl:string = "http://localhost:8080";

  orders:Order[] = [];

  constructor(private http:HttpClient) { }

  makeOrder(cartCode:string) {
    return this.http.post(this.apiUrl+"/order",{cart_code: cartCode});
  }

  getOrdersForUser() {
    return this.http.get<Array<Order>>(this.apiUrl+"/orders").pipe(map(
      orders => {
          this.orders = orders;
          return orders;
      }
    ));
  }

  getOrder(id:number) {
    let index = this.orders.indexOf(this.orders.find(x => x.id == id));
    if(index > -1) {
      return this.orders[index];
    }
    return null;
  }


}
