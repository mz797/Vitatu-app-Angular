import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DietService } from 'src/app/diet/diet.service';
import { Diet } from 'src/app/types/Diet.model';
import { Product } from 'src/app/types/Product.model';

@Component({
  selector: 'app-add-product-to-diet',
  templateUrl: './add-product-to-diet.component.html',
  styleUrls: ['./add-product-to-diet.component.css'],
})
export class AddProductToDietComponent implements OnInit {
  @Input() product: Product;
  @Output() closeAddingToDiet = new EventEmitter<void>();
  addForm: FormGroup;
  showMacroInfo: boolean;
  amount: number;

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.showMacroInfo = false;
    this.addForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }
  onSave(): void {
    this.amount = this.addForm.get('amount').value;
    this.dietService.postProduct(
      new Diet(
        this.amount,
        (this.product.Carbohydrates * this.amount) / 100,
        new Date(),
        (this.product.Fat * this.amount) / 100,
        this.product.Id,
        (this.product.Kcal * this.amount) / 100,
        this.product.Name,
        (this.product.Protein * this.amount) / 100
      )
    );
    this.showMacroInfo = true;
    // this.closeAddingToDiet.emit();
  }
  onClose(): void {
    this.closeAddingToDiet.emit();
  }
}
