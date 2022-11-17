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
      for (let prod of posts) {
        console.log(prod);
        const tempHour = prod.Date.getHours();
        if (!this.userDietHours.includes(tempHour))
          this.userDietHours.push(tempHour);
      }
    });

    // this.dayHoursActive = [];
  }
  getProducts(): void {
    this.dietService.featchPosts().subscribe((posts) => {
      this.userDiet = posts;
    });
  }
}
