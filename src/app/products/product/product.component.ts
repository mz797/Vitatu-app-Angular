import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/types/Product.model';
import { ProductPostsService } from '../product-posts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Output() onDeleteEvent = new EventEmitter<string>();
  @Output() onEditEvent = new EventEmitter<Product>();
  @Output() onAddToDietEvent = new EventEmitter<Product>();

  @Input() product!: Product;
  showDetails = false;

  constructor(
    private productPostsService: ProductPostsService,private router:Router,private route:ActivatedRoute
  ) {}

  ngOnInit(): void {}
  onDelete(id: string) {
    this.productPostsService.deletePost(id);
    this.onDeleteEvent.emit(id);
  }
  onAddToDiet(product: Product) {
    this.onAddToDietEvent.emit(this.product);
  }
  onEdit() {
    // console.log('prod comp', this.product.Id, this.product);
    this.router.navigate([{carbo:this.product.Carbohydrates,fat:this.product.Fat,kcal: this.product.Kcal,name:this.product.Name,protein: this.product.Protein,id:this.product.Id}], { relativeTo: this.route });
    this.onEditEvent.emit(this.product);
  }
}
