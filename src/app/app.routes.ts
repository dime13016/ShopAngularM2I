import {Routes} from "@angular/router";
import {ProductComponent} from "./product/product.component";
import {HomeComponent} from "./home/home.component";
import {CategoryComponent} from "./category/category.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";
import {OrdersComponent} from "./orders/orders.component";
import {SearchComponent} from "./search/search.component";
import {AuthGuard} from "./app.guard";
import {AdminComponent} from "./admin/admin.component";
import {AdminCategoriesComponent} from "./admin/admin-categories/admin-categories.component";
import {AdminCategoryComponent} from "./admin/admin-category/admin-category.component";
import {AdminProductComponent} from "./admin/admin-product/admin-product.component";
import {AdminProductsComponent} from "./admin/admin-products/admin-products.component";
import {AdminUsersComponent} from "./admin/admin-users/admin-users.component";

export const routes:Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: HomeComponent},
    {path: "product/:id", component: ProductComponent},
    {path: "category/:id", component: CategoryComponent},
    {path: "search/:text", component: SearchComponent},
    {path: "cart", component: CartComponent},
    {path: "order/:id", component: OrderComponent, canActivate: [AuthGuard]},
    {path: "orders", component: OrdersComponent, canActivate: [AuthGuard]},
    {path: "admin", component: AdminComponent, canActivate: [AuthGuard]},
    {path: "admin/categories", component: AdminCategoriesComponent, canActivate: [AuthGuard]},
    {path: "admin/category/:id", component: AdminCategoryComponent, canActivate: [AuthGuard]},
    {path: "admin/products", component: AdminProductsComponent, canActivate: [AuthGuard]},
    {path: "admin/product/:id", component: AdminProductComponent, canActivate: [AuthGuard]},
    {path: "admin/users", component: AdminUsersComponent, canActivate: [AuthGuard]}
];