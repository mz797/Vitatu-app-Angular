import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductPostsService } from '../products/product-posts.service';
import { Diet } from '../types/Diet.model';
import { Product } from '../types/Product.model';
import { User } from '../types/User.model';
import { UserService } from '../user-site/user.service';
import { DietService } from './diet.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css'],
})
export class DietComponent implements OnInit {
  userDiet: Diet[] = [];
  todayDiet: Diet[] = [];
  productList: Product[] = [];
  userDietHours: number[];
  user: User;
  nutritionalValues: {
    kcal: number;
    carbo: number;
    fat: number;
    protein: number;
  };
  procentageMacros: {
    kcal: number;
    carbo: number;
    fat: number;
    protein: number;
  };

  editingDiet = false;
  productToEdit: Diet; //tej ma już ustawione wartości macro pod swoją wagę
  originalEditingProduct: Product; // ten ma wartości macro dla 100g

  constructor(
    private dietService: DietService,
    private productPostService: ProductPostsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.nutritionalValues = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
    this.procentageMacros = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
    const dateString = new Date().toISOString().slice(0, 10);
    this.dietService.featchPosts().subscribe((posts) => {
      this.userDiet = posts;
      for (let p of this.userDiet) {
        if (p.Date.toString().slice(0, 10) === dateString) {
          this.todayDiet.push(p);
          this.nutritionalValues.kcal += p.Kcal;
          this.nutritionalValues.fat += p.Fat;
          this.nutritionalValues.carbo += p.Carbohydrates;
          this.nutritionalValues.protein += p.Protein;
        }
      }
      this.countProcentageMacros();
    });
    this.productPostService.featchPosts().subscribe((posts) => {
      this.productList = posts.sort((a, b) => a.Name.localeCompare(b.Name));
    });
  }
  getProducts(id: string): void {
    this.todayDiet = this.todayDiet.filter((diet) => diet.IdDiet !== id);
    this.countNutritionalValues();
  }
  onEditDiet(id: string) {
    this.productToEdit = this.userDiet.find((d) => d.IdDiet === id);
    this.originalEditingProduct = this.productList.find(
      (p) => p.Id === this.productToEdit.Id
    );
    this.editingDiet = true;
  }
  onDietProductWasEdited(dietProd: Diet) {
    const id = this.todayDiet.findIndex(
      (p) => p.IdDiet === this.productToEdit.IdDiet
    );
    this.todayDiet[id] = dietProd;
    this.countNutritionalValues();
  }
  onCloseEditing() {
    this.editingDiet = false;
    this.router.navigate(['/diet']);
  }

  countNutritionalValues() {
    this.nutritionalValues = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
    this.todayDiet.forEach((p) => {
      this.nutritionalValues.kcal += p.Kcal;
      this.nutritionalValues.fat += p.Fat;
      this.nutritionalValues.carbo += p.Carbohydrates;
      this.nutritionalValues.protein += p.Protein;
    });
    this.countProcentageMacros();
  }
  countProcentageMacros() {
    this.procentageMacros.kcal = +(
      (this.nutritionalValues.kcal / this.user.BMR) *
      100
    ).toFixed(0);
    this.procentageMacros.fat = +(
      (this.nutritionalValues.fat / this.user.Fat) *
      100
    ).toFixed();
    this.procentageMacros.carbo = +(
      (this.nutritionalValues.carbo / this.user.Carbs) *
      100
    ).toFixed();
    this.procentageMacros.protein = +(
      (this.nutritionalValues.protein / this.user.Protein) *
      100
    ).toFixed();
  }
}
