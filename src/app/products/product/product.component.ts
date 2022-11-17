import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DietService } from 'src/app/diet/diet.service';
import { Diet } from 'src/app/types/Diet.model';
import { Product } from 'src/app/types/Product.model';
import { ProductPostsService } from '../product-posts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Output() onDeleteEvent = new EventEmitter<void>();
  @Input() product!: Product;
  showDetails = false;

  constructor(
    private productService: ProductPostsService,
    private dietService: DietService
  ) {}

  ngOnInit(): void {}
  onDelete(id: string) {
    this.productService.deletePost(id);
    this.onDeleteEvent.emit();
  }
  onAddToDiet(product: Product) {
    this.dietService.postProduct(
      new Diet(
        100,
        product.Carbohydrates,
        new Date(),
        product.Fat,
        product.Id,
        product.Kcal,
        product.Name,
        product.Protein,
      )
    );
  }
}
