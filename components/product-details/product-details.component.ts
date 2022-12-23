import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  ngOnInit(): void {
    this.route.paramMap.subscribe ( () => {

    

    this.productDetail()
    }
    );
  }
  
  product! : Product  ; 


  constructor (private service : ProductService , private route : ActivatedRoute, private cartService :
     CartService){}


  productDetail() : void {
    
    const theproductid : number = +this.route.snapshot.paramMap.get('id')!;

      this.service.getProduct(theproductid).subscribe (
        data => {
          this.product= data;
        }
      )
  }


  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }



  



}
