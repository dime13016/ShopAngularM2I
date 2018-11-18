import { Routes } from "@angular/router";
import { ProductComponent } from "./product/product.component";
import { HomeComponent } from "./home/home.component";
import { CategoryComponent } from "./category/category.component";
import { CartComponent } from "./cart/cart.component";
import { OrderComponent } from "./order/order.component";
import { OrdersComponent } from "./orders/orders.component";
import { SearchComponent } from "./search/search.component";
import {AuthGuard} from "./app.guard";

export const routes:Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: HomeComponent},
    {path: "product/:id", component: ProductComponent},
    {path: "category/:id", component: CategoryComponent},
    {path: "search/:text", component: SearchComponent},
    {path: "cart", component: CartComponent},
    {path: "order/:id", component: OrderComponent, canActivate: [AuthGuard]},
    {path: "orders", component: OrdersComponent, canActivate: [AuthGuard]}
];