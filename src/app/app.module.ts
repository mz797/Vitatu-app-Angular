import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { DietComponent } from './diet/diet.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HighlightDirective } from './highlight.directive';
import { FooterComponent } from './footer/footer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EditProductComponent } from './products/product/edit-product/edit-product.component';
import { SearchProductComponent } from './products/products-list/search-product/search-product.component';
import { DietProductComponent } from './diet/diet-product/diet-product.component';
import { ProductPostsService } from './products/product-posts.service';
import { DietService } from './diet/diet.service';
import { AddProductToDietComponent } from './products/product/add-product-to-diet/add-product-to-diet.component';
import { UserSiteComponent } from './user-site/user-site.component';
import { EditUserComponent } from './user-site/edit-user/edit-user.component';
import { EditDietProductComponent } from './diet/edit-diet-product/edit-diet-product.component';
import { DietHistoryComponent } from './diet-history/diet-history.component';
import { DietHistoryProductComponent } from './diet-history/diet-history-product/diet-history-product.component';
import { SigninComponent } from './signin/signin.component';
import { NoCommaPipe } from './no-comma.pipe';

const appRoutes: Routes = [
  { path: 'diet', component: DietComponent },
  { path: 'user-site', component: UserSiteComponent },
  { path: 'diet-history', component: DietHistoryComponent},
  { path: 'new-product', component: AddProductComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'products-list/:id', component: ProductsListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: '/diet', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    DietComponent,
    AddProductComponent,
    HeaderComponent,
    NotFoundComponent,
    HighlightDirective,
    FooterComponent,
    EditProductComponent,
    SearchProductComponent,
    DietProductComponent,
    AddProductToDietComponent,
    UserSiteComponent,
    EditUserComponent,
    EditDietProductComponent,
    DietHistoryProductComponent,
    DietHistoryComponent,
    SigninComponent,
    NoCommaPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      imageWidth: 30,
      imageHeight: 30,
      outerStrokeColor: 'red',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
  ],
  providers: [ProductPostsService, DietService],
  bootstrap: [AppComponent],
})
export class AppModule {}
