import { Component, OnInit } from '@angular/core';
import { Diet } from '../types/Diet.model';
import { Product } from '../types/Product.model';
import { DietService } from './diet.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css'],
})
export class DietComponent implements OnInit {
  userDiet: Diet[] = [];
  userDietHours: number[];

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.dietService.featchPosts().subscribe((posts) => {
      this.userDiet = posts;
      
    });
  }
  getProducts(id: string): void {
    this.userDiet = this.userDiet.filter((diet) => diet.IdDiet !== id);
  }
  
}
