import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../model/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:Order[] = [];

  constructor(private orderService:OrderService) {
    this.orderService.getOrdersForUser().subscribe(
      orders => {
        this.orders = orders;
        console.log(orders)
      }
    )
  }

  ngOnInit() {
  }

}
