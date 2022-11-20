import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/types/Product.model';
import { ProductPostsService } from '../product-posts.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private productService: ProductPostsService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      kcal: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(1000),
      ]),
      carbohydrates: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      protein: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      fat: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  onSubmit() {
    console.log(this.addProductForm);
    this.productService.createPosts(this.addProductForm.value);
    this.addProductForm.reset();
  }
}
