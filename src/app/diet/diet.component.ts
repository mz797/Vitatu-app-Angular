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
  todayDiet: Diet[] = [];
  userDietHours: number[];

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    const dateString = new Date().toISOString().slice(0, 10)
    this.dietService.featchPosts().subscribe((posts) => {
      this.userDiet = posts;
      for(let p of this.userDiet){
        if(p.Date.toString().slice(0, 10)===dateString)
          this.todayDiet.push(p);
      }
    });
  }
  getProducts(id: string): void {
    this.todayDiet = this.todayDiet.filter((diet) => diet.IdDiet !== id);
  }
}
