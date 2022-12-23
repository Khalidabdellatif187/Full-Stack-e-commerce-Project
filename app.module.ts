import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Routes  , RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';


import {
  OktaAuthModule , 
  OktaCallbackComponent , 
  OKTA_CONFIG
} from'@okta/okta-angular' ;
import { from } from 'rxjs';
import{OktaAuth} from'@okta/okta-auth-js'
import myAppConfig from './config/my-app-config';


const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);




const routes : Routes = [
  {path : 'login/callback' , component : OktaCallbackComponent } , 

  {path : 'checkout' , component : CheckoutComponent } ,
  {path : 'cart-details' , component : CartDetailsComponent } ,
  {path : 'products/:id' , component : ProductDetailsComponent } ,
  {path : 'search/:keyword' , component : ProductListComponent } ,
    {path : 'category/:id' , component : ProductListComponent} ,
  {path : 'category' , component : ProductListComponent},
  {path : 'products' , component : ProductListComponent} , 
  {path : '' , redirectTo : '/products' , pathMatch : 'full'},
  {path : '**' , redirectTo : '/products' , pathMatch : 'full'} ,
]



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
   
    
   
   
    
    
  
  ],
  imports: [
    RouterModule.forRoot(routes) ,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
   HttpClientModule ,
 
    
    
  ],
  providers: [ProductService , {provide : OKTA_CONFIG,useValue : {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
