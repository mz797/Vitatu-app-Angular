import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diet } from 'src/app/types/Diet.model';
import { Product } from 'src/app/types/Product.model';
import { DietService } from '../diet.service';

@Component({
  selector: 'app-edit-diet-product',
  templateUrl: './edit-diet-product.component.html',
  styleUrls: ['./edit-diet-product.component.css'],
})
export class EditDietProductComponent implements OnInit {
  @Input() editingProduct: Diet;
  @Input() originalProduct: Product;
  @Output() closeEditing = new EventEmitter<void>();
  @Output() dietProductWasEditted = new EventEmitter<Diet>();
  editForm: FormGroup;

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      amount: new FormControl(this.editingProduct.Amount, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }
  onSave(): void {
    const amount = +this.editForm.get('amount').value;

    if (this.editingProduct.Amount !== amount) {
      let newDiet = new Diet(
        amount,
        (this.originalProduct.Carbohydrates * amount) / 100,
        new Date(),
        (this.originalProduct.Fat * amount) / 100,
        this.originalProduct.Id,
        (this.originalProduct.Kcal * amount) / 100,
        this.originalProduct.Name,
        (this.originalProduct.Protein * amount) / 100
      );
      this.dietService.updateDiet(this.editingProduct.IdDiet, newDiet);
      newDiet = new Diet(
        newDiet.Amount,
        newDiet.Carbohydrates,
        newDiet.Date,
        newDiet.Fat,
        newDiet.Id,
        newDiet.Kcal,
        newDiet.Name,
        newDiet.Protein,
        this.editingProduct.IdDiet
      );
      this.dietProductWasEditted.emit(newDiet);
    }
    this.closeEditing.emit();
  }
  onClose(): void {
    this.closeEditing.emit();
  }
}
