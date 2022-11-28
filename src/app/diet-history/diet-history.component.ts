import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DietService } from '../diet/diet.service';
import { ProductPostsService } from '../products/product-posts.service';
import { Diet } from '../types/Diet.model';
import { DietHistory } from '../types/DietHistory.model';
import { Product } from '../types/Product.model';
import { User } from '../types/User.model';
import { UserService } from '../user-site/user.service';

@Component({
  selector: 'app-diet-history',
  templateUrl: './diet-history.component.html',
  styleUrls: ['./diet-history.component.css'],
})
export class DietHistoryComponent implements OnInit {
  userDiet: Diet[] = [];
  productList: Product[] = [];
  userDietHours: number[];
  user: User;
  nutritionalValues: {
    kcal: number;
    carbo: number;
    fat: number;
    protein: number;
  };
  historyDiet:DietHistory[]=[]
  
  constructor(
    private dietService: DietService,
    private productPostService: ProductPostsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.user = this.userService.user;
    this.nutritionalValues = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
    // const dateString = new Date().toISOString().slice(0, 10);
    this.dietService.featchPosts().subscribe((posts) => {
      this.userDiet = posts;
      for (let p of this.userDiet) {
        // if (p.Date.toString().slice(0, 10) === dateString) {
        //   this.nutritionalValues.kcal += p.Kcal;
        //   this.nutritionalValues.fat += p.Fat;
        //   this.nutritionalValues.carbo += p.Carbohydrates;
        //   this.nutritionalValues.protein += p.Protein;
        // }
        const historyId =this.historyDiet.findIndex(d=>d.date.toString().slice(0, 10)===p.Date.toString().slice(0, 10)) 
        if(historyId!==-1){
        this.historyDiet[historyId].dietList.push(p);
        this.historyDiet[historyId].kcal=(this.historyDiet[historyId].kcal||0)+p.Kcal;
        this.historyDiet[historyId].carbo=(this.historyDiet[historyId].carbo||0)+p.Carbohydrates;
        this.historyDiet[historyId].protein=(this.historyDiet[historyId].protein||0)+p.Protein;
        this.historyDiet[historyId].fat=(this.historyDiet[historyId].fat||0)+p.Fat;
        this.historyDiet[historyId].visibility=false;

        }
        else{
          this.historyDiet.push(new DietHistory(
            p.Date.toString().slice(0, 10), [p],p.Kcal,p.Carbohydrates,p.Protein,p.Fat,false))
        }
      }
    });
    this.productPostService.featchPosts().subscribe((posts) => {
      this.productList = posts.sort((a, b) => a.Name.localeCompare(b.Name));
    });
  }
 

  countNutritionalValues() {
    this.nutritionalValues = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
    this.userDiet.forEach((p) => {
      this.nutritionalValues.kcal += p.Kcal;
      this.nutritionalValues.fat += p.Fat;
      this.nutritionalValues.carbo += p.Carbohydrates;
      this.nutritionalValues.protein += p.Protein;
    });
  }
}
