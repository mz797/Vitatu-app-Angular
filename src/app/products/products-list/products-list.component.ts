import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/types/Product.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductPostsService } from '../product-posts.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Diet } from 'src/app/types/Diet.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  productList: Product[] = [];
  searchValue: string = '';
  searchInput: string = '';

  constructor(
    private productServer: ProductPostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.productServer.featchPosts().subscribe((posts) => {
      this.productList = posts.sort((a, b) => a.Name.localeCompare(b.Name));
      // this.productList.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  getProducts(id:string): void {
    this.productList=this.productList.filter(prod=>prod.Id!==id)
    // this.productServer.featchPosts().subscribe((posts) => {
    //   this.productList = posts.sort((a, b) => a.Name.localeCompare(b.Name));
    // });
    // setTimeout(() => {
    //   this.router.navigate(['products-list-reload']);
    // }, 2000);
  }
  onInputChanged(value: string): void {
    this.searchValue = value;
  }
}
