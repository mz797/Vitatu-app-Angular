import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/types/Product.model';
import { ProductPostsService } from '../product-posts.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  productList: Product[] = [];
  searchValue: string = '';
  searchInput: string = '';
  showEdit = false;
  addingToDiet = false;
  productToEdit: Product;
  productToAddToDiet: Product;
  editedProduct: Product;
  paramsSubscription: Subscription;

  constructor(
    private productPostsServer: ProductPostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productPostsServer.featchPosts().subscribe((posts) => {
      this.productList = posts.sort((a, b) => a.Name.localeCompare(b.Name));
    });
  }
  getProducts(id: string): void {
    this.productList = this.productList.filter((prod) => prod.Id !== id);
  }
  onInputChanged(value: string): void {
    this.searchValue = value;
  }
  onShowEdit(product: Product) {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      const carbo = +params['carbo'];
      const fat = +params['fat'];
      const kcal = +params['kcal'];
      const name = params['name'];
      const id = params['id'];
      const protein = +params['protein'];
      this.productToEdit = new Product(carbo, fat, kcal, name, protein, id);
    });
    this.showEdit = true;
  }
  onCloseEdit() {
    this.showEdit = false;
    this.router.navigate(['/products-list']);
  }
  onProductWasEdited(product: Product) {
    const id = this.productList.findIndex((p) => p.Id === product.Id);
    this.productList[id] = product;
  }
  onAddToDiet(product: Product) {
    this.productToAddToDiet = product;
    this.addingToDiet = true;
  }
  onCloseAddingToDiet() {
    this.addingToDiet = false;
  }
}
