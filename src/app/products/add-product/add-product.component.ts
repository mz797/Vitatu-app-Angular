import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/types/Product.model';
import { ProductPostsService } from '../product-posts.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @ViewChild('name', { static: true }) nameInput!: ElementRef;
  @ViewChild('kcal', { static: true }) kcalInput!: ElementRef;
  @ViewChild('carbohydrates', { static: true }) carboInput!: ElementRef;
  @ViewChild('protein', { static: true }) proteinInput!: ElementRef;
  @ViewChild('fat', { static: true }) fatInput!: ElementRef;

  constructor(private productService:ProductPostsService, private renderer: Renderer2) {}

  ngOnInit(): void {}
  onCreateProduct(productData: Product) {
    this.nameInput.nativeElement.value = '';
    this.kcalInput.nativeElement.value = 0;
    this.carboInput.nativeElement.value = 0;
    this.proteinInput.nativeElement.value = 0;
    this.fatInput.nativeElement.value = 0;
    this.productService.createPosts(productData)
      
  }
}
