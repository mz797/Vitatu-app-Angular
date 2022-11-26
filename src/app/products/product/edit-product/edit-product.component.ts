import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/types/Product.model';
import { ProductPostsService } from '../../product-posts.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  addProductForm: FormGroup;
  @Input() product: Product;
  @Output() closeEditEvent = new EventEmitter<void>();
  @Output() productWasEdited = new EventEmitter<Product>();

  constructor(private productService: ProductPostsService) {}

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(this.product.Name, [
        Validators.required,
        this.forbidenName,
      ]),
      kcal: new FormControl(this.product.Kcal, [
        Validators.required,
        Validators.min(0),
        Validators.max(1000),
      ]),
      carbohydrates: new FormControl(this.product.Carbohydrates, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      protein: new FormControl(this.product.Protein, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      fat: new FormControl(this.product.Fat, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  onSubmit(): void {
    const prod = this.addProductForm.value;
    const updatedProductFull = new Product(
      prod.carbohydrates,
      prod.fat,
      prod.kcal,
      prod.name,
      prod.protein,
      this.product.Id
    );
    //sprawdza
    if (JSON.stringify(updatedProductFull) !== JSON.stringify(this.product)) { 
      const updatedProduct = new Product(
        prod.carbohydrates,
        prod.fat,
        prod.kcal,
        prod.name,
        prod.protein
      );
      this.productService.updateProduct(this.product.Id, updatedProduct);
      this.productWasEdited.emit(updatedProductFull);
    }

    this.addProductForm.reset();
    this.closeEditEvent.emit();
  }
  onCloseEdit(): void {
    this.closeEditEvent.emit();
  }
  forbidenName(control: FormControl): { [s: string]: boolean } {
    if ((control.value || '').trim() === '') return { nameIsForbiden: true };
    return null;
  }
}
