import { EventEmitter, Injectable, Output } from "@angular/core";
import { Product } from "../types/Product.model";

@Injectable({
    providedIn: 'root',
   })
export class ProductService{
    onEditEvent = new EventEmitter<Product>();
    closeEditEvent=new EventEmitter<void>();
    onAddToDietEvent=new EventEmitter<Product>();
    closeAddingToDiet=new EventEmitter<void>();
    productWasEdited = new EventEmitter<Product>();
    
}