import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup! : FormGroup ;

  shippingAdressStates : State [] = [];
  billingAddressStates: State[] = [];

  totalPrice : number = 0;
  totalQuantity : number = 0 ;

  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo : PaymentInfo = new PaymentInfo();

  cardElement:any = "";

  displayError: any = "";

  isDisapled : boolean =false;

  creditCardYears : number [] = [];
  creditCardMonths: number [] = [];

  countries : Country [] = [];
  states : State [] = [];

  ngOnInit(): void {
    this.setupStripePaymentForm();
    this.reviewCardDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group ({
        firstName : new FormControl('' , [Validators.required , Validators.minLength(2) , Luv2ShopValidators.notOnlyWhiteSpace]) , 
        lastName : new FormControl('' , [Validators.required , Validators.minLength(2) , Luv2ShopValidators.notOnlyWhiteSpace]) , 
        email : new FormControl('' , [Validators.required , Validators.pattern
          ('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Luv2ShopValidators.notOnlyWhiteSpace])

      }) , 
      shippingAddress : this.formBuilder.group ({
        street : new FormControl('' , [Validators.required , Validators.minLength(3),
        Luv2ShopValidators.notOnlyWhiteSpace]) , 
        city : new FormControl('' , [Validators.required , Validators.minLength(2) , Luv2ShopValidators.notOnlyWhiteSpace]),
        state : new FormControl('' , Validators.required),
        country : new FormControl('' , [Validators.required]),
        zipCode : new FormControl('' , [Validators.required , Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace])
      }) , 
      billingAddress : this.formBuilder.group({
        street : new FormControl('' , [Validators.required , Validators.minLength(3),
          Luv2ShopValidators.notOnlyWhiteSpace]) , 
        city : new FormControl('' , [Validators.required , Validators.minLength(3),
          Luv2ShopValidators.notOnlyWhiteSpace]) ,
        state : new FormControl('' , [Validators.required ]) ,
        country : new FormControl('' , [Validators.required ]) ,
        zipCode : new FormControl('' , [Validators.required , Validators.minLength(3),
          Luv2ShopValidators.notOnlyWhiteSpace]) ,
      }),
      creditCard : this.formBuilder.group({
        /*
        cardType :  new FormControl('' , [Validators.required , Validators.minLength(3),
          Luv2ShopValidators.notOnlyWhiteSpace]) ,
        nameOnCard : new FormControl('' , [Validators.required , Validators.minLength(3),
          Luv2ShopValidators.notOnlyWhiteSpace]) ,
        cardNumber : new FormControl('' , [Validators.required , Validators.minLength(14),
          Luv2ShopValidators.notOnlyWhiteSpace]) ,
        security : new FormControl('' , [Validators.required , Validators.minLength(3),
          Luv2ShopValidators.notOnlyWhiteSpace]) ,
        expirationMonth : new FormControl('' , [Validators.required ]) ,
        expirationYear :new FormControl('' , [Validators.required ]) ,
        */


      })

    });
    
    /*
    const startMonth : number = new Date() .getMonth() + 1;
    this.formservice.getCreditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.formservice.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
    */

    this.formservice.getCountries().subscribe (
       data => {
        this.countries = data;
       }
    );
    




  }
  setupStripePaymentForm() {
   
    var elements = this.stripe.elements();

    this.cardElement = elements.create('card' , {hidePostalCode : true});

    this.cardElement.mount('#card-element');

    this.cardElement.on('change' , (event : any)=> {
       
      this.displayError = document.getElementById('card-errors');

      if(event.complete){
        this.displayError.textContent = ""
      } else if(event.error){
        this.displayError.textContent = event.error.message;
      }


    });


  }

  



   constructor (private formBuilder : FormBuilder , private formservice : ShopFormService
      ,private cartService : CartService , private checkoutService : CheckoutService , 
      private router : Router) {}

   onSubmit() {
    console.log ("Handling The Submit Button");
    console.log (this.checkoutFormGroup.get('customer')?.value)

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
     
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;
    let orderItems : OrderItem[] = [];
    for(let i=0 ; i < cartItems.length ; i++ ){
      orderItems[i] = new OrderItem (cartItems[i]);

    }
    let purchase = new Purchase();
      purchase.customer = this.checkoutFormGroup.controls['customer'].value;



    
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    const shippingState : State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));

    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;



    purchase.billingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    const billingState : State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry : Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));

    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;





    purchase.order = order;
    purchase.orderItems = orderItems;

    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";
    this.paymentInfo.receiptEmail = purchase.customer.email;

    if(!this.checkoutFormGroup.invalid && this.displayError.textContent === ""){
      this.isDisapled = true;

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret , {
            payment_method : {
              card : this.cardElement , 
              billing_details:{
                email : purchase.customer.email , 
                name : `${purchase.customer.firstName} ${purchase.customer.lastName}` , 
                address : {
                  line : purchase.billingAddress.street , 
                  city : purchase.billingAddress.city , 
                  state : purchase.billingAddress.state , 
                  postal_code : purchase.billingAddress.zipCode , 
                  country : this.BillingAddressCountry?.value.code
                }
              }
            }
          } , {handleActions : false})
          .then((result : any) => {
               if(result.error){
                alert(`There was ana error :  ${result.error.message}`)
                this.isDisapled = false;
               } else {
                this.checkoutService.placeOrder(purchase).subscribe(
                  {
                    next : (response : any) => {
                      alert(`Your Order Has Been Recieved.\nOrder tracking number: ${response.orderTrackingNumber}`);

                      this.resetCart();
                      this.isDisapled = false;

                    } , 
                    error : (err : any) => {
                      alert(`There Was An Error : ${err.message}`);
                      this.isDisapled = false;
                    }
                  }
                )
               }
          })
          
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
}
  resetCart() {
    
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }

   handleMonthsAndYears() {
    const creditCardFormGroup  = this.checkoutFormGroup.get('creditCard');
    const currentYear  : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth : number;
    if(currentYear === selectedYear){
        startMonth = new Date().getMonth();
    } else {
      startMonth = 1;
    }

    this.formservice.getCreditCardMonth(startMonth).subscribe (
      data => {
        this.creditCardMonths = data;
      }
    )
   }

   
   getStates(formGroupName : string) {
      
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

     this.formservice.getStates(countryCode).subscribe (
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAdressStates = data;
        } else {
          this.billingAddressStates = data;
        }
             
          formGroup?.get ('state')?.setValue(data[0]);
      }
     );

     


   }
   get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
   get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
   get email() { return this.checkoutFormGroup.get('customer.email'); }

   get street() { return this.checkoutFormGroup.get('shippingAddress.street'); }
   get city() { return this.checkoutFormGroup.get('shippingAddress.city'); }
   get state() { return this.checkoutFormGroup.get('shippingAddress.state'); }
   get country() { return this.checkoutFormGroup.get('shippingAddress.country'); }
   get zipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }


   get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
   get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
   get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
   get BillingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
   get BillingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }


   get cardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
   get nameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
   get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
   get security() { return this.checkoutFormGroup.get('creditCard.security'); }
   get expirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth'); }
   get expirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear'); }



   
   
   reviewCardDetails() {
    this.cartService.totalQuantity.subscribe (
    totalQuantity => this.totalQuantity = totalQuantity
    
      );

      this.cartService.totalPrice.subscribe (
        totalPrice => this.totalPrice = totalPrice
      );
     
   }


    




   










}
