import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import { PostProduct, Product } from '../types/Product.model';

@Injectable({ providedIn: 'root' })
export class ProductPostsService {
  constructor(private http: HttpClient) {}

  createPosts(productData: Product) {
    this.http
      .post<{ name: string }>(
        'https://angular-projekt-7b1f8-default-rtdb.firebaseio.com/post.json',
        productData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
  featchPosts() {
    return this.http
      .get<{ [key: string]: PostProduct }>(
        'https://angular-projekt-7b1f8-default-rtdb.firebaseio.com/post.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const tempProd = responseData[key];
              postsArray.push(
                new Product(
                  tempProd.carbohydrates,
                  tempProd.fat,
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
        'https://angular-projekt-7b1f8-default-rtdb.firebaseio.com/post/' +
          id +
          '.json'
      )
      .subscribe();
    // return this.featchPosts();
  }
  updateProduct(id: string, value: Product) {
    // console.log(id, value);
    this.http
      .put(
        'https://angular-projekt-7b1f8-default-rtdb.firebaseio.com/post/' +
          id +
          '.json',
        value
      )
      .subscribe();
  }
}
