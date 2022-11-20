import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DietService } from 'src/app/diet/diet.service';
import { Diet } from 'src/app/types/Diet.model';
import { Product } from 'src/app/types/Product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add-product-to-diet',
  templateUrl: './add-product-to-diet.component.html',
  styleUrls: ['./add-product-to-diet.component.css'],
})
export class AddProductToDietComponent implements OnInit {
  @Input() product: Product;
  addForm: FormGroup;

  constructor(
    private productService: ProductService,
    private dietService: DietService
  ) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }
  onSave() {
    const amount = this.addForm.get('amount').value;
    this.dietService.postProduct(
      new Diet(
        amount,
        (this.product.Carbohydrates * amount) / 100,
        new Date(),
        (this.product.Fat * amount) / 100,
        this.product.Id,
        (this.product.Kcal * amount) / 100,
        this.product.Name,
        (this.product.Protein * amount) / 100
      )
    );
    this.productService.closeAddingToDiet.emit();
  }
  onClose() {
    this.productService.closeAddingToDiet.emit();
  }
}
