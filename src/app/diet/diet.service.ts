import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Diet, PostDietProduct } from '../types/Diet.model';
import { Product } from '../types/Product.model';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  userDiet: Diet[] = [];
  userDietHours: number[] = [];

  constructor(private http: HttpClient) {}
  postProduct(productData: Diet) {
    this.http
      .post<{ name: string }>(
        'https://diet-base-cdcaa-default-rtdb.firebaseio.com/posts.json',
        productData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  featchPosts() {
    return this.http
      .get<{ [key: string]: PostDietProduct }>(
        'https://diet-base-cdcaa-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: Diet[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const tempProd = responseData[key];
              postsArray.push(
                new Diet(
                  tempProd.amount,
                  tempProd.carbohydrates,
                  tempProd.date,
                  tempProd.fat,
                  tempProd.id,
                  tempProd.kcal,
                  tempProd.name,
                  tempProd.protein,
                  key
                )
              );
            }
          }
          return postsArray;
        })
      );
  }
  deletePost(id: string) {
    this.http
      .delete(
        'https://diet-base-cdcaa-default-rtdb.firebaseio.com/posts/' +
          id +
          '.json'
      )
      .subscribe((res) => {
        console.log('dupa');
        console.log(id);
      });
  }
  getDiet() {
    return this.userDiet;
  }
  getHours() {
    for (let prod of this.userDiet) {
      console.log(prod);
      const tempHour = prod.Date.getHours();
      if (!this.userDietHours.includes(tempHour))
        this.userDietHours.push(tempHour);
    }
    return this.userDietHours;
  }
}
