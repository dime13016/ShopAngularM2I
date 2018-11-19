import { Product } from "./Product";

export interface Category {
    id?:number;
    name:string;
    parent:Category;
    products?:Product[];
}