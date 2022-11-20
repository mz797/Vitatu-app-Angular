import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DietService } from 'src/app/diet/diet.service';
import { Diet } from 'src/app/types/Diet.model';
import { Product } from 'src/app/types/Product.model';
import { ProductService } from '../product.service';
import { ProductPostsService } from '../product-posts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Output() onDeleteEvent = new EventEmitter<string>();

  @Input() product!: Product;
  showDetails = false;

  constructor(
    private productPostsService: ProductPostsService,
    private dietService: DietService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}
  onDelete(id: string) {
    this.productPostsService.deletePost(id);
    this.onDeleteEvent.emit(id);
  }
  onAddToDiet(product: Product) {
    this.productService.onAddToDietEvent.emit(this.product);
    
  }
  onEdit() {
    this.productService.onEditEvent.emit(this.product)
  }
}
