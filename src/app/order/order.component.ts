import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../model/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order:Order = {cart: {cartItems: [] }, date:null};
  constructor(private orderService:OrderService, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.orderService.getOrdersForUser().subscribe(
      orders => {
        this.route.paramMap.subscribe(r => {
          let id = Number(r.get("id"));
          this.order = this.orderService.getOrder(id);
        });
      }
    )
    
  }

}
